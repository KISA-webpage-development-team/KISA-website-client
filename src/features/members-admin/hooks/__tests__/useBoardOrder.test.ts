import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useBoardOrder } from "@/features/members-admin/hooks/useBoardOrder";
import type { BoardTier } from "@/types/members";

const entry = (id: number, tier: BoardTier) => ({ boardMemberID: id, tier });

// Presidents 1, 2; members 3, 4, 5.
const saved = [
  entry(1, "president"),
  entry(2, "president"),
  entry(3, "member"),
  entry(4, "member"),
  entry(5, "member"),
];
const ids = (entries: { boardMemberID: number }[]) => entries.map((e) => e.boardMemberID);

describe("useBoardOrder", () => {
  it("starts at the saved order, split by tier, and is not dirty", () => {
    const { result } = renderHook(() => useBoardOrder(saved));
    expect(ids(result.current.presidents)).toEqual([1, 2]);
    expect(ids(result.current.members)).toEqual([3, 4, 5]);
    expect(result.current.order).toEqual([1, 2, 3, 4, 5]);
    expect(result.current.isDirty).toBe(false);
  });

  it("moves entries within their tier and becomes dirty", () => {
    const { result } = renderHook(() => useBoardOrder(saved));

    act(() => result.current.moveDown(1));
    act(() => result.current.moveUp(5));

    expect(ids(result.current.presidents)).toEqual([2, 1]);
    expect(ids(result.current.members)).toEqual([3, 5, 4]);
    expect(result.current.order).toEqual([2, 1, 3, 5, 4]);
    expect(result.current.isDirty).toBe(true);
  });

  it("never moves an entry across the tier boundary or past either end", () => {
    const { result } = renderHook(() => useBoardOrder(saved));

    act(() => result.current.moveDown(2));
    act(() => result.current.moveUp(3));
    act(() => result.current.moveUp(1));
    act(() => result.current.moveDown(5));

    expect(result.current.order).toEqual([1, 2, 3, 4, 5]);
    expect(result.current.isDirty).toBe(false);
  });

  it("replaces one tier's order from a drag", () => {
    const { result } = renderHook(() => useBoardOrder(saved));

    act(() => result.current.setTierOrder("member", [entry(5, "member"), entry(3, "member"), entry(4, "member")]));
    act(() => result.current.setTierOrder("president", [entry(2, "president"), entry(1, "president")]));

    expect(result.current.order).toEqual([2, 1, 5, 3, 4]);
  });

  it("discards back to the saved order", () => {
    const { result } = renderHook(() => useBoardOrder(saved));

    act(() => result.current.moveDown(3));
    act(() => result.current.discard());

    expect(result.current.order).toEqual([1, 2, 3, 4, 5]);
    expect(result.current.isDirty).toBe(false);
  });

  it("resets to a new saved order from the server", () => {
    const { result, rerender } = renderHook(({ list }) => useBoardOrder(list), {
      initialProps: { list: saved },
    });

    act(() => result.current.moveDown(3));
    rerender({ list: [...saved, entry(6, "member")] });

    expect(result.current.order).toEqual([1, 2, 3, 4, 5, 6]);
    expect(result.current.isDirty).toBe(false);
  });

  it("follows a tier change that keeps the id sequence", () => {
    const { result, rerender } = renderHook(({ list }) => useBoardOrder(list), {
      initialProps: { list: saved },
    });

    rerender({ list: [saved[0], saved[1], entry(3, "president"), saved[3], saved[4]] });
    act(() => result.current.moveUp(3));

    expect(ids(result.current.presidents)).toEqual([1, 3, 2]);
    expect(ids(result.current.members)).toEqual([4, 5]);
  });
});
