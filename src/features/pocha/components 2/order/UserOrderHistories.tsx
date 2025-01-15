import React from "react";

import useOrderHistory from "../../hooks/useOrderHistory";
import PochaOrderItem from "./PochaOrderItem";

interface UserOrderHistoryProps {
  email: string;
  token: string;
  pochaID: number;
}

export default function UserOrderHistories({
  email,
  token,
  pochaID,
}: UserOrderHistoryProps) {
  const { orderHistory, status } = useOrderHistory(email, token, pochaID);

  if (status === "loading") {
    return <></>;
  }

  return (
    <ul>
      {orderHistory?.map((orderItem) => (
        <PochaOrderItem key={orderItem.orderItemID} orderItem={orderItem} />
      ))}
    </ul>
  );
}
