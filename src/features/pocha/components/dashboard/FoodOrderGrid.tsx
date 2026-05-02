import { OrderItem, OrderStatus, Orders } from "@/types/pocha";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import OrderItemCard from "@/features/pocha/components/dashboard/OrderItemCard";
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  Grid,
  Icon,
  toast,
} from "@umichkisa-ds/web";
import {
  computeBreakdown,
  formatBreakdown,
  requiresDialogGate,
} from "@/features/pocha/utils/batchPromote";
import { changeOrderItemStatus } from "@/apis/pocha/mutations";
import { getNextStatus } from "@/features/pocha/hooks/useDashboardOrders";

interface FoodOrderGridProps {
  orders: Orders;
  updateOrderItemStatusUI: (
    orderItemID: number,
    newStatus: OrderStatus
  ) => void;
  selectMode: boolean;
  /** Long-press / right-click outside select mode calls this so the dashboard
   * can flip selectMode to true (gesture-driven discovery). */
  onEnterSelectMode?: () => void;
  onPromotingChange?: (isPromoting: boolean) => void;
  /** Right-side slot in the grid header. Used by the dashboard to mount the
   * page-level Bulk-promote / Done toggle adjacent to its caption, on the
   * same row as the section title. */
  headerActions?: React.ReactNode;
}

type ColumnStatus = "pending" | "preparing" | "ready";

const STATUS_LABEL: Record<ColumnStatus, string> = {
  pending: "Pending",
  preparing: "Preparing",
  ready: "Ready",
};

// Column treatment uses semantic status palette (matches STATUS_COLORS intent
// from the legacy map: pending=yellow→warning, preparing=orange→info,
// ready=green→success). Subtle bg + same-hue border + same-hue title text.
const HEADER_TONE: Record<ColumnStatus, string> = {
  pending: "bg-warning-subtle border-warning",
  preparing: "bg-info-subtle border-info",
  ready: "bg-success-subtle border-success",
};

const EMPTY_COPY: Record<ColumnStatus, string> = {
  pending: "No new orders",
  preparing: "Nothing in prep",
  ready: "All delivered",
};

