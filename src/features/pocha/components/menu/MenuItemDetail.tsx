/**
 * MenuItemDetail
 * - DS Sheet (mobile bottom-sheet) showing the selected menu item.
 * - User picks a quantity, taps "Add to Cart"; we wire to useCart.handleQuantityChange.
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

  const { handleQuantityChange } = useCart(
    session?.user?.email ?? "",
    pochaid ?? 0
  );

  const [quantity, setQuantity] = useState<number>(1);

  const handleOpenChange = (next: boolean) => {
    if (!next) onClose();
  };

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => {
    setQuantity((q) => (q > 1 ? q - 1 : 1));
  };

  const handleAddToCart = () => {
    if (!selectedMenu) return;
    // useCart.handleQuantityChange does an optimistic UI update synchronously
    // and debounces the API call internally — no async surface to await.
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
            <div className="flex items-center justify-between bg-surface-subtle rounded-md px-4 py-3">
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
                  disabled={quantity === 1}
                />
                <span
                  className="type-body text-foreground w-6 text-center"
                >
                  {quantity}
                </span>
                <IconButton
                  icon="plus"
                  aria-label="Increase quantity"
                  size="sm"
                  variant="secondary"
                  onClick={handleIncrement}
                />
              </div>
            </div>

            <SheetFooter className="!mt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                className="w-full"
              >
                Add to Cart
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
