// [UI]
// - menu image
// - menu name (kor, eng)
// - menu price
// - quantity +, - buttons (default: 1, - is disabled when quantity is 1)
// - add to cart button (onClick: price * quantity => cart)
// - close button

// UI (data x) -> data (state) -> UI (data)
// close button logic
// quantity button logic
// cart (list) - add to cart button logic
// { menu: {} , quantity, price }

import React from "react";
import { useState, useEffect } from "react";

// Types
import { MenuDetails } from "@/types/pocha";

interface PochaMenuDetailsProps {
  selectedMenu: MenuDetails;
  onBack: () => void;
  addToCart: (menu: MenuDetails, quantity: number, totalPrice: number) => void;
}

export default function PochaMenuDetails({
  selectedMenu,
  onBack,
  addToCart,
}: PochaMenuDetailsProps) {
  // Counter Logic
  const [quantity, setQuantity] = useState(1);

  // useEffect needed because the price cumulation should reset for each menu.
  useEffect(() => {
    setQuantity(1);
  }, [selectedMenu]);

  const incrementQ = () => {
    setQuantity(quantity + 1);
  };

  const decrementQ = () => {
    // Default quantity starts at 1.
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    const totalPrice = selectedMenu.price * quantity;
    // this sends the necessary stuff to PochaMenuList.txt (line 43), activated by pressing the add to cart button in this file.
    addToCart(selectedMenu, quantity, totalPrice);
  };

  // console.log(selectedMenu);
  if (!selectedMenu) {
    return null;
  }
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center gap-8">
      <button className="absolute left-3 top-0" onClick={onBack}>
        Go Back
      </button>

      <span className="text-xl font-bold">
        {selectedMenu.nameKor} ({selectedMenu.nameEng})
      </span>

      <div className="flex justify-between w-full">
        <span className="ml-3">Price:</span>
        <span className="mr-3">${selectedMenu.price}</span>
      </div>

      {/* Quantity Selector */}
      <div className="flex justify-between w-full">
        <span className="ml-3">수량:</span>
        <div className="flex items-center space-x-4">
          <button
            className="bg-gray-200 px-3 py-1 font-bold"
            onClick={decrementQ}
            disabled={quantity === 1}
          >
            {" "}
            -{" "}
          </button>
          <span className="text-2xl font-semibold">{quantity}</span>
          <button
            onClick={incrementQ}
            className="bg-gray-200 px-3 py-1 font-bold"
          >
            {" "}
            +{" "}
          </button>
        </div>
      </div>

      <div className="flex flex-col absolute bottom-0 items-center">
        {/* for this, just shows the total price for the selected food, based on your quantity. */}
        <h1>예상 가격: ${selectedMenu.price * quantity} </h1>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 font-semibold"
          // as the button is clicked, the price, quantity, and menu information is sent to PochaMenuList.tsx for TOTAL accumulation.
          onClick={() => {
            handleAddToCart;
            // setting quantity as 1 (reset) once button is pressed, to notify users that it has been added to the cart successfully.
            setQuantity(1);
          }}
        >
          음식 담기
        </button>
      </div>
    </div>
  );
}
