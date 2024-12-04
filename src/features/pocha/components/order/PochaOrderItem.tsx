import { OrderItem } from "@/types/pocha";
import React from "react";
import { STATUS_COLORS } from "../../utils/statusToColor";
import Image from "next/image";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import TicketIcon from "@/final_refactor_src/components/icon/TicketIcon";
import RightArrowIcon from "@/final_refactor_src/components/icon/RightArrowIcon";

interface PochaOrderItemProps {
  orderItem: OrderItem;
  setSelectedOrder?: (orderItem: OrderItem) => void;
}
export default function PochaOrderItem({
  orderItem,
  setSelectedOrder,
}: PochaOrderItemProps) {
  const { orderItemID, menu, quantity, status } = orderItem;

  const handleViewTicket = () => {
    setSelectedOrder(orderItem);
  };

  const getImagePath = (menuID: number) => {
    return menuID != 1
      ? `/pocha/24_last_pocha/${menuID}.png`
      : "/pocha/24_last_pocha/image_not_found.png";
  };

  return (
    <li
      className="self-stretch flex
      py-4 space-x-3
    "
    >
      {/* <div>{orderItem?.orderItemID}</div> */}
      {/* 1. Image or Ticket number */}
      <figure className="relative w-[4rem] h-[4rem]">
        <Image
          src={getImagePath(menu?.menuID)}
          alt={`Image of ${menu?.nameKor}`}
          fill
          sizes="4rem"
          className="object-contain rounded-lg"
        />
      </figure>

      {/* <div
        className={`${sejongHospitalBold.className} w-[4rem] h-[4rem] bg-pink-200`}
      >
        <span className="text-[3rem]">{orderItemID}</span>
      </div> */}

      {/* 2. Info/Description */}
      <div
        className={`flex-1 flex flex-col h-full justify-center
        ${sejongHospitalBold.className} text-michigan-blue`}
      >
        {/* name */}
        <div className="flex items-center gap-1">
          <span
            className={`${sejongHospitalBold.className} text-lg text-michigan-blue`}
          >
            {menu?.nameKor}
          </span>
          <span
            className={`${sejongHospitalBold.className} text-sm text-michigan-blue`}
          >
            {`(${menu?.nameEng})`}
          </span>
        </div>

        {/* quantity */}

        <span>x {quantity}</span>
      </div>

      {/* 3. Detail/Ticket buttons */}
      <div className="flex items-start gap-2">
        {status === "ready" && (
          <button
            onClick={handleViewTicket}
            className="flex items-center gap-2"
          >
            {/* <span
              className={`${sejongHospitalBold.className} text-sm text-michigan-light-blue`}
            >
              View Ticket
            </span> */}
            <TicketIcon className="text-michigan-dark-maize" />
          </button>
        )}

        {/* <div
          className={`${STATUS_COLORS[orderItem?.status]} 
        rounded-md py-1 px-2 text-white font-bold
      `}
        >
          {orderItem?.status}
        </div> */}

        {/* <button onClick={handleViewTicket}>
          <RightArrowIcon className="text-gray-500" size="small" />
        </button> */}
      </div>
    </li>
  );
}
