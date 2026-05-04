import type { OrderItem, MenuByCategory } from "@/types/pocha";
import { OrderStatus } from "@/types/pocha";
import { isLowStock } from "./isLowStock";

export interface DashboardStats {
  active: number;
  pending: number;
  lowStock: number;
  soldOut: number;
}

export function computeStats(
  orders: OrderItem[],
  menus: MenuByCategory[]
): DashboardStats {
  let active = 0;
  let pending = 0;
  for (const o of orders) {
    if (o.status === OrderStatus.CLOSED) continue;
    active++;
    if (o.status === OrderStatus.PENDING) pending++;
  }

  let lowStock = 0;
  let soldOut = 0;
  for (const cat of menus) {
    for (const m of cat.menusList) {
      if (m.stock === 0) soldOut++;
      else if (isLowStock(m.stock)) lowStock++;
    }
  }

  return { active, pending, lowStock, soldOut };
}
