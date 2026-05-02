"use client";

import { LoadingSpinner } from "@umichkisa-ds/web";
import useDashboardOrderSocket from "@/features/pocha/hooks/useDashboardOrderSocket";
import FoodOrderGrid from "@/features/pocha/components/dashboard/FoodOrderGrid";
import DrinkOrderGrid from "@/features/pocha/components/dashboard/DrinkOrderGrid";
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
  /** Page-level select mode (controlled — owned by the dashboard page so the
   * Bulk-promote toggle can live in the tabs row). */
  selectMode: boolean;
  onEnterSelectMode: () => void;
  onPromotingFoodChange: (isPromoting: boolean) => void;
  onPromotingDrinkChange: (isPromoting: boolean) => void;
}

export default function OrderDashboard({
  email,
  token,
  pochaID,
  ordersHook,
  selectMode,
  onEnterSelectMode,
  onPromotingFoodChange,
  onPromotingDrinkChange,
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

  if (status === "loading") {
    return <LoadingSpinner label="주문 정보를 가져오는중..." showLabel />;
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      {/* 1. Food Orders */}
      <div className="md:basis-3/5">
        <FoodOrderGrid
          orders={foodOrders}
          updateOrderItemStatusUI={updateOrderItemStatusUI}
          selectMode={selectMode}
          onEnterSelectMode={onEnterSelectMode}
          onPromotingChange={onPromotingFoodChange}
        />
      </div>
      {/* 2. Drink Orders */}
      <div className="md:basis-2/5">
        <DrinkOrderGrid
          orders={drinkOrders}
          updateOrderItemStatusUI={updateOrderItemStatusUI}
          selectMode={selectMode}
          onEnterSelectMode={onEnterSelectMode}
          onPromotingChange={onPromotingDrinkChange}
        />
      </div>
    </div>
  );
}
