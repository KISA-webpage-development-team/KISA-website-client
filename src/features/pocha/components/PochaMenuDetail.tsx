// - 백 버튼이 있어야한다.
// - 하나의 메뉴에 대해서 상세 정보 (이미지, 이름, 가격, 수량)을 보여준다 => PochaMenuList.tsx 에서 선택된 메뉴를 보여준다: selectedMenu
// - 수량을 조절할 수 있다 => 내부 state로 quantity를 관리한다. => 늘리고 줄이고 하는 함수가 있어야한다.
// - 수량에 맞는 총 가격을 보여준다  => quantity (내부 state) * price (변하지 않아!, selectedMenu.price)
// - 장바구니에 총 가격만큼 추가할 수 있다 => quantity * price => cart에 { MenuItem, quantity } 를 추가한다.

// cart[menuid] = { MenuItem, quantity}
// key: menuid
// value: CartItem{ MenuItem, quantity}

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
import { addItemToCart } from "@/apis/pocha/mutations";

// Types
import { MenuItem, CartItem, PochaInfo } from "@/types/pocha";

interface PochaMenuDetailProps {
  selectedMenu: MenuItem;
  setSelectedMenu: (selectedMenu: MenuItem | undefined) => void;
  email: string;
  pochaid: number;
}

export default function PochaMenuDetail({
  selectedMenu,
  setSelectedMenu,
  email,
  pochaid,
}: PochaMenuDetailProps) {
  // Counter Logic
  const [quantity, setQuantity] = useState<number>(1);

  // useEffect needed because the price cumulation should reset for each menu.
  useEffect(() => {
    setQuantity(1);
  }, [selectedMenu]);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    // Default quantity starts at 1.
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleBackButton = () => {
    // This is to return back to original page = Show original PochaMenuList.
    setSelectedMenu(undefined);
  };

  // add menu item and its quantity to the cart
  const handleAddToCart = async () => {
    // Posting info to DB.
    const addedMenu = {
      menuid: selectedMenu.menuid,
      quantity: quantity,
    };

    try {
      const response = await addItemToCart(email, pochaid, addedMenu);
    } catch (error) {
      console.log("Error message: ", error);
    }

    // redirect to the original page
    setSelectedMenu(undefined);
  };

  return (
    <div
      className="absolute w-full h-screen top-0 left-0
    bg-white
    flex flex-col items-center top-gap-8"
    >
      <div className="self-stretch flex justify-start">
        <button className="flex" onClick={handleBackButton}>
          Go Back
        </button>
      </div>
      {/* [TODO] Image */}
      {/* Menu Name */}
      <span className="text-xl font-bold ">
        {selectedMenu.nameKor} ({selectedMenu.nameEng})
      </span>
      {/* Price */}
      <div className="flex justify-between w-full px-3">
        <span className="">Price:</span>
        <span className="">${selectedMenu.price}</span>
      </div>
      {/* Quantity Selector */}
      <div className="flex justify-between w-full">
        <span className="ml-3">수량:</span>
        <div className="flex items-center gap-2">
          <button
            className="bg-gray-200 px-3 py-1 font-bold"
            onClick={decrementQuantity}
            disabled={quantity === 1}
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
      </div>
      <div className="flex flex-col items-center">
        {/* for this, just shows the total price for the selected food, based on your quantity. */}
        <span>예상 가격: ${selectedMenu.price * quantity} </span>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 font-semibold"
          // as the button is clicked, the price, quantity, and menu information is sent to PochaMenuList.tsx for TOTAL accumulation.
          onClick={handleAddToCart}
        >
          음식 담기
        </button>
      </div>
    </div>
  );
}
