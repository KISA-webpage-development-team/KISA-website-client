import React from "react";
import useOrders from "../../hooks/useOrders";
import PochaOrderItem from "../order/PochaOrderItem";

interface OrdersTableProps {
  token: string;
  pochaID: number;
}

export default function OrdersTable({ token, pochaID }: OrdersTableProps) {
  const {
    pendingOrders,
    preparingOrders,
    readyOrders,
    status: orderStatus,
  } = useOrders(
    "*", // fetch all orders
    token,
    pochaID
  );

  if (orderStatus === "loading") {
    return <></>;
  }

  // TEMP: using PocahOrderItem component for just displaying
  return (
    <div className="w-full">
      <div className="p-4 space-y-4">
        {/* ready */}
        <div className="text-xl font-bold">Ready</div>
        {readyOrders?.map((orderItem) => (
          <PochaOrderItem key={orderItem.orderItemID} orderItem={orderItem} />
        ))}

        {/* preparing */}
        <div className="text-xl font-bold">Preparing</div>
        {preparingOrders?.map((orderItem) => (
          <PochaOrderItem key={orderItem.orderItemID} orderItem={orderItem} />
        ))}

        {/* pending */}
        <div className="text-xl font-bold">Pending</div>
        {pendingOrders?.map((orderItem) => (
          <PochaOrderItem key={orderItem.orderItemID} orderItem={orderItem} />
        ))}
      </div>
    </div>
  );
}
