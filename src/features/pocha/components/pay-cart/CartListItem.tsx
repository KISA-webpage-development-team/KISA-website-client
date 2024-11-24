import React from "react";
import { sejongHospitalBold, sejongHospitalLight } from "@/utils/fonts/textFonts";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
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

  const getImagePath = (menuID: number) => {
    return menuID !== 1
      ? `/images/24_last_pocha/${menuID}.png`
      : "/images/24_last_pocha/image_not_found.png";
  };

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
    <li className="flex items-start py-4 border-b border-gray-300 mx-5">
      
      <figure className="relative h-20 w-20 flex-shrink-0 rounded-full border-2 border-gray-300 shadow-md">
        <Image
          src={getImagePath(menuid)}
          alt={item.menu.nameEng}
          fill
          sizes="(max-width: 768px) 20vw"
          className="rounded-full object-cover"
        />
      </figure>

      {/* <span>Quantity: {item.quantity}</span> */}
      <div className="flex flex-col ml-5 flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <span className={`${sejongHospitalBold.className} text-lg text-blue-950`}>{item.menu.nameKor}</span>
            <span className={`${sejongHospitalLight.className} text-sm text-blue-950 ml-1`}>
              ({item.menu.nameEng})
            </span>
          </div>
          <button
            onClick={removeItemFromCart}
            className="text-gray-500 hover:text-gray-700 mr-4"
          >
          <RxCross2 />
          </button>
        </div>
        <span className={`${sejongHospitalLight.className} text-xs text-gray-500 mt-1`}>${(item.menu.price * item.quantity).toFixed(2)}</span>

        <div className="flex items-center text-blue-950 mt-2">
          <button
            className={`${sejongHospitalBold.className} bg-gray-200 px-3 py-1 text-sm font-bold rounded-lg hover:bg-gray-300`}
            onClick={decrementQuantity}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className={`${sejongHospitalLight.className} mx-3 text-lg font-semibold`}>{quantity}</span>
          <button
            onClick={incrementQuantity}
            className={`${sejongHospitalBold.className} bg-gray-200 px-3 py-1 text-sm font-bold rounded-lg hover:bg-gray-300`}
          >
            +
          </button>
        </div>
      </div>
    </li>
  );
}
