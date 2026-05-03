import React from "react";
import CartListItem from "@/features/pocha/components/cart/CartListItem";
import { Cart } from "@/types/pocha";

interface CartListProps {
  cart: Cart;
  handleQuantityChange: (menuid: number, newQuantity: number) => void;
}

export default function CartList({
  cart,
  handleQuantityChange,
}: CartListProps) {
  return (
    <ul className="flex flex-col divide-y divide-border">
      {Object.entries(cart).map(([menuid, item]) => (
        <CartListItem
          key={menuid}
          menuid={parseInt(menuid)}
          item={item}
          handleQuantityChange={handleQuantityChange}
        />
      ))}
    </ul>
  );
}
