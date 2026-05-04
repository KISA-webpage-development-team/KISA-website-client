/*
 * useCart.ts
 * - SWR-backed cart hook (Pattern A: useSWR + mutate() + ref-stable debounce).
 * - One key per (email, pochaID) pair → SWR auto-dedupes when multiple
 *   consumers (e.g. /pocha page MenuList + MenuItemDetail) call useCart in
 *   parallel.
 * - `handleQuantityChange` does an immediate optimistic mutate, then schedules
 *   a debounced API call. Preserves the 1s debounce contract from the legacy
 *   implementation. The debouncer is stored in a ref of a useMemo so it is
 *   stable across renders (the legacy code rebuilt it every render, defeating
 *   the debounce).
 * - On settle-reject (network error OR `{ isStocked: false }` server response)
 *   we surface a toast and revalidate via `mutate(key)`.
 */

import { useEffect, useMemo, useRef } from "react";
import useSWR, { useSWRConfig } from "swr";
import { debounce } from "lodash";
import { toast } from "@umichkisa-ds/web";

import { getUserCart } from "@/apis/pocha/queries";
import { changeItemInCart } from "@/apis/pocha/mutations";
import { Cart } from "@/types/pocha";
import { HookStatus } from "./types";

const REJECT_TOAST = "재고가 부족합니다 · Insufficient stock";

const cartToTotalAmount = (cart: Cart | undefined): number => {
  if (!cart) return 0;
  const total = Object.values(cart).reduce(
    (sum, item) => sum + item.menu.price * item.quantity,
    0
  );
  // toFixed returns a string; legacy hook stored .toFixed(2) into a `number`
  // state slot which only worked because of TS coercion at the boundary.
  // Round to two decimal places numerically here so consumers stay typed.
  return Math.round(total * 100) / 100;
};

const cartKey = (email: string, pochaID: number): string | null =>
  email && pochaID ? `pocha/cart/${email}/${pochaID}` : null;

const useCart = (email: string | undefined, pochaID: number | undefined) => {
  const safeEmail = email ?? "";
  const safePochaID = pochaID ?? 0;
  const key = cartKey(safeEmail, safePochaID);

  const { mutate: globalMutate } = useSWRConfig();

  const { data, error, isLoading, mutate } = useSWR<Cart | undefined>(
    key,
    () => getUserCart(safeEmail, safePochaID)
  );

  const cart = data;
  const totalAmount = cartToTotalAmount(cart);

  const status: HookStatus = error
    ? "error"
    : isLoading || (!data && !error && key)
      ? "loading"
      : "success";

  // Ref-stable debouncer. useMemo runs once at mount (empty deps); useRef
  // pins the resulting debounced function across re-renders so all callers
  // share the same internal timer. Avoids the legacy per-render bug where
  // the debouncer was rebuilt every render and never coalesced taps.
  // The debounced function is created once at mount and pinned across
  // renders via the ref. Closing over `globalMutate` is intentional — SWR's
  // `mutate` is referentially stable from `useSWRConfig`, so the closure
  // never goes stale. We deliberately do NOT include it as a dep.
  const debouncedRef = useRef(
    useMemo(
      () =>
        debounce(
          async (
            opts: {
              email: string;
              pochaID: number;
              menuID: number;
              cumulativeQuantity: number;
              key: string;
            }
          ) => {
            try {
              const res = await changeItemInCart(
                opts.email,
                opts.pochaID,
                {
                  menuID: opts.menuID,
                  quantity: opts.cumulativeQuantity,
                }
              );
              if (!res || res.isStocked === false) {
                toast.error(REJECT_TOAST);
                globalMutate(opts.key);
                return;
              }
              // Confirm with a background revalidate so optimistic UI lines
              // up with server truth (e.g. server-side clamping).
              globalMutate(opts.key);
            } catch (err) {
              console.error("Error updating cart item", err);
              toast.error(REJECT_TOAST);
              globalMutate(opts.key);
            }
          },
          1000
        ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    )
  );

  // Cancel any in-flight debounced call when the hook tears down so we
  // don't fire stale writes after unmount or a key change.
  useEffect(() => {
    const debounced = debouncedRef.current;
    return () => {
      debounced.cancel();
    };
  }, []);

  // Optimistic UI: synchronous mutate, then debounced API call.
  // `delta` is the +1 / -1 (or batch quantity) requested by the caller,
  // matching the legacy `handleQuantityChange(menuid, newQuantity)` shape.
  const handleQuantityChange = (menuid: number, delta: number) => {
    if (!key) return;

    let nextQuantityForMenu = 0;
    mutate(
      (prev) => {
        const base = prev ?? ({} as Cart);
        const existing = base[menuid];
        const currentQty = existing?.quantity ?? 0;
        const nextQty = currentQty + delta;
        nextQuantityForMenu = nextQty;

        if (!existing) {
          // No row yet → caller is "Add to Cart" from MenuItemDetail. We
          // can't fabricate a `menu` snapshot here, so leave the cache as
          // is and rely on the post-settle revalidate to populate the row.
          return base;
        }
        return {
          ...base,
          [menuid]: {
            ...existing,
            quantity: nextQty,
          },
        };
      },
      { revalidate: false }
    );

    debouncedRef.current({
      email: safeEmail,
      pochaID: safePochaID,
      menuID: menuid,
      cumulativeQuantity: nextQuantityForMenu,
      key,
    });
  };

  const fetchCart = async () => {
    await mutate();
  };

  return {
    cart,
    status,
    error: error ? "Failed to load cart data" : undefined,
    totalAmount,
    handleQuantityChange,
    fetchCart,
  };
};

export default useCart;
