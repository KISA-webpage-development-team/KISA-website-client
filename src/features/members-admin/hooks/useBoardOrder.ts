import { useCallback, useMemo, useState } from "react";
import type { BoardTier } from "@/types/members";

type OrderEntry = {
  boardMemberID: number;
  tier: BoardTier;
};

/**
 * On-screen order of one board year's entries, president tier first. Entries
 * move only within their tier. Every change stays local until the caller saves
 * `order`; a new saved order from the server replaces it.
 */
export function useBoardOrder<T extends OrderEntry>(saved: T[]) {
  // Tiers are part of the key: an entry can change tier without the id
  // sequence changing.
  const savedKey = saved.map((entry) => `${entry.boardMemberID}:${entry.tier}`).join(",");
  const savedIds = saved.map((entry) => entry.boardMemberID).join(",");
  const [state, setState] = useState({
    savedKey,
    ids: saved.map((entry) => entry.boardMemberID),
  });

  let ids = state.ids;
  if (state.savedKey !== savedKey) {
    ids = saved.map((entry) => entry.boardMemberID);
    setState({ savedKey, ids });
  }

  const byId = useMemo(
    () => new Map(saved.map((entry) => [entry.boardMemberID, entry])),
    [saved],
  );
  const entries = ids.map((id) => byId.get(id)).filter((entry): entry is T => !!entry);
  const presidents = entries.filter((entry) => entry.tier === "president");
  const members = entries.filter((entry) => entry.tier === "member");

  const setIds = useCallback(
    (update: (current: number[]) => number[]) =>
      setState((current) => ({ ...current, ids: update(current.ids) })),
    [],
  );

  const move = useCallback(
    (id: number, delta: -1 | 1) =>
      setIds((current) => {
        const from = current.indexOf(id);
        const to = from + delta;
        const tier = byId.get(id)?.tier;
        if (from === -1 || to < 0 || to >= current.length) return current;
        if (byId.get(current[to])?.tier !== tier) return current;
        const next = [...current];
        [next[from], next[to]] = [next[to], next[from]];
        return next;
      }),
    [setIds, byId],
  );

  const moveUp = useCallback((id: number) => move(id, -1), [move]);
  const moveDown = useCallback((id: number) => move(id, 1), [move]);

  /** Replace one tier's order, e.g. after a drag within that tier's list. */
  const setTierOrder = useCallback(
    (tier: BoardTier, next: T[]) =>
      setIds((current) => {
        const nextIds = next.map((entry) => entry.boardMemberID);
        const presidentIds = current.filter((id) => byId.get(id)?.tier === "president");
        const memberIds = current.filter((id) => byId.get(id)?.tier === "member");
        return tier === "president"
          ? [...nextIds, ...memberIds]
          : [...presidentIds, ...nextIds];
      }),
    [setIds, byId],
  );

  const discard = useCallback(
    () => setIds(() => saved.map((entry) => entry.boardMemberID)),
    [saved, setIds],
  );

  return {
    presidents,
    members,
    order: ids,
    isDirty: ids.join(",") !== savedIds,
    moveUp,
    moveDown,
    setTierOrder,
    discard,
  };
}
