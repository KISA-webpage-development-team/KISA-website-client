import { OrderItem, OrderStatus } from "@/types/pocha";
import React, { useState } from "react";
import { STATUS_COLORS } from "../../utils/statusToColor";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { changeOrderItemStatus } from "@/apis/pocha/mutations";

interface PochaOrderItemProps {
  orderItem: OrderItem;
  updateOrders?: (menuID: number, newStatus: OrderStatus) => void;
  nextStatus: OrderStatus | "none";
}
export default function DashboardOrderItem({
  orderItem,
  updateOrders,
  nextStatus,
}: PochaOrderItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleStatusChange = async () => {
    try {
      const res = await changeOrderItemStatus(orderItem?.orderItemID);

      console.log("res", res);

      if (!res) {
        console.error("Failed to change order status");
        return;
      }

      updateOrders(orderItem?.orderItemID, nextStatus as OrderStatus);
    } catch (error) {
      console.error("Failed to change order status", error);
    }
  };

  return (
    <li className="flex justify-between">
      <span>{orderItem.orderItemID}</span>
      <span>{orderItem.menu.nameKor}</span>
      <span>{orderItem.quantity}</span>
      <span
        className={`${STATUS_COLORS[orderItem.status]} 
        rounded-md py-1 px-2 text-white font-bold`}
      >
        {orderItem.status}
      </span>

      {nextStatus !== "none" && (
        <Popover
          isOpen={isOpen}
          onOpenChange={(open) => setIsOpen(open)}
          placement="left"
          className=""
        >
          <PopoverTrigger>
            <Button>Change Status</Button>
          </PopoverTrigger>
          <PopoverContent>
            <Button
              onClick={handleStatusChange}
            >{`Change to ${nextStatus}`}</Button>
          </PopoverContent>
        </Popover>
      )}
    </li>
  );
}
