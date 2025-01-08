import React from "react";
import useOrderHistory from "../../hooks/useOrderHistory";

interface OrderHistoryTableProps {
  token: string;
  pochaID: number;
}

export default function OrderHistoryTable({
  token,
  pochaID,
}: OrderHistoryTableProps) {
  const { orderHistory, status } = useOrderHistory(
    "*", // fetch all orders
    token,
    pochaID
  );

  if (status === "loading") {
    return <></>;
  }

  // TEMP: using PocahOrderItem component for just displaying
  return (
    <div className="w-full">
      <div className="p-4 space-y-4">
        {/* closed */}
        <div className="text-xl font-bold">closed</div>
      </div>
    </div>
  );
}
