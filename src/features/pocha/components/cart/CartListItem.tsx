import React from "react";
import { CartItem } from "@/types/pocha";
import { useEffect, useState } from "react";
import { addItemToCart } from "@/apis/pocha/mutations";

type CartListItemProps = {
  item: CartItem;
  menuid: number;
  email: string;
  pochaid: number;
  setCartItemStale: (stale: boolean) => void;
};

export default function CartListItem({
  item,
  menuid,
  email,
  pochaid,
  setCartItemStale,
}: CartListItemProps) {
  const [quantity, setQuantity] = useState<number>(item.quantity);

  const handleQuantityChange = async (newQuantity: number) => {
    const body = {
      menuid: menuid,
      quantity: newQuantity,
    };

    try {
      const res = await addItemToCart(email, pochaid, body);

      // if (!res) {
      //   console.error("Error updating cart item quantity");
      //   return;
      // }

      setCartItemStale(true);
      setQuantity(newQuantity);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const incrementQuantity = () => {
    handleQuantityChange(quantity + 1);
  };

  const decrementQuantity = () => {
    // Default quantity starts at 1.
    if (quantity > 0) {
      handleQuantityChange(quantity - 1);
    }
  };

  return (
    <li className="flex flex-col">
      <span>{item.menu.nameEng}</span>
      {/* <span>Quantity: {item.quantity}</span> */}
      <span className="font-bold">
        Price: ${item.menu.price * item.quantity}
      </span>

      <div className="">
        <button
          className="bg-gray-200 px-3 py-1 font-bold"
          onClick={decrementQuantity}
          // disabled={quantity === 1}
        >
          -
        </button>
        <span className="text-2xl font-semibold">{quantity}</span>
        <button
          onClick={incrementQuantity}
          className="bg-gray-200 px-3 py-1 font-bold"
        >
          +
        </button>
      </div>
    </li>
  );
}
