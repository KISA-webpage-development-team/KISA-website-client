import { OrderItem } from "@/types/pocha";
import React from "react";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "@/utils/fonts/textFonts";
import { STATUS_TEXT_COLORS, STATUS_COLORS } from "../../utils/statusToColor";
import Image from "next/image";
import TicketIcon from "@/final_refactor_src/components/icon/TicketIcon";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

interface PochaOrderItemProps {
  orderItem: OrderItem;
  setSelectedOrder?: (orderItem: OrderItem) => void;
}

export function capitalizeStatus(status: string): string {
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}

export default function PochaOrderItem({
  orderItem,
  setSelectedOrder,
}: PochaOrderItemProps) {
  const { orderItemID, menu, quantity, status } = orderItem;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleViewTicket = () => {
    // setSelectedOrder(orderItem);
    onOpen();
  };

  const getImagePath = (menuID: number) => {
    return menuID != 1
      ? `/pocha/24_last_pocha/${menuID}.png`
      : "/pocha/24_last_pocha/image_not_found.png";
  };

  return (
    <li
      className="h-full
      shadow-md rounded-lg
      border border-zinc-200 bg-white
      flex self-stretch items-center
      py-4 px-3 space-x-[1rem]
    "
    >
      <Modal
        backdrop="opaque"
        classNames={{
          wrapper: "h-fit",
          body: "py-9 ",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
        isOpen={isOpen}
        radius="lg"
        onOpenChange={onOpenChange}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            // Testing purpose - put background as pink
            <ModalBody
              className="
              border border-[#71717A] rounded-lg
            "
            >
              <div
                className={`flex flex-col items-center justify-center space-y-4 ${sejongHospitalBold.className}`}
              >
                <span className="text-lg text-black">Order Ready!</span>
                <span className="text-4xl text-black">{`#${orderItem?.orderItemID}`}</span>
                <span
                  className={`text-lg text-gray-500 font-medium ${sejongHospitalLight.className}`}
                >
                  {orderItem.menu.nameKor} is ready for pickup
                </span>
              </div>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
      <>
        <div className={`w-3 h-3 rounded-full ${STATUS_COLORS[status]}`} />

        {/* 1. Image or Ticket number */}
        <figure className="relative w-[4rem] h-[4rem]">
          <Image
            src={getImagePath(menu?.menuID)}
            alt={`Image of ${menu?.nameKor}`}
            fill
            sizes="4rem"
            className="object-cover rounded-lg"
          />
        </figure>

        {/* 2. Info/Description */}
        <div
          className={`flex-1 flex flex-col h-full justify-center space-y-1
    ${sejongHospitalBold.className}
            text-[.9375rem] font-bold leading-[150%] text-black
    `}
        >
          {/* Name */}
          <div className="flex items-center gap-[0.25rem]">
            <span className="text-overflow">
              {menu?.nameKor} {menu?.nameEng}
            </span>
          </div>

          {/* Price */}
          <div className="flex text-gray-500 space-x-[0.25rem]">
            <span>{`x ${quantity}`}</span>
            <span>|</span>
            <span>{`$${menu?.price * quantity}`}</span>
          </div>

          {/* specially displaying orderItemID for "ready" status */}
          {status === "ready" && (
            <div
              className="
                bg-zinc-100 rounded-[9px] flex items-center justify-center
                w-fit px-2 py-[0.25rem] text-[11px]
              "
            >
              <span className="text-black"># {orderItem?.orderItemID}</span>
            </div>
          )}
        </div>

        {/* status & ticket button */}
        <div
          className={`flex items-center justify-center rounded-md 
            text-xs ${sejongHospitalBold.className} ${STATUS_TEXT_COLORS[status]}`}
        >
          {status === "ready" ? (
            <div className="flex flex-col items-end">
              <span>{capitalizeStatus(orderItem?.status)}</span>
              {/* View Ticket Button */}
              <button
                onClick={handleViewTicket}
                className="mt-[10px]
                inline-flex flex-shrink-0 justify-center items-center px-[0.8125rem] py-[0.5rem]
                bg-green-100 rounded-[5px] border border-[#1c8241]/50 gap-2"
              >
                <TicketIcon className="mr-1" size="small" />
                <span className="text-[11px] font-bold leading-[150%]">
                  View Ticket
                </span>
              </button>
            </div>
          ) : (
            <span className={``}>{capitalizeStatus(orderItem?.status)}</span>
          )}
        </div>
      </>
    </li>
  );
}
