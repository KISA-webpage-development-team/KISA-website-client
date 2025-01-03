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
      className="flex self-stretch items-center
      py-4 space-x-3
    "
    >
      <Modal
        backdrop="opaque"
        radius="lg"
        size="xs"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        classNames={{
          backdrop: "backdrop-opacity-40",
          wrapper: "items-center",
          body: "py-6",
        }}
      >
        <ModalContent>
          {(onClose) => (
            // Testing purpose - put background as pink
            <div className="flex flex-col items-center justify-center bg-pink-800 shadow-lg rounded-lg p-6">
              <ModalBody className="py-6">
                <div
                  className={`flex flex-col items-center justify-center space-y-4 ${sejongHospitalBold.className}`}
                >
                  <span className="text-lg text-black">Order Ready!</span>
                  <span className="text-4xl text-black">{`#${orderItem?.orderItemID}`}</span>
                  <span
                    className={`text-lg text-gray-500 font-medium ${sejongHospitalLight.className}`}
                  >
                    is ready for pickup.
                  </span>
                </div>
              </ModalBody>

              {/* <ModalFooter>
                <button onClick={onClose}>Close</button>
              </ModalFooter> */}
            </div>
          )}
        </ModalContent>
      </Modal>
      <>
        <div
          className={`w-3 h-3 rounded-full ml-3 ${STATUS_COLORS[status]}`}
        ></div>

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
          className={`flex-1 flex flex-col h-full justify-center
    ${sejongHospitalBold.className} text-michigan-blue text-medium`}
        >
          {/* Name */}
          <div className="flex items-center gap-1">
            <span className="text-michigan-blue">
              {menu?.nameKor} {menu?.nameEng}
            </span>
          </div>

          {/* Price */}
          <div className="flex mt-1 text-gray-500 space-x-2">
            <span>{`x ${quantity}`}</span>
            <span>|</span>
            <span>{`$${menu?.price * quantity}`}</span>
          </div>

          {/* specially displaying orderItemID for "ready" status */}
          {status === "ready" && (
            <div className="h-[22px] w-[41px] text-sm bg-zinc-100 rounded-[9px] flex items-center justify-center">
              # {orderItem?.orderItemID}
            </div>
          )}
        </div>

        {/* status & ticket button */}
        <div
          className={`flex items-center justify-center rounded-md text-[14px] pr-6 ${sejongHospitalBold.className} ${STATUS_TEXT_COLORS[status]}`}
        >
          {status === "ready" ? (
            <div className="flex flex-col items-end">
              <div>{capitalizeStatus(orderItem?.status)}</div>
              {/* View Ticket Button */}
              <button
                onClick={handleViewTicket}
                className="mt-[10px] w-[121px] h-[31px] px-[13px] py-[5px] bg-green-100 rounded-[5px] border border-[#1c8241]/50 flex items-center justify-center gap-2"
              >
                <TicketIcon className="mr-1" size="small" />
                <span className="text-[11px] font-bold leading-none">
                  View Ticket
                </span>
              </button>
            </div>
          ) : (
            <div
              className={`${sejongHospitalBold.className} ${STATUS_TEXT_COLORS[status]}`}
            >
              {capitalizeStatus(orderItem?.status)}
            </div>
          )}
        </div>
      </>
    </li>
  );
}
