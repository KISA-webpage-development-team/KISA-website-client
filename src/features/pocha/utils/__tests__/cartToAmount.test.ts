import { describe, it, expect } from "vitest";
import {
  cartToTotalAmount,
  wouldExceedStock,
  clampDelta,
} from "../cartToAmount";
import type { Cart, MenuItem } from "@/types/pocha";

const makeMenu = (id: number, price: number, stock: number): MenuItem =>
  ({
    menuID: id,
    price,
    stock,
  }) as unknown as MenuItem;

const makeCart = (
  rows: Array<{ menuID: number; price: number; stock: number; quantity: number }>
): Cart => {
  const cart: Record<number, { menu: MenuItem; quantity: number }> = {};
  for (const r of rows) {
    cart[r.menuID] = {
      menu: makeMenu(r.menuID, r.price, r.stock),
      quantity: r.quantity,
    };
  }
  return cart as unknown as Cart;
};

describe("cartToTotalAmount", () => {
  it("returns 0 for an undefined cart", () => {
    expect(cartToTotalAmount(undefined)).toBe(0);
  });

  it("returns 0 for an empty cart", () => {
    expect(cartToTotalAmount(makeCart([]))).toBe(0);
  });

  it("returns price * quantity for a single row", () => {
    const cart = makeCart([{ menuID: 1, price: 5, stock: 10, quantity: 3 }]);
    expect(cartToTotalAmount(cart)).toBe(15);
  });

  it("sums price * quantity across multiple rows", () => {
    const cart = makeCart([
      { menuID: 1, price: 5, stock: 10, quantity: 3 },
      { menuID: 2, price: 2.5, stock: 10, quantity: 4 },
    ]);
    expect(cartToTotalAmount(cart)).toBe(25);
  });

  it("rounds to 2 decimal places (no float drift)", () => {
    const cart = makeCart([
      { menuID: 1, price: 0.1, stock: 10, quantity: 2 },
      { menuID: 2, price: 0.2, stock: 10, quantity: 1 },
    ]);
    expect(cartToTotalAmount(cart)).toBe(0.4);
  });
});

describe("wouldExceedStock", () => {
  const cart = makeCart([{ menuID: 1, price: 5, stock: 4, quantity: 2 }]);

  it("returns false when (current + delta) is below stock", () => {
    expect(wouldExceedStock(cart, 1, 1)).toBe(false);
  });

  it("returns false when (current + delta) equals stock", () => {
    expect(wouldExceedStock(cart, 1, 2)).toBe(false);
  });

  it("returns true when (current + delta) exceeds stock", () => {
    expect(wouldExceedStock(cart, 1, 3)).toBe(true);
  });

  it("returns false for negative delta (decrement never exceeds)", () => {
    expect(wouldExceedStock(cart, 1, -10)).toBe(false);
  });

  it("treats missing menu row as currentQty=0", () => {
    expect(wouldExceedStock(cart, 999, 1)).toBe(false);
  });

  it("returns false when cart is undefined", () => {
    expect(wouldExceedStock(undefined, 1, 1)).toBe(false);
  });
});

describe("clampDelta", () => {
  it("returns delta unchanged when result stays within [0, stock]", () => {
    expect(clampDelta(2, 1, 4)).toBe(1);
    expect(clampDelta(2, -1, 4)).toBe(-1);
  });

  it("clamps positive delta down to fit stock ceiling", () => {
    expect(clampDelta(2, 5, 4)).toBe(2);
  });

  it("clamps negative delta up to floor at 0", () => {
    expect(clampDelta(2, -10, 4)).toBe(-2);
  });

  it("returns 0 when current already at stock and delta positive", () => {
    expect(clampDelta(4, 3, 4)).toBe(0);
  });

  it("returns 0 when current already at 0 and delta negative", () => {
    expect(clampDelta(0, -3, 4)).toBe(0);
  });

  it("returns 0 when stock is 0", () => {
    expect(clampDelta(0, 3, 0)).toBe(0);
  });
});
