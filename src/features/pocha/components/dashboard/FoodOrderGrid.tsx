import { OrderStatus, Orders } from "@/types/pocha";
import React from "react";
import OrderItemCard from "@/features/pocha/components/dashboard/OrderItemCard";
import { Badge } from "@umichkisa-ds/web";

interface FoodOrderGridProps {
  orders: Orders;
  updateOrderItemStatusUI: (
    orderItemID: number,
    newStatus: OrderStatus
  ) => void;
}

type ColumnStatus = "pending" | "preparing" | "ready";

const STATUS_LABEL: Record<ColumnStatus, string> = {
  pending: "Pending",
  preparing: "Preparing",
  ready: "Ready",
};

const STATUS_BADGE_VARIANT: Record<
  ColumnStatus,
  "warning" | "info" | "success"
> = {
  pending: "warning",
  preparing: "info",
  ready: "success",
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
    <div className="flex flex-col self-stretch gap-2 bg-surface-subtle p-2 rounded-md">
      <h2 className="type-h2 ml-2">Food Orders</h2>
      <div className="flex gap-2">
        {columns.map(({ status, items }) => (
          <div
            key={status}
            className="flex-1 flex flex-col gap-2 p-2 rounded-md border border-border bg-surface-subtle"
          >
            <div className="flex items-center justify-center gap-2">
              <Badge variant={STATUS_BADGE_VARIANT[status]}>
                {STATUS_LABEL[status]}
              </Badge>
              <span className="type-caption text-muted-foreground">
                {items.length}
              </span>
            </div>
            {items.length === 0 ? (
              <p className="type-caption text-muted-foreground text-center">
                None
              </p>
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
      </div>
    </div>
  );
}
