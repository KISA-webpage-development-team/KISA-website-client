import { describe, it, expect } from "vitest";
import {
  computeBreakdown,
  requiresDialogGate,
  formatBreakdown,
} from "../batchPromote";
import type { OrderItem, MenuItem } from "@/types/pocha";
import { OrderStatus } from "@/types/pocha";

const menu = (isImmediatePrep: boolean): MenuItem => ({
  menuID: 1,
  nameKor: "메뉴",
  nameEng: "menu",
  price: 5,
  stock: 10,
  isImmediatePrep,
  ageCheckRequired: false,
});

const item = (
  status: OrderStatus,
  isImmediatePrep: boolean,
  id = 1
): OrderItem => ({
  orderItemID: id,
  status,
  menu: menu(isImmediatePrep),
  quantity: 1,
  ordererName: "n",
  ordererEmail: "e@e",
});

describe("computeBreakdown", () => {
  it("food pending → toPreparing", () => {
    const b = computeBreakdown([item(OrderStatus.PENDING, false, 1)]);
    expect(b).toEqual({ toPreparing: 1, toReady: 0, toClosed: 0 });
  });

  it("food preparing → toReady", () => {
    const b = computeBreakdown([item(OrderStatus.PREPARING, false, 1)]);
    expect(b).toEqual({ toPreparing: 0, toReady: 1, toClosed: 0 });
  });

  it("drink pending (isImmediatePrep) → toReady (skips preparing)", () => {
    const b = computeBreakdown([item(OrderStatus.PENDING, true, 1)]);
    expect(b).toEqual({ toPreparing: 0, toReady: 1, toClosed: 0 });
  });

  it("any ready item → toClosed", () => {
    const b = computeBreakdown([
      item(OrderStatus.READY, false, 1),
      item(OrderStatus.READY, true, 2),
    ]);
    expect(b).toEqual({ toPreparing: 0, toReady: 0, toClosed: 2 });
  });

  it("ignores closed items defensively", () => {
    const b = computeBreakdown([
      item(OrderStatus.CLOSED, false, 1),
      item(OrderStatus.PENDING, false, 2),
    ]);
    expect(b).toEqual({ toPreparing: 1, toReady: 0, toClosed: 0 });
  });

  it("empty selection → all zeros", () => {
    expect(computeBreakdown([])).toEqual({
      toPreparing: 0,
      toReady: 0,
      toClosed: 0,
    });
  });
});

describe("requiresDialogGate", () => {
  it("returns true if any selected item has status === ready", () => {
    expect(
      requiresDialogGate([
        item(OrderStatus.PENDING, false, 1),
        item(OrderStatus.READY, false, 2),
      ])
    ).toBe(true);
  });

  it("returns false if no ready items", () => {
    expect(
      requiresDialogGate([
        item(OrderStatus.PENDING, false, 1),
        item(OrderStatus.PREPARING, false, 2),
      ])
    ).toBe(false);
  });

  it("empty selection → false", () => {
    expect(requiresDialogGate([])).toBe(false);
  });
});

describe("formatBreakdown", () => {
  it("formats mixed buckets, skipping zero", () => {
    expect(
      formatBreakdown({ toPreparing: 2, toReady: 1, toClosed: 0 })
    ).toBe("3 items (2 → Preparing, 1 → Ready)");
  });

  it("formats all-closed bucket", () => {
    expect(
      formatBreakdown({ toPreparing: 0, toReady: 0, toClosed: 5 })
    ).toBe("5 items (5 → Closed)");
  });

  it("formats single bucket", () => {
    expect(
      formatBreakdown({ toPreparing: 4, toReady: 0, toClosed: 0 })
    ).toBe("4 items (4 → Preparing)");
  });

  it("formats all three buckets", () => {
    expect(
      formatBreakdown({ toPreparing: 1, toReady: 2, toClosed: 3 })
    ).toBe("6 items (1 → Preparing, 2 → Ready, 3 → Closed)");
  });
});
