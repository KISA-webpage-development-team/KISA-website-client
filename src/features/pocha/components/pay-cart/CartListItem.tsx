import React from "react";
import { CartItem } from "@/types/pocha";
import { useEffect, useState } from "react";
import { changeItemInCart } from "@/apis/pocha/mutations";

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
      menuID: menuid,
      quantity: newQuantity,
    };

    try {
      const res = await changeItemInCart(email, pochaid, body);

      // if (!res) {
      //   console.error("Error updating cart item quantity");
      //   return;
      // }

      setCartItemStale(true);
      setQuantity(quantity + newQuantity);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const incrementQuantity = () => {
    handleQuantityChange(1);
  };

  const decrementQuantity = () => {
    // Default quantity starts at 1.
    if (quantity > 0) {
      handleQuantityChange(-1);
    }
  };

  const removeItemFromCart = () => {
    handleQuantityChange(-quantity);
  };

  if (!item || quantity === 0) {
    return <></>;
  }

  return (
    <li className="flex flex-col">
      <div className="flex justify-between">
        <span>{item.menu.nameEng}</span>
        <button onClick={removeItemFromCart}>X</button>
      </div>

      {/* <span>Quantity: {item.quantity}</span> */}
      <span className="font-bold">
        Price: ${item.menu.price * item.quantity}
      </span>

      <div className="">
        <button
          className="bg-gray-200 px-3 py-1 font-bold"
          onClick={decrementQuantity}
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
