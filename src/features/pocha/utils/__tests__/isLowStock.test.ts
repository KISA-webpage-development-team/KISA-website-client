import { describe, it, expect } from "vitest";
import { isLowStock } from "../isLowStock";

describe("isLowStock", () => {
  it("returns false at the lower boundary (stock === 0)", () => {
    expect(isLowStock(0)).toBe(false);
  });

  it("returns true at the inclusive lower edge (stock === 1)", () => {
    expect(isLowStock(1)).toBe(true);
  });

  it("returns true mid-range (stock === 2)", () => {
    expect(isLowStock(2)).toBe(true);
  });

  it("returns true at the inclusive upper edge (stock === 3)", () => {
    expect(isLowStock(3)).toBe(true);
  });

  it("returns false just above the upper edge (stock === 4)", () => {
    expect(isLowStock(4)).toBe(false);
  });

  it("returns false for large stock values", () => {
    expect(isLowStock(100)).toBe(false);
  });

  it("returns false for negative values (defensive)", () => {
    expect(isLowStock(-1)).toBe(false);
    expect(isLowStock(-100)).toBe(false);
  });
});
