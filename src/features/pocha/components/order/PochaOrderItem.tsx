import { OrderItem } from "@/types/pocha";
import React from "react";
import { STATUS_COLORS } from "../../utils/statusToColor";

interface PochaOrderItemProps {
  orderItem: OrderItem;
  setSelectedOrder?: (orderItem: OrderItem) => void;
}
export default function PochaOrderItem({
  orderItem,
  setSelectedOrder,
}: PochaOrderItemProps) {
  const handleViewTicket = () => {
    setSelectedOrder(orderItem);
  };

  return (
    <li className="flex justify-between">
      <div>{orderItem?.orderItemID}</div>
      <div>{orderItem?.menu?.nameKor}</div>
      <div>{orderItem?.quantity}</div>
      <button onClick={handleViewTicket}>View Ticket</button>
      <div
        className={`${STATUS_COLORS[orderItem?.status]} 
        rounded-md py-1 px-2 text-white font-bold
      `}
      >
        {orderItem?.status}
      </div>
    </li>
  );
}
