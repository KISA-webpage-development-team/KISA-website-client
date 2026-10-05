import { useCallback, useState } from "react";
import { sortByEndDateRule } from "../utils/endDateRule";

type OrderItem = {
  carouselItemID: number;
  endDate: string | null;
  created: string;
};

/**
 * On-screen order of the live items. Every change stays local until the
 * caller saves `items`; a new saved order from the server replaces it.
 */
export function useCarouselOrder<T extends OrderItem>(saved: T[]) {
  const savedKey = saved.map((item) => item.carouselItemID).join(",");
  const [order, setOrderState] = useState({
    savedKey,
    ids: saved.map((item) => item.carouselItemID),
  });

  let ids = order.ids;
  if (order.savedKey !== savedKey) {
    ids = saved.map((item) => item.carouselItemID);
    setOrderState({ savedKey, ids });
  }

  const byId = new Map(saved.map((item) => [item.carouselItemID, item]));
  const items = ids.map((id) => byId.get(id)).filter((item): item is T => !!item);

  const setIds = useCallback(
    (update: (current: number[]) => number[]) =>
      setOrderState((current) => ({ ...current, ids: update(current.ids) })),
    [],
  );

  const move = useCallback(
    (id: number, delta: -1 | 1) =>
      setIds((current) => {
        const from = current.indexOf(id);
        const to = from + delta;
        if (from === -1 || to < 0 || to >= current.length) return current;
        const next = [...current];
        [next[from], next[to]] = [next[to], next[from]];
        return next;
      }),
    [setIds],
  );

  const moveUp = useCallback((id: number) => move(id, -1), [move]);
  const moveDown = useCallback((id: number) => move(id, 1), [move]);

  const setOrder = useCallback(
    (next: T[]) => setIds(() => next.map((item) => item.carouselItemID)),
    [setIds],
  );

  const resetToDateOrder = useCallback(
    () => setIds(() => sortByEndDateRule(saved).map((item) => item.carouselItemID)),
    [saved, setIds],
  );

  const discard = useCallback(
    () => setIds(() => saved.map((item) => item.carouselItemID)),
    [saved, setIds],
  );

  return {
    items,
    isDirty: ids.join(",") !== savedKey,
    moveUp,
    moveDown,
    setOrder,
    resetToDateOrder,
    discard,
  };
}
