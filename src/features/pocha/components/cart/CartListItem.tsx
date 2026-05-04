/**
 * CartListItem
 * - One row in the cart list. Mobile-only.
 * - Quantity stepper: at qty=1 the decrement icon swaps to a "remove" affordance
 *   (single remove path is decrement-to-zero; no separate X button).
 * - When quantity === menu.stock, the `+` is disabled and an inline red `Max`
 *   hint shows on the row.
 */

import React from "react";
import Image from "next/image";
import { IconButton } from "@umichkisa-ds/web";
import { CartItem } from "@/types/pocha";
import {
  defaultImageURL,
  getMenuImagePath,
} from "@/features/pocha/utils/getImagePath";

type CartListItemProps = {
  item: CartItem;
  menuid: number;
  handleQuantityChange: (menuid: number, newQuantity: number) => void;
};

export default function CartListItem({
  item,
  menuid,
  handleQuantityChange,
}: CartListItemProps) {
  if (!item || item.quantity === 0) {
    return null;
  }

  const { menu, quantity } = item;
  const atStockCap = quantity >= menu.stock;
  const lineTotal = menu.price * quantity;

  const incrementQuantity = () => {
    if (atStockCap) return;
    handleQuantityChange(menuid, 1);
  };

  const decrementQuantity = () => {
    handleQuantityChange(menuid, -1);
  };

  // pastiche-unresolved-doubt: server stock-reject inline-red treatment ({ isStocked: false } from changeItemInCart) cannot be surfaced from this row without modifying useCart.handleQuantityChange — useCart is out of `## Files` for lane 4.4a. Defer to lane 4.4b or expand 4.4a scope.
  return (
    <li className="flex items-center py-4 gap-3">
      <figure className="relative h-20 w-20 flex-shrink-0">
        <Image
          src={getMenuImagePath(menuid) || defaultImageURL}
          alt={menu.nameEng}
          fill
          sizes="80px"
          className="rounded-md border-border object-cover"
        />
      </figure>

      <div className="flex flex-col flex-grow gap-1 min-w-0">
        <span className="type-body text-foreground truncate">
          {menu.nameKor} · {menu.nameEng}
        </span>
        <span className="type-body-sm text-muted-foreground">
          ${menu.price.toFixed(2)} × {quantity} · ${lineTotal.toFixed(2)}
        </span>
        {atStockCap && (
          <span className="type-caption text-error">
            Max · {menu.stock} in stock
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {quantity > 1 ? (
          <IconButton
            icon="minus"
            aria-label="Decrease quantity"
            size="sm"
            variant="secondary"
            onClick={decrementQuantity}
          />
        ) : (
          <IconButton
            icon="trash-2"
            aria-label="Remove from cart"
            size="sm"
            variant="secondary"
            onClick={decrementQuantity}
          />
        )}
        <span
          className="type-body text-foreground w-6 text-center"
          aria-live="polite"
        >
          {quantity}
        </span>
        <IconButton
          icon="plus"
          aria-label="Increase quantity"
          size="sm"
          variant="secondary"
          onClick={incrementQuantity}
          disabled={atStockCap}
        />
      </div>
    </li>
  );
}
