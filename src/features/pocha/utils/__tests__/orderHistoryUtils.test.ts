import { describe, it, expect } from "vitest";
import {
  calculateFoodRankings,
  calculateDrinkRankings,
  analyzeSojuSales,
  calculateTotalSales,
  calculateSummary,
  convertOrderHistoryToMenuMap,
} from "../orderHistoryUtils";
import type { OrderItem, MenuItem } from "@/types/pocha";
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

const order = (over: Partial<OrderItem> = {}): OrderItem => ({
  orderItemID: 1,
  status: OrderStatus.CLOSED,
  menu: menu(),
  quantity: 1,
  ordererName: "n",
  ordererEmail: "e@e",
  ...over,
});

describe("calculateFoodRankings", () => {
  it("returns top-3 food (anju) by quantity sold with { nameKor, quantity, revenue }", () => {
    const history: OrderItem[] = [
      order({
        orderItemID: 1,
        menu: menu({ menuID: 1, nameKor: "감자튀김", price: 8, isImmediatePrep: false }),
        quantity: 5,
      }),
      order({
        orderItemID: 2,
        menu: menu({ menuID: 2, nameKor: "치킨", price: 12, isImmediatePrep: false }),
        quantity: 10,
      }),
      order({
        orderItemID: 3,
        menu: menu({ menuID: 3, nameKor: "떡볶이", price: 7, isImmediatePrep: false }),
        quantity: 3,
      }),
      order({
        orderItemID: 4,
        menu: menu({ menuID: 4, nameKor: "소주", price: 6, isImmediatePrep: true }),
        quantity: 50,
      }),
      order({
        orderItemID: 5,
        menu: menu({ menuID: 5, nameKor: "어묵", price: 5, isImmediatePrep: false }),
        quantity: 1,
      }),
    ];

    const result = calculateFoodRankings(history);
    expect(result).toEqual([
      { nameKor: "치킨", quantity: 10, revenue: 120 },
      { nameKor: "감자튀김", quantity: 5, revenue: 40 },
      { nameKor: "떡볶이", quantity: 3, revenue: 21 },
    ]);
  });

  it("aggregates duplicate menuIDs before ranking", () => {
    const history: OrderItem[] = [
      order({
        orderItemID: 1,
        menu: menu({ menuID: 1, nameKor: "치킨", price: 10, isImmediatePrep: false }),
        quantity: 2,
      }),
      order({
        orderItemID: 2,
        menu: menu({ menuID: 1, nameKor: "치킨", price: 10, isImmediatePrep: false }),
        quantity: 3,
      }),
    ];
    expect(calculateFoodRankings(history)).toEqual([
      { nameKor: "치킨", quantity: 5, revenue: 50 },
    ]);
  });

  it("empty history → []", () => {
    expect(calculateFoodRankings([])).toEqual([]);
  });
});

describe("calculateDrinkRankings", () => {
  it("returns top-3 drink (immediate-prep) by quantity sold", () => {
    const history: OrderItem[] = [
      order({
        menu: menu({ menuID: 1, nameKor: "맥주", price: 5, isImmediatePrep: true }),
        quantity: 8,
      }),
      order({
        menu: menu({ menuID: 2, nameKor: "소주", price: 6, isImmediatePrep: true }),
        quantity: 20,
      }),
      order({
        menu: menu({ menuID: 3, nameKor: "딸기소주", price: 7, isImmediatePrep: true }),
        quantity: 4,
      }),
      order({
        menu: menu({ menuID: 4, nameKor: "막걸리", price: 5, isImmediatePrep: true }),
        quantity: 2,
      }),
      order({
        menu: menu({ menuID: 5, nameKor: "치킨", price: 12, isImmediatePrep: false }),
        quantity: 50,
      }),
    ];
    expect(calculateDrinkRankings(history)).toEqual([
      { nameKor: "소주", quantity: 20, revenue: 120 },
      { nameKor: "맥주", quantity: 8, revenue: 40 },
      { nameKor: "딸기소주", quantity: 4, revenue: 28 },
    ]);
  });

  it("empty history → []", () => {
    expect(calculateDrinkRankings([])).toEqual([]);
  });
});

describe("analyzeSojuSales", () => {
  const fruitTokens = ["과일", "딸기", "복숭아", "포도", "자몽", "청포도", "사과"];

  it("regular = items with 소주 and no fruit token; fruit = items with 소주 and a fruit token", () => {
    const history: OrderItem[] = [
      order({
        menu: menu({ menuID: 1, nameKor: "소주", price: 6, isImmediatePrep: true }),
        quantity: 10,
      }),
      order({
        menu: menu({ menuID: 2, nameKor: "참이슬 소주", price: 6, isImmediatePrep: true }),
        quantity: 5,
      }),
      order({
        menu: menu({ menuID: 3, nameKor: "딸기 소주", price: 7, isImmediatePrep: true }),
        quantity: 3,
      }),
      order({
        menu: menu({ menuID: 4, nameKor: "복숭아 소주", price: 7, isImmediatePrep: true }),
        quantity: 2,
      }),
      order({
        menu: menu({ menuID: 5, nameKor: "맥주", price: 5, isImmediatePrep: true }),
        quantity: 100,
      }),
    ];
    const r = analyzeSojuSales(history);
    expect(r).toEqual({ regular: 15, fruit: 5, total: 20 });
  });

  it.each(fruitTokens)("classifies '%s 소주' as fruit", (token) => {
    const history: OrderItem[] = [
      order({
        menu: menu({
          menuID: 1,
          nameKor: `${token} 소주`,
          price: 7,
          isImmediatePrep: true,
        }),
        quantity: 4,
      }),
    ];
    expect(analyzeSojuSales(history)).toEqual({ regular: 0, fruit: 4, total: 4 });
  });

  it("empty history → all zeros", () => {
    expect(analyzeSojuSales([])).toEqual({ regular: 0, fruit: 0, total: 0 });
  });

  it("history with no soju → all zeros", () => {
    const history: OrderItem[] = [
      order({
        menu: menu({ menuID: 1, nameKor: "맥주", price: 5, isImmediatePrep: true }),
        quantity: 10,
      }),
      order({
        menu: menu({ menuID: 2, nameKor: "치킨", price: 12, isImmediatePrep: false }),
        quantity: 5,
      }),
    ];
    expect(analyzeSojuSales(history)).toEqual({ regular: 0, fruit: 0, total: 0 });
  });
});

describe("existing exports remain", () => {
  const history: OrderItem[] = [
    order({
      menu: menu({ menuID: 1, nameKor: "치킨", price: 10, isImmediatePrep: false }),
      quantity: 2,
    }),
    order({
      menu: menu({ menuID: 2, nameKor: "맥주", price: 5, isImmediatePrep: true }),
      quantity: 3,
    }),
  ];

  it("calculateTotalSales sums all line items", () => {
    expect(calculateTotalSales(history)).toBe(35);
  });

  it("calculateSummary returns totalSales/anjuRevenue/drinkRevenue", () => {
    const s = calculateSummary(history);
    expect(s.totalSales).toBe(35);
    expect(s.anjuRevenue).toBe(20);
    expect(s.drinkRevenue).toBe(15);
  });

  it("convertOrderHistoryToMenuMap aggregates by menuID", () => {
    const map = convertOrderHistoryToMenuMap(history);
    expect(map.size).toBe(2);
    expect(map.get(1)?.quantity).toBe(2);
    expect(map.get(1)?.totalRevenue).toBe(20);
    expect(map.get(2)?.quantity).toBe(3);
    expect(map.get(2)?.totalRevenue).toBe(15);
  });
});
