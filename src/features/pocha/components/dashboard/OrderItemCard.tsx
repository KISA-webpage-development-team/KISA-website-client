// [REDESIGN][NO-TDD] Lane 3.5 — OrderItemCard redesign.
// isImmediatePrep is treated as "drink" throughout the dashboard UI; rare
// exceptions exist (e.g., photo event tickets) — accepted simplification.
// The unused isDrink prop will be fully removed in lane 3.6 once the grids
// stop passing it.
//
// Memoization contract: this component is wrapped in React.memo with default
// shallow compare. Parents MUST memoize callback props (onToggleSelect,
// onLongPress, updateOrderItemStatusUI) and keep the `order` reference stable
// across WS messages / polls for the memo to be effective.

import React, { useCallback, useEffect, useRef } from "react";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  Icon,
  LoadingSpinner,
  toast,
} from "@umichkisa-ds/web";
import { changeOrderItemStatus } from "@/apis/pocha/mutations";
import { OrderItem, OrderStatus } from "@/types/pocha";

interface OrderItemCardProps {
  /**
   * @deprecated Will be removed in lane 3.6. Currently retained as an optional,
   * unused prop so DrinkOrderGrid (still passing `isDrink={true}`) typechecks.
   */
  isDrink?: boolean;
  order: OrderItem;
  updateOrderItemStatusUI: (
    orderItemID: number,
    newStatus: OrderStatus
  ) => void;
  /** When true, card is in select-mode: Promote hidden, Checkbox shown, card-root toggles selection. */
  isSelectMode?: boolean;
  isSelected?: boolean;
  onToggleSelect?: (orderItemID: number) => void;
  onLongPress?: (orderItemID: number) => void;
}

const LONG_PRESS_MS = 500;
const MOVE_CANCEL_PX = 10;

function OrderItemCardImpl({
  order,
  updateOrderItemStatusUI,
  isSelectMode = false,
  isSelected = false,
  onToggleSelect,
  onLongPress,
}: OrderItemCardProps) {
  const { orderItemID, quantity, menu, ordererName, status } = order;
  const { nameKor } = menu;

  // Status-toned tile chrome matches column ring palette
  // (pending=warning, preparing=info, ready=success).
  const STATUS_TONE: Record<string, string> = {
    pending: "border-warning bg-warning-subtle",
    preparing: "border-info bg-info-subtle",
    ready: "border-success bg-success-subtle",
  };
  const statusTone = STATUS_TONE[status] ?? "";

  const [loading, setLoading] = React.useState(false);

  const inFlightRef = useRef(false);
  const longPressFiredRef = useRef(false);
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);

  const clearLongPressTimer = useCallback(() => {
    if (longPressTimerRef.current !== null) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    pointerStartRef.current = null;
  }, []);

  // Cancel any in-flight long-press timer on unmount — the card can disappear
  // mid-press when a status update removes it from its column, and a fired
  // timer would call onLongPress with a dead id.
  useEffect(() => {
    return () => clearLongPressTimer();
  }, [clearLongPressTimer]);

  const handlePromote = useCallback(async () => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setLoading(true);
    try {
      const res = await changeOrderItemStatus(orderItemID);
      if (!res) {
        toast.error("Failed to promote order. Try again.");
        return;
      }
      updateOrderItemStatusUI(orderItemID, res.newStatus);
    } catch (err) {
      console.error("[OrderItemCard] promote failed", err);
      toast.error("Failed to promote order. Try again.");
    } finally {
      inFlightRef.current = false;
      setLoading(false);
    }
  }, [orderItemID, updateOrderItemStatusUI]);

  // --- Long-press gesture (touch-only) ---
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType !== "touch") return;
      if (!onLongPress) return;
      pointerStartRef.current = { x: e.clientX, y: e.clientY };
      longPressFiredRef.current = false;
      longPressTimerRef.current = setTimeout(() => {
        longPressFiredRef.current = true;
        longPressTimerRef.current = null;
        onLongPress(orderItemID);
      }, LONG_PRESS_MS);
    },
    [onLongPress, orderItemID]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (longPressTimerRef.current === null) return;
      const start = pointerStartRef.current;
      if (!start) return;
      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      if (dx * dx + dy * dy > MOVE_CANCEL_PX * MOVE_CANCEL_PX) {
        clearLongPressTimer();
      }
    },
    [clearLongPressTimer]
  );

  const handlePointerEnd = useCallback(() => {
    clearLongPressTimer();
  }, [clearLongPressTimer]);

  // --- Right-click: parity with long-press in non-select mode; suppress native menu in both modes. ---
  const handleContextMenu = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (isSelectMode) return;
      if (!onLongPress) return;
      longPressFiredRef.current = true;
      onLongPress(orderItemID);
    },
    [isSelectMode, onLongPress, orderItemID]
  );

  // --- Card root click: in select-mode toggles; otherwise no-op (Promote button owns interaction). ---
  const handleCardClick = useCallback(() => {
    // Long-press already fired? Swallow + reset (prevents accidental promote/toggle).
    if (longPressFiredRef.current) {
      longPressFiredRef.current = false;
      return;
    }
    if (!isSelectMode) return;
    if (inFlightRef.current) return;
    onToggleSelect?.(orderItemID);
  }, [isSelectMode, onToggleSelect, orderItemID]);

  const handleCardKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!isSelectMode) return;
      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        if (inFlightRef.current) return;
        onToggleSelect?.(orderItemID);
      }
    },
    [isSelectMode, onToggleSelect, orderItemID]
  );

  // --- Promote button: stop propagation so the card root never sees it. ---
  const handlePromotePointerDown = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      e.stopPropagation();
    },
    []
  );

  const handlePromoteClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      handlePromote();
    },
    [handlePromote]
  );

  // a11y attrs only in select-mode (default mode keeps Promote <button> as the sole interactive surface).
  const a11yProps = isSelectMode
    ? {
        role: "checkbox" as const,
        "aria-checked": isSelected,
        tabIndex: 0,
        "aria-label": `Select order #${orderItemID}`,
        onKeyDown: handleCardKeyDown,
      }
    : {};

  return (
    <li className="flex-1">
      <Card
        className={`h-full w-full ${statusTone}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerLeave={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onContextMenu={handleContextMenu}
        onClick={handleCardClick}
        {...a11yProps}
      >
        {/* #ID · customer name on one line, then menu × quantity */}
        <CardContent className="flex flex-col gap-2">
          <div className="type-h2 truncate">
            <span>#{orderItemID}</span>
            <span className="text-muted-foreground mx-2">·</span>
            <span>{ordererName}</span>
          </div>
          <div className="type-h4 truncate">
            <span>{nameKor}</span>
            <span className="text-muted-foreground"> × {quantity}</span>
          </div>
        </CardContent>

        {/* Primary action — bottom-right */}
        <CardFooter className="justify-end">
          {isSelectMode ? (
            <Icon
              name="check"
              size="md"
              aria-hidden
            />
          ) : (
            <Button
              variant="primary"
              size="md"
              disabled={loading}
              onPointerDown={handlePromotePointerDown}
              onClick={handlePromoteClick}
            >
              {loading ? <LoadingSpinner size="sm" /> : "Promote"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </li>
  );
}

const OrderItemCard = React.memo(OrderItemCardImpl);
OrderItemCard.displayName = "OrderItemCard";

export default OrderItemCard;
