/*
 * useCart.ts
 * - SWR-backed cart hook (Pattern A: useSWR + mutate() + per-menu accumulator
 *   over a per-menu 1s debouncer).
 * - One SWR key per (email, pochaID) → consumers (/pocha MenuList,
 *   MenuItemDetail, /pocha/cart) auto-dedupe the GET.
 * - **Server contract is delta-based** (`KISA-website-server/.../cart.py`):
 *   POST /api/v2/pocha/cart accepts `quantity` as the increment (+N inserts
 *   N rows or increments; -N deletes N). Coalesced taps must therefore sum
 *   their deltas, not send the latest absolute total.
 * - Per-menuID debouncer lets the user edit menu A and menu B in parallel
 *   without one tap stomping the other (a single shared debouncer would only
 *   keep the latest call's args).
 * - On settle-reject (network OR `isStocked: false`) we toast and revalidate
 *   to overwrite the now-wrong optimistic UI. On success we skip revalidate
 *   so the user doesn't see a flicker — optimistic already matches server.
 */

import { useEffect, useRef } from "react";
import useSWR, { useSWRConfig } from "swr";
import { debounce, type DebouncedFunc } from "lodash";
import { toast } from "@umichkisa-ds/web";

import { getUserCart } from "@/apis/pocha/queries";
import { changeItemInCart } from "@/apis/pocha/mutations";
import { Cart } from "@/types/pocha";
import { HookStatus } from "./types";

const REJECT_TOAST = "Insufficient stock";
const DEBOUNCE_MS = 1000;

const cartToTotalAmount = (cart: Cart | undefined): number => {
  if (!cart) return 0;
  const total = Object.values(cart).reduce(
    (sum, item) => sum + item.menu.price * item.quantity,
    0
  );
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

  // Per-menuID accumulator + debouncer maps. Both ref-pinned so they survive
  // re-renders.
  const pendingDeltaRef = useRef<Map<number, number>>(new Map());
  const debouncerMapRef = useRef<
    Map<number, DebouncedFunc<() => Promise<void>>>
  >(new Map());

  // Stable ref the debounced closure reads from — avoids rebuilding
  // debouncers when email/pochaID/key change identity but not value.
  const ctxRef = useRef({ email: safeEmail, pochaID: safePochaID, key });
  ctxRef.current = { email: safeEmail, pochaID: safePochaID, key };

  // On key change (signed-out → signed-in, account switch, pocha switch) the
  // debounced closures are still valid (they read ctxRef live), but pending
  // deltas were accumulated against the OLD key. Flush them out under the
  // outgoing identity, then reset.
  useEffect(() => {
    return () => {
      for (const d of debouncerMapRef.current.values()) d.flush();
      debouncerMapRef.current.clear();
      pendingDeltaRef.current.clear();
    };
  }, [key]);

  const handleQuantityChange = (menuid: number, delta: number) => {
    if (!key) return;

    // Optimistic UI: only when the row already exists. For "Add to Cart"
    // from MenuItemDetail (no row yet) we cannot fabricate the `menu`
    // snapshot the cart shape requires; the post-settle revalidate populates
    // the row instead.
    mutate(
      (prev) => {
        const base = prev ?? ({} as Cart);
        const existing = base[menuid];
        if (!existing) return base;
        return {
          ...base,
          [menuid]: { ...existing, quantity: existing.quantity + delta },
        };
      },
      { revalidate: false }
    );

    pendingDeltaRef.current.set(
      menuid,
      (pendingDeltaRef.current.get(menuid) ?? 0) + delta
    );

    let d = debouncerMapRef.current.get(menuid);
    if (!d) {
      d = debounce(async () => {
        const acc = pendingDeltaRef.current.get(menuid) ?? 0;
        pendingDeltaRef.current.set(menuid, 0);
        if (acc === 0) return;
        const { email: e, pochaID: p, key: k } = ctxRef.current;
        if (!k) return;
        try {
          const res = await changeItemInCart(e, p, {
            menuID: menuid,
            quantity: acc,
          });
          if (!res || res.isStocked === false) {
            toast.error(REJECT_TOAST);
          }
          // Always revalidate to reconcile optimistic with server truth.
          // (Flicker risk on rapid-tap-during-fetch is narrow; correctness
          // matters more — server may have clamped or merged with another
          // session.)
          globalMutate(k);
        } catch (err) {
          console.error("Error updating cart item", err);
          toast.error(REJECT_TOAST);
          globalMutate(k);
        }
      }, DEBOUNCE_MS);
      debouncerMapRef.current.set(menuid, d);
    }
    d();
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
