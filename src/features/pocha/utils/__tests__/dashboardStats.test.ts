import { describe, it, expect } from "vitest";
import { computeStats } from "../dashboardStats";
import type {
  OrderItem,
  MenuByCategory,
  MenuItem,
} from "@/types/pocha";
import { OrderStatus } from "@/types/pocha";

const menu = (over: Partial<MenuItem> = {}): MenuItem => ({
  menuID: 1,
  nameKor: "메뉴",
  nameEng: "menu",
  price: 5,
  stock: 10,
  isImmediatePrep: false,
  ageCheckRequired: false,
  ...over,
});

const order = (
  status: OrderStatus,
  over: Partial<OrderItem> = {}
): OrderItem => ({
  orderItemID: 1,
  status,
  menu: menu(),
  quantity: 1,
  ordererName: "n",
  ordererEmail: "e@e",
  ...over,
});

const cat = (menusList: MenuItem[]): MenuByCategory => ({
  category: "안주",
  menusList,
});

describe("computeStats", () => {
  it("returns zeros for empty inputs", () => {
    expect(computeStats([], [])).toEqual({
      active: 0,
      pending: 0,
      lowStock: 0,
      soldOut: 0,
    });
  });

  it("counts active = pending + preparing + ready (excludes closed)", () => {
    const orders: OrderItem[] = [
      order(OrderStatus.PENDING, { orderItemID: 1 }),
      order(OrderStatus.PREPARING, { orderItemID: 2 }),
      order(OrderStatus.READY, { orderItemID: 3 }),
      order(OrderStatus.CLOSED, { orderItemID: 4 }),
    ];
    const stats = computeStats(orders, []);
    expect(stats.active).toBe(3);
  });

  it("counts pending separately", () => {
    const orders: OrderItem[] = [
      order(OrderStatus.PENDING, { orderItemID: 1 }),
      order(OrderStatus.PENDING, { orderItemID: 2 }),
      order(OrderStatus.PREPARING, { orderItemID: 3 }),
    ];
    const stats = computeStats(orders, []);
    expect(stats.pending).toBe(2);
  });

  it("counts lowStock = items with stock>0 && stock<=3 across all categories", () => {
    const menus: MenuByCategory[] = [
      cat([
        menu({ menuID: 1, stock: 1 }),
        menu({ menuID: 2, stock: 3 }),
        menu({ menuID: 3, stock: 4 }),
        menu({ menuID: 4, stock: 0 }),
      ]),
      cat([menu({ menuID: 5, stock: 2 })]),
    ];
    expect(computeStats([], menus).lowStock).toBe(3);
  });

  it("counts soldOut = items with stock===0 across all categories", () => {
    const menus: MenuByCategory[] = [
      cat([
        menu({ menuID: 1, stock: 0 }),
        menu({ menuID: 2, stock: 0 }),
        menu({ menuID: 3, stock: 5 }),
      ]),
      cat([menu({ menuID: 4, stock: 0 })]),
    ];
    expect(computeStats([], menus).soldOut).toBe(3);
  });

  it("returns a fresh object on each call (consumers memoize)", () => {
    const a = computeStats([], []);
    const b = computeStats([], []);
    expect(a).toEqual(b);
    expect(a).not.toBe(b);
  });

  it("is pure (does not mutate inputs)", () => {
    const orders: OrderItem[] = [order(OrderStatus.PENDING)];
    const menus: MenuByCategory[] = [cat([menu({ stock: 1 })])];
    const ordersSnapshot = JSON.stringify(orders);
    const menusSnapshot = JSON.stringify(menus);
    computeStats(orders, menus);
    expect(JSON.stringify(orders)).toBe(ordersSnapshot);
    expect(JSON.stringify(menus)).toBe(menusSnapshot);
  });
});
