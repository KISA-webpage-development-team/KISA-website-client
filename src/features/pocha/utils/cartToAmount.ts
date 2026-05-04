import { Cart } from "@/types/pocha";

export const cartToTotalAmount = (cart: Cart | undefined): number => {
  if (!cart) return 0;
  const total = Object.values(cart).reduce(
    (sum, item) => sum + item.menu.price * item.quantity,
    0
  );
  return Math.round(total * 100) / 100;
};

// For existing cart rows. For first-add (no row yet) check `menu.stock` directly —
// missing rows fall through to `Infinity` here so the caller's pre-add validation owns that path.
export const wouldExceedStock = (
  cart: Cart | undefined,
  menuID: number,
  delta: number
): boolean => {
  const row = cart?.[menuID];
  const currentQty = row?.quantity ?? 0;
  const stock = row?.menu.stock ?? Infinity;
  return currentQty + delta > stock;
};

export const clampDelta = (
  currentQty: number,
  delta: number,
  stock: number
): number => {
  const target = Math.min(stock, Math.max(0, currentQty + delta));
  return target - currentQty;
};
