/**
 * MenuListItem
 * - Displays a menu item row.
 * - Underage users see alcohol items dimmed with a "21+" badge and disabled button.
 * - Low-stock hint `재고 N개 남음` shows when stock is in (0, 3] AND the user
 *   has fewer of this item in their cart than the remaining stock. Once the
 *   user is at-cap (existingCartQty >= stock) the row stays unchanged — the
 *   detail sheet handles the at-cap state.
 */

import { MenuItem } from "@/types/pocha";
import { Badge } from "@umichkisa-ds/web";
import React from "react";
import {
  defaultImageURL,
  getMenuImagePath,
} from "@/features/pocha/utils/getImagePath";
import { isLowStock } from "@/features/pocha/utils/isLowStock";
import Image from "next/image";

interface MenuItemCardProps {
  menu: MenuItem;
  underAge: boolean;
  existingCartQty: number;
  setSelectedMenu: (menu: MenuItem) => void;
  isPriority?: boolean;
}

export default function MenuListItem({
  menu,
  underAge,
  existingCartQty,
  setSelectedMenu,
  isPriority = false,
}: MenuItemCardProps) {
  const { menuID, nameEng, nameKor, price, ageCheckRequired, stock } = menu;

  const notForUnderAge = ageCheckRequired && underAge;
  const outOfStock = stock === 0;
  const disabled = notForUnderAge || outOfStock;

  // Show the low-stock hint only when stock is in (0, 3] AND the user
  // hasn't already reserved all of it in the cart. At-cap suppresses the
  // hint to avoid double-signalling (the sheet's at-cap state handles it).
  const showLowStockHint =
    isLowStock(stock) && existingCartQty < stock;

  const handleMenuClick = () => {
    setSelectedMenu(menu);
  };

  return (
    <li className="relative w-full">
      <button
        className={`w-full flex flex-row items-center gap-4 py-4
          transition-all duration-200
          hover:bg-surface-subtle
          disabled:cursor-not-allowed
          ${notForUnderAge ? "opacity-50" : ""}`}
        onClick={handleMenuClick}
        disabled={disabled}
        aria-label={`${nameEng} ${nameKor}`}
      >
        {/* Menu Item Image */}
        <figure className="relative h-24 w-24 items-center flex-shrink-0">
          <Image
            src={getMenuImagePath(menuID) || defaultImageURL}
            alt={nameEng}
            priority={isPriority}
            fill
            sizes="96px"
            className="rounded-md border-border shadow-md object-cover"
          />
        </figure>

        {/* Menu Info */}
        <div className="flex flex-col items-start justify-center text-left gap-1">
          <span
            className={`type-label ${
              outOfStock
                ? "text-muted-foreground line-through"
                : "text-foreground"
            }`}
          >
            {nameKor} · {nameEng}
          </span>
          <div className="flex flex-row items-center gap-2 mt-1">
            <span
              className={`type-body ${
                outOfStock ? "text-error" : "text-foreground"
              }`}
            >
              {outOfStock ? "Out of stock" : `$${price}`}
            </span>
            {notForUnderAge && (
              <Badge variant="warning" size="sm">
                21+
              </Badge>
            )}
          </div>
          {showLowStockHint && (
            <Badge variant="warning" size="sm">
              재고 {stock}개 남음
            </Badge>
          )}
        </div>
      </button>
    </li>
  );
}
