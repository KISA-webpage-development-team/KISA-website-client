import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useCarouselOrder } from "@/features/carousel-admin/hooks/useCarouselOrder";

const item = (id: number, endDate: string | null = null) => ({
  carouselItemID: id,
  endDate,
  created: "2026-01-01T00:00:00",
});

// Stored order A(1) B(2) C(3); by end date the order would be C, A, B.
const saved = [item(1, "2026-10-10"), item(2, null), item(3, "2026-10-05")];
const ids = (items: { carouselItemID: number }[]) => items.map((i) => i.carouselItemID);

describe("useCarouselOrder", () => {
  it("starts at the saved order and is not dirty", () => {
    const { result } = renderHook(() => useCarouselOrder(saved));
    expect(ids(result.current.items)).toEqual([1, 2, 3]);
    expect(result.current.isDirty).toBe(false);
  });

  it("moves items up and down and becomes dirty", () => {
    const { result } = renderHook(() => useCarouselOrder(saved));

    act(() => result.current.moveDown(1));
    expect(ids(result.current.items)).toEqual([2, 1, 3]);

    act(() => result.current.moveUp(3));
    expect(ids(result.current.items)).toEqual([2, 3, 1]);
    expect(result.current.isDirty).toBe(true);
  });

  it("ignores moves past either end", () => {
    const { result } = renderHook(() => useCarouselOrder(saved));

    act(() => result.current.moveUp(1));
    act(() => result.current.moveDown(3));

    expect(ids(result.current.items)).toEqual([1, 2, 3]);
    expect(result.current.isDirty).toBe(false);
  });

  it("accepts a whole new order from drag and drop", () => {
    const { result } = renderHook(() => useCarouselOrder(saved));

    act(() => result.current.setOrder([saved[2], saved[0], saved[1]]));

    expect(ids(result.current.items)).toEqual([3, 1, 2]);
  });

  it("resets to the end-date order without saving", () => {
    const { result } = renderHook(() => useCarouselOrder(saved));

    act(() => result.current.resetToDateOrder());

    expect(ids(result.current.items)).toEqual([3, 1, 2]);
    expect(result.current.isDirty).toBe(true);
  });

  it("is not dirty when moves return to the saved order", () => {
    const { result } = renderHook(() => useCarouselOrder(saved));

    act(() => result.current.moveDown(1));
    act(() => result.current.moveUp(1));

    expect(result.current.isDirty).toBe(false);
  });

  it("discards back to the saved order", () => {
    const { result } = renderHook(() => useCarouselOrder(saved));

    act(() => result.current.moveDown(1));
    act(() => result.current.discard());

    expect(ids(result.current.items)).toEqual([1, 2, 3]);
    expect(result.current.isDirty).toBe(false);
  });

  it("follows a new saved order from the server", () => {
    const { result, rerender } = renderHook(({ list }) => useCarouselOrder(list), {
      initialProps: { list: saved },
    });

    act(() => result.current.moveDown(1));
    rerender({ list: [saved[1], saved[2]] });

    expect(ids(result.current.items)).toEqual([2, 3]);
    expect(result.current.isDirty).toBe(false);
  });
});
