import type { OrderItem } from "@/types/pocha";
import { OrderStatus } from "@/types/pocha";

export interface PromoteBreakdown {
  toPreparing: number;
  toReady: number;
  toClosed: number;
}

export function computeBreakdown(
  selectedOrderItems: OrderItem[]
): PromoteBreakdown {
  let toPreparing = 0;
  let toReady = 0;
  let toClosed = 0;

  for (const o of selectedOrderItems) {
    if (o.status === OrderStatus.READY) {
      toClosed++;
    } else if (o.status === OrderStatus.PREPARING) {
      toReady++;
    } else if (o.status === OrderStatus.PENDING) {
      if (o.menu.isImmediatePrep) toReady++;
      else toPreparing++;
    }
    // CLOSED ignored defensively
  }

  return { toPreparing, toReady, toClosed };
}

export function requiresDialogGate(
  selectedOrderItems: OrderItem[]
): boolean {
  return selectedOrderItems.some((o) => o.status === OrderStatus.READY);
}

export function formatBreakdown(b: PromoteBreakdown): string {
  const total = b.toPreparing + b.toReady + b.toClosed;
  const parts: string[] = [];
  if (b.toPreparing > 0) parts.push(`${b.toPreparing}→준비중`);
  if (b.toReady > 0) parts.push(`${b.toReady}→완료`);
  if (b.toClosed > 0) parts.push(`${b.toClosed}→마감`);
  return `${total}개 (${parts.join(", ")})`;
}
