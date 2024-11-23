import { OrderItem } from "@/types/pocha";
import React from "react";
import { STATUS_COLORS } from "../../utils/statusToColor";

interface PochaOrderItemProps {
  orderItem: OrderItem;
}
export default function PochaOrderItem({ orderItem }: PochaOrderItemProps) {
  return (
    <div className="flex justify-between">
      <div>{orderItem.orderItemID}</div>
      <div>{orderItem.menu.nameKor}</div>
      <div>{orderItem.quantity}</div>
      <div
        className={`${STATUS_COLORS[orderItem.status]} 
        rounded-md py-1 px-2 text-white font-bold
      `}
      >
        {orderItem.status}
      </div>
    </div>
  );
}
