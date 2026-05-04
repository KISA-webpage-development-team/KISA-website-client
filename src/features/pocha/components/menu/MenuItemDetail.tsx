/**
 * MenuItemDetail
 * - DS Sheet (mobile bottom-sheet) showing the selected menu item.
 * - User picks a quantity, taps "Add to Cart"; we wire to useCart.handleQuantityChange.
 * - Stepper caps at `stock - existingCartQty` so the user can never queue a
 *   request the server would reject. Inline red `Max · 재고 N개` shows at cap.
 * - At-cap state (`existingCartQty >= stock`): sheet opens read-only —
 *   stepper sits at 1, both `+`/`−` disabled, "Add to Cart" copy swaps to
 *   `최대 수량 도달 · Stock cap reached` and the button is disabled.
 * - Sheet closes on success. Dismissal: backdrop tap, swipe-down, close X.
 */

import React, { useState } from "react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  Button,
  IconButton,
} from "@umichkisa-ds/web";

import useCart from "@/features/pocha/hooks/useCart";

// Types
import { MenuItem } from "@/types/pocha";
import { UserSession } from "@/lib/next-auth/types";
import { getMenuImagePath } from "@/features/pocha/utils/getImagePath";

interface MenuItemDetailProps {
  session: UserSession | undefined;
  selectedMenu: MenuItem | null;
  onClose: () => void;
  pochaid: number | undefined;
}

export default function MenuItemDetail({
  session,
  selectedMenu,
  onClose,
  pochaid,
}: MenuItemDetailProps) {
  const open = selectedMenu !== null;

  const { cart, handleQuantityChange } = useCart(
    session?.user?.email ?? "",
    pochaid ?? 0
  );

  const existingCartQty: number = selectedMenu
    ? cart?.[selectedMenu.menuID]?.quantity ?? 0
    : 0;

  const stock = selectedMenu?.stock ?? 0;
  // Available capacity for *this* sheet session, on top of what's already
  // reserved in the cart. `remaining <= 0` ⇒ user is fully at-cap.
  const remaining = Math.max(0, stock - existingCartQty);
  const fullyAtCap = !!selectedMenu && existingCartQty >= stock;

  const [quantity, setQuantity] = useState<number>(1);

  const atStepperCap = !fullyAtCap && quantity >= remaining;

  const handleOpenChange = (next: boolean) => {
    if (!next) onClose();
  };

  const handleIncrement = () => {
    setQuantity((q) => (q < remaining ? q + 1 : q));
  };
  const handleDecrement = () => {
    setQuantity((q) => (q > 1 ? q - 1 : 1));
  };

  const handleAddToCart = () => {
    if (!selectedMenu || fullyAtCap) return;
    // useCart.handleQuantityChange does an optimistic UI update synchronously
    // and debounces the API call internally — no async surface to await.
    // Server-reject toast (if any) is fired from inside useCart.
    handleQuantityChange(selectedMenu.menuID, quantity);
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent showCloseButton showHandle>
        {selectedMenu ? (
          <div className="flex flex-col gap-4 px-4 pb-4">
            {/* Image */}
            <figure className="relative w-full aspect-[5/4] rounded-md overflow-hidden">
              <Image
                src={getMenuImagePath(selectedMenu.menuID)}
                alt={selectedMenu.nameEng}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </figure>

            {/* Title — Korean · English */}
            <SheetTitle className="type-h2 text-foreground">
              {selectedMenu.nameKor} · {selectedMenu.nameEng}
            </SheetTitle>
            <SheetDescription className="sr-only">
              {selectedMenu.nameEng}
            </SheetDescription>

            {/* Total price */}
            <div className="flex flex-row items-baseline gap-2">
              <span className="type-h3 text-foreground">
                ${(selectedMenu.price * quantity).toFixed(2)}
              </span>
              <span className="type-body text-muted-foreground">
                ${selectedMenu.price.toFixed(2)} each
              </span>
            </div>

            {/* Quantity stepper */}
            <div className="flex items-center justify-between py-2">
              <span className="type-body text-foreground">
                Quantity{" "}
                <span className="text-muted-foreground">/ 수량</span>
              </span>
              <div className="flex items-center gap-4">
                <IconButton
                  icon="minus"
                  aria-label="Decrease quantity"
                  size="sm"
                  variant="secondary"
                  onClick={handleDecrement}
                  disabled={fullyAtCap || quantity === 1}
                />
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
                  onClick={handleIncrement}
                  disabled={fullyAtCap || atStepperCap}
                />
              </div>
            </div>

            {(fullyAtCap || atStepperCap) && (
              <span className="type-caption text-error">
                Max · Only {remaining} left
              </span>
            )}

            <SheetFooter className="!mt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                disabled={fullyAtCap}
                className="w-full"
              >
                {fullyAtCap ? "Stock cap reached" : "Add to Cart"}
              </Button>
            </SheetFooter>
          </div>
        ) : (
          <SheetTitle className="sr-only">Menu item</SheetTitle>
        )}
      </SheetContent>
    </Sheet>
  );
}