export default function FoodOrderGrid({
  orders = { pending: [], preparing: [], ready: [] },
  updateOrderItemStatusUI,
  selectMode,
  onEnterSelectMode,
  onPromotingChange,
  headerActions,
}: FoodOrderGridProps) {
  const { pending, preparing, ready } = orders;

  const columns: { status: ColumnStatus; items: typeof pending }[] = [
    { status: "pending", items: pending ?? [] },
    { status: "preparing", items: preparing ?? [] },
    { status: "ready", items: ready ?? [] },
  ];

  // Per-grid selection ownership (decision #7).
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isPromoting, setIsPromoting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  // Snapshot of selection at the moment the Dialog gate opens — prevents
  // socket/poll updates between open and confirm from desyncing the Dialog
  // body's breakdown copy from the items actually fanned out.
  const [dialogSnapshot, setDialogSnapshot] = useState<OrderItem[]>([]);

  // Exiting select-mode clears selection (Done lives in dashboard).
  useEffect(() => {
    if (!selectMode) {
      setSelectedIds(new Set());
    }
  }, [selectMode]);

  // Flat lookup of all current order items in this grid (across columns).
  const allItems = useMemo(
    () => [
      ...(pending ?? []),
      ...(preparing ?? []),
      ...(ready ?? []),
    ],
    [pending, preparing, ready]
  );

  // Derive selected items from live source so breakdown reacts when
  // socket/poll updates a card's status mid-selection.
  const selectedItems = useMemo<OrderItem[]>(
    () => allItems.filter((o) => selectedIds.has(o.orderItemID)),
    [allItems, selectedIds]
  );

  // Drop selection entries that no longer exist (e.g. closed/removed).
  useEffect(() => {
    setSelectedIds((prev) => {
      if (prev.size === 0) return prev;
      const live = new Set(allItems.map((o) => o.orderItemID));
      let changed = false;
      const next = new Set<number>();
      prev.forEach((id) => {
        if (live.has(id)) next.add(id);
        else changed = true;
      });
      return changed ? next : prev;
    });
  }, [allItems]);

  const handleToggleSelect = useCallback(
    (orderItemID: number) => {
      if (isPromoting) return;
      setSelectedIds((prev) => {
        const next = new Set(prev);
        if (next.has(orderItemID)) next.delete(orderItemID);
        else next.add(orderItemID);
        return next;
      });
    },
    [isPromoting]
  );

  const handleLongPress = useCallback(
    (orderItemID: number) => {
      if (isPromoting) return;
      // Gesture entered from outside select mode → tell parent to flip in.
      if (!selectMode) onEnterSelectMode?.();
      setSelectedIds((prev) => {
        if (prev.has(orderItemID)) return prev;
        const next = new Set(prev);
        next.add(orderItemID);
        return next;
      });
    },
    [isPromoting, selectMode, onEnterSelectMode]
  );

  const handleCancel = useCallback(() => {
    if (isPromoting) return;
    setSelectedIds(new Set());
  }, [isPromoting]);

  const runFanOut = useCallback(
    async (snapshot: OrderItem[]) => {
      if (snapshot.length === 0) return;
      setIsPromoting(true);
      onPromotingChange?.(true);
      // Capture original statuses so we can revert on rejection.
      const originals = snapshot.map((o) => ({
        id: o.orderItemID,
        status: o.status,
      }));

      // Optimistic forward update.
      for (const o of snapshot) {
        const next = getNextStatus(o.status);
        if (next) updateOrderItemStatusUI(o.orderItemID, next);
      }

      const results = await Promise.allSettled(
        snapshot.map((o) => changeOrderItemStatus(o.orderItemID))
      );

      let failed = 0;
      results.forEach((r, i) => {
        const ok = r.status === "fulfilled" && r.value;
        if (!ok) {
          failed += 1;
          const orig = originals[i];
          updateOrderItemStatusUI(orig.id, orig.status);
        }
      });

      const total = snapshot.length;
      const promoted = total - failed;
      if (failed === 0) {
        toast.success(`${promoted} promoted`);
      } else if (promoted === 0) {
        toast.error(`0 promoted, ${failed} failed`);
      } else {
        toast.error(`${promoted} promoted, ${failed} failed`);
      }

      setSelectedIds(new Set());
      setIsPromoting(false);
      onPromotingChange?.(false);
    },
    [updateOrderItemStatusUI, onPromotingChange]
  );

  const handlePromoteClick = useCallback(() => {
    if (isPromoting) return;
    if (selectedItems.length === 0) return;
    if (requiresDialogGate(selectedItems)) {
      setDialogSnapshot(selectedItems);
      setDialogOpen(true);
      return;
    }
    runFanOut(selectedItems);
  }, [isPromoting, selectedItems, runFanOut]);

  const handleDialogConfirm = useCallback(() => {
    setDialogOpen(false);
    runFanOut(dialogSnapshot);
  }, [runFanOut, dialogSnapshot]);

  const breakdownLabel = useMemo(
    () =>
      selectedItems.length > 0
        ? formatBreakdown(computeBreakdown(selectedItems))
        : "",
    [selectedItems]
  );

  const dialogBreakdownLabel = useMemo(
    () =>
      dialogSnapshot.length > 0
        ? formatBreakdown(computeBreakdown(dialogSnapshot))
        : "",
    [dialogSnapshot]
  );

  const showActionBar = selectMode && selectedIds.size > 0;

  return (
    <section
      aria-label="Food orders board"
      className={`flex flex-col gap-4 self-stretch rounded-md p-2 transition-shadow ${
        selectMode ? "ring-2 ring-info ring-offset-2" : ""
      }`}
    >
      <header className="flex items-baseline justify-between gap-3 px-1">
        <div className="flex items-baseline gap-2">
          <h2 className="type-h3">Food</h2>
          <span className="type-caption text-muted-foreground">음식 주문</span>
        </div>
        {headerActions}
      </header>

      <Grid columns={{ base: 1, md: 3 }} gap="element">
        {columns.map(({ status, items }) => (
          <div
            key={status}
            className="flex flex-col gap-2 min-h-64"
            aria-label={`${STATUS_LABEL[status]} column`}
          >
            <div
              className={`flex items-baseline justify-between gap-2 px-4 py-2 rounded-md border ${HEADER_TONE[status]}`}
            >
              <h3 className="type-label">{STATUS_LABEL[status]}</h3>
              <span
                className="type-label tabular-nums"
                aria-label={`${items.length} items`}
              >
                {items.length}
              </span>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border p-4 text-center">
                <Icon
                  name="check"
                  size="md"
                  className="text-muted-foreground"
                  aria-hidden
                />
                <p className="type-caption text-muted-foreground">
                  {EMPTY_COPY[status]}
                </p>
              </div>
            ) : (
              <ul className="flex flex-col gap-2">
                {items.map((order) => (
                  <OrderItemCard
                    key={order.orderItemID}
                    order={order}
                    updateOrderItemStatusUI={updateOrderItemStatusUI}
                    isSelectMode={selectMode}
                    isSelected={selectedIds.has(order.orderItemID)}
                    onToggleSelect={handleToggleSelect}
                    onLongPress={handleLongPress}
                  />
                ))}
              </ul>
            )}
          </div>
        ))}
      </Grid>

      {/* Sticky per-grid action bar — visible only when selection is non-empty in select mode. */}
      {showActionBar && (
        <Card
          role="region"
          aria-label="Batch promote action bar"
          className="sticky bottom-4 z-10"
        >
          <CardContent className="flex flex-wrap items-center justify-between gap-4">
            <span className="type-label text-foreground">{breakdownLabel}</span>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="md"
                onClick={handleCancel}
                disabled={isPromoting}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handlePromoteClick}
                disabled={isPromoting}
              >
                Promote
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent size="sm">
          <DialogTitle>Close these orders?</DialogTitle>
          <DialogDescription>{dialogBreakdownLabel}</DialogDescription>
          <p className="type-body-sm text-muted-foreground">
            Closed orders cannot be reverted.
          </p>
          <DialogFooter>
            <Button
              variant="secondary"
              size="md"
              onClick={() => setDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="md"
              onClick={handleDialogConfirm}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
