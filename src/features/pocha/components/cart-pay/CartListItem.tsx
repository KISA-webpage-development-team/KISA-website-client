import React from "react";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "@/utils/fonts/textFonts";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { CartItem, MenuItem, MenuItemWithQuantity } from "@/types/pocha";
import { useEffect, useState } from "react";
import { changeItemInCart } from "@/apis/pocha/mutations";
import MinusIcon from "@/final_refactor_src/components/icon/MinusIcon";
import PlusIcon from "@/final_refactor_src/components/icon/PlusIcon";
import CrossIcon from "@/final_refactor_src/components/icon/CrossIcon";
import { debounce } from "lodash";

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
      ? `/pocha/24_last_pocha/${menuID}.png`
      : "/pocha/24_last_pocha/image_not_found.png";
  };

  // update item's quantity in UI (optimistic UI)
  const updateQuantityUI = (newQuantity: number) => {
    setQuantity((prev) => prev + newQuantity);
  };

  // debounce quantity change (actual API call)
  // [NOTE] what is debounce? https://velog.io/@ansrjsdn/Debounce%EB%9E%80
  // or ask @retz8
  const debouncedUpdateQuantity = debounce(
    async (
      email: string,
      pochaid: number,
      newMenuItem: MenuItemWithQuantity
    ) => {
      try {
        await changeItemInCart(email, pochaid, newMenuItem);
      } catch (error) {
        throw error;
      }
    },
    1000
  ); // delay 1000ms before calling the API

  const handleQuantityChange = async (newQuantity: number) => {
    updateQuantityUI(newQuantity);

    const newMenuItem: MenuItemWithQuantity = {
      menuID: menuid,
      quantity: newQuantity,
    };

    debouncedUpdateQuantity(email, pochaid, newMenuItem);
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
    <li className="flex items-center py-4 border-b border-gray-300 mx-3">
      <figure className="relative h-20 aspect-square flex-shrink-0 rounded-full border-gray-300 shadow-md">
        <Image
          src={getImagePath(menuid)}
          alt={item.menu.nameEng}
          fill
          sizes="(max-width: 768px) 20vw"
          className="rounded-[15px] border-gray-300 object-cover"
        />
      </figure>

      <div className="flex flex-col flex-grow gap-2 ml-4">
        <span className={`${sejongHospitalBold.className} text-md text-black`}>
          {item?.menu?.nameKor} {item?.menu?.nameEng}
        </span>
        <span className={`${sejongHospitalBold.className} text-gray-500`}>
          ${(item?.menu?.price * quantity).toFixed(2)}
        </span>
      </div>

      {/* counter logic */}
      <div className="flex items-center border border-gray-200 rounded-full px-2 py-1 gap-3 w-fit">
        {/* Decrement Button */}
        {quantity > 1 ? (
          <button
            className={`${sejongHospitalBold.className} bg-gray-200 p-0.5 text-xs font-bold rounded-full`}
            onClick={decrementQuantity}
          >
            <MinusIcon size="small" />
          </button>
        ) : (
          <button
            onClick={removeItemFromCart}
            className="text-gray-500 hover:text-gray-700"
          >
            <CrossIcon size="medium" />
          </button>
        )}

        {/* Quantity Display */}
        <span
          className={`${sejongHospitalBold.className} font-semibold text-black`}
        >
          {quantity}
        </span>

        {/* Increment Button */}
        <button
          onClick={incrementQuantity}
          className={`${sejongHospitalBold.className} bg-gray-200 p-0.5 text-xs font-bold rounded-full`}
        >
          <PlusIcon size="small" />
        </button>
      </div>
    </li>
  );
}
