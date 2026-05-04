// [REDESIGN][NO-TDD] Lane 3.5 — OrderItemCard redesign.
// Memoization contract: this component is wrapped in React.memo with default
// shallow compare. Parents MUST memoize callback props (onToggleSelect,
// onLongPress, updateOrderItemStatusUI) and keep the `order` reference stable
// across WS messages / polls for the memo to be effective.

import React, { useCallback } from "react";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  Icon,
  LoadingSpinner,
} from "@umichkisa-ds/web";
import { OrderItem, OrderStatus } from "@/types/pocha";
import { useLongPress } from "@/features/pocha/hooks/useLongPress";
import { usePromoteOrderItem } from "@/features/pocha/hooks/usePromoteOrderItem";
import { getCardTone } from "@/features/pocha/_shared/statusTone";

interface OrderItemCardProps {
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

  const statusTone = getCardTone(status);

  const { promote, loading } = usePromoteOrderItem(
    orderItemID,
    updateOrderItemStatusUI
  );

  const handleLongPress = useCallback(() => {
    onLongPress?.(orderItemID);
  }, [onLongPress, orderItemID]);

  const longPress = useLongPress({ onLongPress: handleLongPress });

  // Right-click parity with long-press in non-select mode; suppress native menu in both modes.
  const handleContextMenu = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (isSelectMode) return;
      if (!onLongPress) return;
      longPress.fireSynthetic();
    },
    [isSelectMode, onLongPress, longPress]
  );

  const handleCardClick = useCallback(() => {
    // Long-press already fired? Swallow + reset (prevents accidental promote/toggle).
    if (longPress.firedRef.current) {
      longPress.firedRef.current = false;
      return;
    }
    if (!isSelectMode) return;
    onToggleSelect?.(orderItemID);
  }, [isSelectMode, onToggleSelect, orderItemID, longPress]);

  const handleCardKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!isSelectMode) return;
      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        onToggleSelect?.(orderItemID);
      }
    },
    [isSelectMode, onToggleSelect, orderItemID]
  );

  const handlePromotePointerDown = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      e.stopPropagation();
    },
    []
  );

  const handlePromoteClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      promote();
    },
    [promote]
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

  const selectClass = !isSelectMode
    ? ""
    : isSelected
      ? "!border-primary cursor-pointer"
      : "cursor-pointer";

  return (
    <li className="flex-1">
      <Card
        className={`h-full w-full ${statusTone} ${selectClass}`}
        {...longPress.pointerProps}
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
        <CardFooter className="justify-end min-h-[2.5rem]">
          {isSelectMode ? (
            isSelected ? (
              <Icon
                name="circle-check"
                size="md"
                className="text-primary"
                aria-hidden
              />
            ) : null
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
