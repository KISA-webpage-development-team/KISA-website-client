import { OrderStatus, Orders } from "@/types/pocha";
import React from "react";
import OrderItemCard from "@/features/pocha/components/dashboard/OrderItemCard";
import { Badge, Grid, Icon } from "@umichkisa-ds/web";

interface FoodOrderGridProps {
  orders: Orders;
  updateOrderItemStatusUI: (
    orderItemID: number,
    newStatus: OrderStatus
  ) => void;
}

type ColumnStatus = "pending" | "preparing" | "ready";

const STATUS_LABEL: Record<ColumnStatus, string> = {
  pending: "대기",
  preparing: "조리중",
  ready: "전달 대기",
};

// Column treatment by lifecycle stage:
//   pending   → brand-accent-subtle surface + brand-primary border (pulls the eye)
//   preparing → default surface + strong border (active work, stable visual weight)
//   ready     → muted surface + default border (recedes — empty here is good news)
// Borders are full rings (not left accents) per KNOWLEDGE "Brand emphasis surface".
const HEADER_TONE: Record<ColumnStatus, string> = {
  pending: "bg-brand-accent-subtle border-brand-primary",
  preparing: "bg-surface border-border-strong",
  ready: "bg-surface-subtle border-border",
};

const EMPTY_COPY: Record<ColumnStatus, string> = {
  pending: "새 주문 없음",
  preparing: "조리중인 항목 없음",
  ready: "모두 전달 완료",
};

export default function FoodOrderGrid({
  orders = { pending: [], preparing: [], ready: [] },
  updateOrderItemStatusUI,
}: FoodOrderGridProps) {
  const { pending, preparing, ready } = orders;

  const columns: { status: ColumnStatus; items: typeof pending }[] = [
    { status: "pending", items: pending ?? [] },
    { status: "preparing", items: preparing ?? [] },
    { status: "ready", items: ready ?? [] },
  ];

  return (
    <section
      aria-label="Food orders board"
      className="flex flex-col gap-4 self-stretch"
    >
      <header className="flex items-baseline justify-between px-1">
        <h2 className="type-h3">Food</h2>
        <span className="type-caption text-muted-foreground">
          음식 주문
        </span>
      </header>

      <Grid columns={{ base: 1, md: 3 }} gap="element">
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
              <Badge
                size="sm"
                variant="outline"
                aria-label={`${items.length} items`}
              >
                {items.length}
              </Badge>
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
