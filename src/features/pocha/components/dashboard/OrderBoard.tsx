import React, { useMemo } from "react";
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
} from "@umichkisa-ds/web";
import OrderItemCard from "@/features/pocha/components/dashboard/OrderItemCard";
import { OrderStatus, Orders } from "@/types/pocha";
import { useBatchPromote } from "@/features/pocha/hooks/useBatchPromote";
import { headerTone } from "@/features/pocha/_shared/statusTone";

export type ColumnStatus = "pending" | "preparing" | "ready";

interface OrderBoardProps {
  /** Used for the section's aria-label and stable React key tag. */
  kind: "food" | "drink";
  titleEn: string;
  titleKo: string;
  /** Which buckets the board renders, in display order. */
  columns: ColumnStatus[];
  /** Tailwind grid cols at md+. base is always 1. */
  gridColumnsMd: 2 | 3;
  /** Column header horizontal padding override (matches legacy spacing). */
  headerPaddingX?: "px-3" | "px-4";
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
}

const STATUS_LABEL: Record<ColumnStatus, string> = {
  pending: "Pending",
  preparing: "Preparing",
  ready: "Ready",
};

const EMPTY_COPY: Record<ColumnStatus, string> = {
  pending: "No new orders",
  preparing: "Nothing in prep",
  ready: "All delivered",
};

export default function OrderBoard({
  kind,
  titleEn,
  titleKo,
  columns,
  gridColumnsMd,
  headerPaddingX = "px-4",
  orders = { pending: [], preparing: [], ready: [] },
  updateOrderItemStatusUI,
  selectMode,
  onEnterSelectMode,
  onPromotingChange,
}: OrderBoardProps) {
  const renderedColumns = useMemo(
    () =>
      columns.map((status) => ({
        status,
        items: orders[status] ?? [],
      })),
    [columns, orders]
  );

  // Flat lookup of all current order items in this board (across columns).
  const allItems = useMemo(
    () => renderedColumns.flatMap((c) => c.items),
    [renderedColumns]
  );

  const {
    selectedIds,
    isPromoting,
    dialogOpen,
    breakdownLabel,
    dialogBreakdownLabel,
    handleToggleSelect,
    handleLongPress,
    handleCancel,
    handlePromoteClick,
    handleDialogConfirm,
    setDialogOpen,
  } = useBatchPromote({
    allItems,
    selectMode,
    onEnterSelectMode,
    onPromotingChange,
    updateOrderItemStatusUI,
  });

  const showActionBar = selectMode && selectedIds.size > 0;

  return (
    <section
      aria-label={`${kind === "food" ? "Food" : "Drink"} orders board`}
      className={`flex flex-col gap-4 self-stretch rounded-md p-2 transition-shadow ${
        selectMode ? "ring-2 ring-info ring-offset-2" : ""
      }`}
    >
      <header className="flex items-baseline gap-2 px-1">
        <h2 className="type-h3">{titleEn}</h2>
        <span className="type-caption text-muted-foreground">{titleKo}</span>
        {selectMode && (
          <span className="type-caption text-info ml-auto">
            Tap a card to add it to your batch
          </span>
        )}
      </header>

      <Grid
        columns={{ base: 1, md: gridColumnsMd }}
        gap="element"
        className="flex-1"
      >
        {renderedColumns.map(({ status, items }) => (
          <div
            key={status}
            className="flex flex-col gap-2"
            aria-label={`${STATUS_LABEL[status]} column`}
          >
            <div
              className={`flex items-baseline justify-between gap-2 ${headerPaddingX} py-2 rounded-md border ${headerTone[status]}`}
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
              // Stretches to the column's full height (driven by the
              // sibling section's tallest card via the parent flex row).
              <Card
                className="flex h-full w-full flex-col !border-dashed bg-transparent"
                aria-label={`${STATUS_LABEL[status]} column empty`}
              >
                <CardContent className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
                  <Icon
                    name="check"
                    size="md"
                    className="text-muted-foreground"
                    aria-hidden
                  />
                  <p className="type-caption text-muted-foreground">
                    {EMPTY_COPY[status]}
                  </p>
                </CardContent>
              </Card>
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
