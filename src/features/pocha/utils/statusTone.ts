// Single source of truth for OrderStatus → tone classes used across the
// pocha feature (dashboard column headers, dashboard order tiles, and the
// user-facing orders tab badges). `headerTone` and `cardTone` share the same
// color semantics (pending=warning, preparing=info, ready=success,
// closed=neutral); the utility order differs because Card uses
// `border-X bg-X-subtle` and the column header uses `bg-X-subtle border-X`.

import { OrderStatus } from "@/types/pocha";

type StatusKey = "pending" | "preparing" | "ready" | "closed";

export const headerTone: Record<StatusKey, string> = {
  pending: "bg-warning-subtle border-warning",
  preparing: "bg-info-subtle border-info",
  ready: "bg-success-subtle border-success",
  closed: "bg-neutral-subtle border-neutral",
};

export const cardTone: Record<StatusKey, string> = {
  pending: "border-warning bg-warning-subtle",
  preparing: "border-info bg-info-subtle",
  ready: "border-success bg-success-subtle",
  closed: "border-neutral bg-neutral-subtle",
};

export function getCardTone(status: OrderStatus): string {
  return cardTone[status as StatusKey] ?? "";
}
