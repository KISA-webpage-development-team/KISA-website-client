import { OrderStatus, Orders } from "@/types/pocha";
import React from "react";
import OrderItemCard from "@/features/pocha/components/dashboard/OrderItemCard";
import { Grid, Icon } from "@umichkisa-ds/web";

interface DrinkOrderGridProps {
  orders: Orders;
  updateOrderItemStatusUI: (
    orderItemID: number,
    newStatus: OrderStatus
  ) => void;
}

type ColumnStatus = "pending" | "ready";

const STATUS_LABEL: Record<ColumnStatus, string> = {
  pending: "대기",
  ready: "전달 대기",
};

// Mirror FoodOrderGrid status palette: warning (pending) / success (ready).
// Drinks have no preparing stage (pour-and-serve).
const HEADER_TONE: Record<ColumnStatus, string> = {
  pending: "bg-warning-subtle border-warning text-warning",
  ready: "bg-success-subtle border-success text-success",
};

const EMPTY_COPY: Record<ColumnStatus, string> = {
  pending: "새 주문 없음",
  ready: "모두 전달 완료",
};

export default function DrinkOrderGrid({
  orders = { pending: [], preparing: [], ready: [] },
  updateOrderItemStatusUI,
}: DrinkOrderGridProps) {
  const { pending, ready } = orders;

  const columns: { status: ColumnStatus; items: typeof pending }[] = [
    { status: "pending", items: pending ?? [] },
    { status: "ready", items: ready ?? [] },
  ];

  return (
    <section
      aria-label="Drink orders board"
      className="flex flex-col gap-4 self-stretch"
    >
      <header className="flex items-baseline justify-between px-1">
        <h2 className="type-h3">Drinks</h2>
        <span className="type-caption text-muted-foreground">
          음료 주문
        </span>
      </header>

      <Grid columns={{ base: 1, md: 2 }} gap="element">
        {columns.map(({ status, items }) => (
          <div
            key={status}
            className="flex flex-col gap-2 min-h-64"
            aria-label={`${STATUS_LABEL[status]} column`}
          >
            <div
              className={`flex items-baseline justify-between gap-2 px-3 py-2 rounded-md border ${HEADER_TONE[status]}`}
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
                  />
                ))}
              </ul>
            )}
          </div>
        ))}
      </Grid>
    </section>
  );
}
