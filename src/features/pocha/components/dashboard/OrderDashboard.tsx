"use client";

import LoadingSpinner from "@/final_refactor_src/components/feedback/LoadingSpinner";
import useDashboard from "../../hooks/useDashboard";
import useWebSocketOrders from "../../hooks/useWebSocketOrders";
import FoodOrderGrid from "./FoodOrderGrid";
import DrinkOrderGrid from "./DrinkOrderGrid";

interface OrderDashboardProps {
  email: string;
  token: string;
  pochaID: number;
}

export default function OrderDashboard({
  email,
  token,
  pochaID,
}: OrderDashboardProps) {
  const {
    immediatePrepOrders: drinkOrders,
    notImmediatePrepOrders: foodOrders,
    addNewOrderItem,
    updateOrderItemStatusUI,
    status,
  } = useDashboard(pochaID, token);

  useWebSocketOrders({
    token,
    email,
    pochaID,
    addNewOrderItem: addNewOrderItem,
  });

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex gap-4">
      {/* 1. Food Orders */}
      <div className="basis-3/5">
        <FoodOrderGrid
          orders={foodOrders}
          updateOrderItemStatusUI={updateOrderItemStatusUI}
        />
      </div>
      {/* 2. Drink Orders */}
      <div className="basis-2/5">
        <DrinkOrderGrid
          orders={drinkOrders}
          updateOrderItemStatusUI={updateOrderItemStatusUI}
        />
      </div>
    </div>
  );
}
