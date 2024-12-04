import { OrderItem } from "@/types/pocha";
import React from "react";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import { STATUS_COLORS } from "../../utils/statusToColor";
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
      className="self-stretch flex
      py-4 space-x-3
    "
    >
      <Modal
        backdrop="opaque"
        radius="lg"
        size="full"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="bottom"
        classNames={{
          body: "py-6 ",
          backdrop: "backdrop-opacity-40",
          base: "",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>

              <ModalBody className="h-48">
                <div className="flex flex-col items-center justify-center h-full w-full">
                  <span className="text-4xl">#{orderItem?.orderItemID}</span>
                  <span>{orderItem.menu.nameKor}</span>
                  <span>{orderItem.quantity}</span>
                </div>
              </ModalBody>

              <ModalFooter>
                <button onClick={onClose}>Close</button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <>
        {/* <div>{orderItem?.orderItemID}</div> */}
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
          {/* price */}
          <div
            className={`flex font-semibold text mt-1 text-gray-500 space-x-3`}
          >
            <span>{`x ${quantity}`}</span>
            <span>|</span>
            <span> {`$${menu?.price * quantity}`}</span>
          </div>
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
              <TicketIcon className="text-michigan-dark-maize" size="large" />
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
      </>
    </li>
  );
}
