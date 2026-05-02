"use client";

import { useCallback, useState } from "react";
import LoadingSpinner from "@/components/ui/feedback/LoadingSpinner";
import useDashboardOrderSocket from "@/features/pocha/hooks/useDashboardOrderSocket";
import FoodOrderGrid from "@/features/pocha/components/dashboard/FoodOrderGrid";
import DrinkOrderGrid from "@/features/pocha/components/dashboard/DrinkOrderGrid";
import { Button } from "@umichkisa-ds/web";
import type { OrderItem, OrderStatus, Orders } from "@/types/pocha";

interface OrdersHook {
  immediatePrepOrders: Orders;
  notImmediatePrepOrders: Orders;
  addNewOrderItem: (orderItem: OrderItem) => void;
  updateOrderItemStatusUI: (orderItemID: number, newStatus: OrderStatus) => void;
  status: "loading" | "success" | "error";
}

interface OrderDashboardProps {
  email: string;
  token: string;
  pochaID: number;
  ordersHook: OrdersHook;
}

export default function OrderDashboard({
  email,
  token,
  pochaID,
  ordersHook,
}: OrderDashboardProps) {
  const {
    immediatePrepOrders: drinkOrders,
    notImmediatePrepOrders: foodOrders,
    addNewOrderItem,
    updateOrderItemStatusUI,
    status,
  } = ordersHook;

  useDashboardOrderSocket({
    token,
    email,
    pochaID,
    addNewOrderItem: addNewOrderItem,
  });

  // Page-level select mode (decisions #3, #7). Selections live inside each grid.
  const [selectMode, setSelectMode] = useState(false);
  const [isPromotingFood, setIsPromotingFood] = useState(false);
  const [isPromotingDrink, setIsPromotingDrink] = useState(false);
  const isPromoting = isPromotingFood || isPromotingDrink;

  const handleToggleSelectMode = useCallback(() => {
    if (isPromoting) return;
    setSelectMode((prev) => !prev);
  }, [isPromoting]);

  if (status === "loading") {
    return (
      <LoadingSpinner fullScreen={false} label="주문 정보를 가져오는중..." />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Top row: page-level Select/Done toggle, right-aligned. */}
      <div className="flex justify-end">
        <Button
          variant="secondary"
          size="md"
          onClick={handleToggleSelectMode}
          disabled={isPromoting}
          aria-pressed={selectMode}
        >
          {selectMode ? "Done" : "Select"}
        </Button>
      </div>

      <div className="flex gap-4">
        {/* 1. Food Orders */}
        <div className="basis-3/5">
          <FoodOrderGrid
            orders={foodOrders}
            updateOrderItemStatusUI={updateOrderItemStatusUI}
            selectMode={selectMode}
            onPromotingChange={setIsPromotingFood}
          />
        </div>
        {/* 2. Drink Orders */}
        <div className="basis-2/5">
          <DrinkOrderGrid
            orders={drinkOrders}
            updateOrderItemStatusUI={updateOrderItemStatusUI}
            selectMode={selectMode}
            onPromotingChange={setIsPromotingDrink}
          />
        </div>
      </div>
    </div>
  );
}
