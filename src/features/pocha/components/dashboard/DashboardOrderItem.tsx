import { OrderItem } from "@/types/pocha";
import React from "react";
import { STATUS_COLORS } from "../../utils/statusToColor";

interface PochaOrderItemProps {
  orderItem: OrderItem;
  handleStatusChange: () => void;
}
export default function DashboardOrderItem({
  orderItem,
  handleStatusChange,
}: PochaOrderItemProps) {
  return (
    <div className="flex justify-between">
      <div>{orderItem.orderItemID}</div>
      <div>{orderItem.menu.nameKor}</div>
      <div>{orderItem.quantity}</div>
      <button
        className={`${STATUS_COLORS[orderItem.status]} 
        rounded-md py-1 px-2 text-white font-bold
      `}
        onClick={handleStatusChange}
      >
        {orderItem.status}
      </button>
    </div>
  );
}
