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
import Image from "next/image";
import { useState, useEffect } from "react";
import { changeItemInCart } from "@/apis/pocha/mutations";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "@/utils/fonts/textFonts";
import BackIcon from "@/final_refactor_src/components/icon/BackIcon";

// Types
import { MenuItem, CartItem, PochaInfo } from "@/types/pocha";
import { UserSession } from "@/lib/next-auth/types";
import { useSession } from "next-auth/react";
import PlusIcon from "@/final_refactor_src/components/icon/PlusIcon";
import MinusIcon from "@/final_refactor_src/components/icon/MinusIcon";
import ErrorMsg from "../shared/ErrorMsg";

interface PochaMenuDetailProps {
  selectedMenu: MenuItem;
  setSelectedMenu: (selectedMenu: MenuItem | undefined) => void;
  pochaid: number;
}

export default function PochaMenuDetail({
  selectedMenu,
  setSelectedMenu,
  pochaid,
}: PochaMenuDetailProps) {
  const { data: session, status: sessionStatus } = useSession() as {
    data: UserSession | undefined;
    status: string;
  };

  // Loading state for add to cart button
  const [addingToCart, setAddingToCart] = useState<boolean>(false);
  // Counter Logic
  const [quantity, setQuantity] = useState<number>(1);
  // Error Message
  const [error, setError] = useState<string | null>(null);

  // useEffect needed because the price cumulation should reset for each menu.
  useEffect(() => {
    setQuantity(1);
  }, [selectedMenu]);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (error !== null) {
      setError(null);
    }

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
    setAddingToCart(true);
    // Posting info to DB.
    const addedMenu = {
      menuID: selectedMenu.menuID,
      quantity: quantity,
    };

    try {
      const res = await changeItemInCart(
        session?.user?.email,
        pochaid,
        addedMenu
      );

      if (!res) {
        console.error("Error updating cart item quantity");
        setAddingToCart(false);
        return;
      }

      //  1. out of stock
      if (res.isStocked === false) {
        setError("Out of stock");
        setAddingToCart(false);
        return;
      }

      // 2. success
      setAddingToCart(false);

      // redirect to the original page
      setSelectedMenu(undefined);
    } catch (error) {
      console.log("Error message: ", error);
    }
  };

  const getImagePath = () => {
    // 예전 방법.
    // const imageFiles = [
    //   "/images/24_last_pocha/seafoodpajeon-13.png",
    //   "/images/24_last_pocha/kkanpoongi-14.png",
    //   "/images/24_last_pocha/tteokbokki-15.png",
    //   "/images/24_last_pocha/yookhwae-16.png",
    //   "/images/24_last_pocha/jokbal-17.png",
    //   "/images/24_last_pocha/soju-18.png",
    //   "/images/24_last_pocha/beer-19.png",
    //   "/images/24_last_pocha/image_not_found.png",
    // ];

    // // Find the image that matches the menuID
    // const matchingImage = imageFiles.find((file) => {
    //   const parts = file.split("-");
    //   const menuIdPart = parts[parts.length - 1].split(".")[0];
    //   return menuIdPart === selectedMenu.menuID.toString();
    // });

    // return matchingImage
    //   ? matchingImage
    //   : "/images/24_last_pocha/image_not_found.png";
    //   console.log(getImagePath());

    const menuID = selectedMenu.menuID;
    // Just for the bulgogi case. Else, (menuID != 1) condition should be (menuID != null).
    return menuID != 1
      ? `/pocha/24_last_pocha/${menuID}.png`
      : "/pocha/24_last_pocha/image_not_found.png";
  };

  if (sessionStatus === "loading") {
    <></>;
  }

  return (
    <div
      className="w-full flex flex-col 
    items-center"
    >
      <div className="absolute top-0 left-0 w-full bg-white shadow-md z-50 flex items-center h-16">
        <button className="flex ml-4 z-50 w-full" onClick={handleBackButton}>
          <BackIcon />
        </button>
      </div>

      {/* Food Image */}
      <figure className="absolute top-0 w-screen aspect-square">
        <Image
          src={getImagePath()}
          alt={selectedMenu.nameEng}
          fill
          className="shadow-sm object-cover"
        />
      </figure>

      <div
        className="mt-[80vw] z-10 gap-5 w-[95%]
      flex flex-col items-center"
      >
        {/* Details */}
        <div
          className={`${sejongHospitalBold.className}
        flex flex-col w-full bg-white rounded-[8px] shadow-lg
        py-7 px-5 gap-3
        items-center border-2 border-gray-300 z-10`}
        >
          {/* Menu Name */}
          <div className="flex flex-col items-center">
            <span className={`text-black text-xl`}>{selectedMenu.nameKor}</span>
            <span className={` text-gray-500 text-lg`}>
              {selectedMenu.nameEng}
            </span>
          </div>
          <hr className="w-full border-t border-gray-300" />

          {/* for this, just shows the total price for the selected food, based on your quantity. */}
          <span className={`text-4xl mt-1`}>
            ${selectedMenu.price * quantity}{" "}
          </span>

          {/* temporarily put in a value. */}
          <div className="w-full bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-black">Comes with:</p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Jioh</li>
              <li>Dongsub</li>
              <li>Dongeun</li>
              <li>Test</li>
              <li>Test</li>
              <li>Test</li>
              <li>Test</li>
              <li>Test</li>
              <li>Test</li>
              <li>Test</li>
              <li>Scroll Tests</li>
              <li>Scroll Tests</li>
              <li>Scroll Tests</li>
              <li>Scroll Tests</li>
              <li>Scroll Tests</li>
            </ul>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center w-full bg-gray-50 p-4 rounded-lg shadow-sm">
            {/* Label */}
            <span className={`${sejongHospitalBold.className} text-2xl ml-3`}>
              수량
            </span>

            {/* Quantity Controls */}
            <div className="flex items-center gap-7 ml-auto">
              {/* Decrement Button */}
              <button
                className="text-lg w-8 h-8 rounded-full flex justify-center items-center border border-gray-600"
                onClick={decrementQuantity}
                disabled={quantity === 1}
              >
                <MinusIcon size="small" />
              </button>

              {/* Quantity Display */}
              <span
                className={`${sejongHospitalBold.className} text-lg`}
                style={{
                  width: "1rem", // Fixed width ensures no layout shifting
                  textAlign: "center",
                }}
              >
                {quantity}
              </span>

              {/* Increment Button */}
              <button
                className="text-lg w-8 h-8 rounded-full flex justify-center items-center border border-gray-600"
                onClick={incrementQuantity}
              >
                <PlusIcon size="small" />
              </button>
            </div>
          </div>

          <button
            className={`
           py-3 rounded-lg text-white font-semibold bg-cyan-600 
           justify-center items-center w-full
           ${sejongHospitalBold.className}`}
            onClick={handleAddToCart}
            disabled={addingToCart}
          >
            {addingToCart ? "Adding to Cart..." : "Add to Cart"}
          </button>

          {/* Error Message */}
          {error !== null && <ErrorMsg message={error} />}
        </div>
      </div>
    </div>
  );
}
