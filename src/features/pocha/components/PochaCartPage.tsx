import { CartItem, MenuItem } from "@/types/pocha";
import React from "react";

interface PochaCartPageProps {
  cart: Map<number, CartItem>;
  setOpenCartPage: (openCartPage: boolean) => void;
}

export default function PochaCartPage({
  cart,
  setOpenCartPage,
}: PochaCartPageProps) {
  console.log(cart);

  const handleBackButton = () => {
    setOpenCartPage(false);
  };

  // Calculate total price
  const totalPrice = Object.entries(cart).reduce(
    (sum, [menuid, item]) => sum + item.menu.price * item.quantity,
    0
  );

  return (
    <div>
      <button className="flex" onClick={handleBackButton}>
        Go Back
      </button>

      <ul className="flex flex-col gap-2">
        {Object.entries(cart).map(([menuid, item]) => (
          <li key={menuid} className="flex flex-col">
            <span>{item.menu.nameEng}</span>
            <span>Quantity: {item.quantity}</span>
            <span className="font-bold">
              Price: ${item.menu.price * item.quantity}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between w-full">
        <span className="font-bold">총 주문금액</span>
        <span className="">${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
}
