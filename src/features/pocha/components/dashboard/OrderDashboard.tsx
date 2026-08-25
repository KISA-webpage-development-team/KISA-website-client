"use client";

import { Button, Skeleton, StatusView } from "@umichkisa-ds/web";
import useDashboardOrderSocket from "@/features/pocha/hooks/useDashboardOrderSocket";
import FoodOrderGrid from "@/features/pocha/components/dashboard/FoodOrderGrid";
import DrinkOrderGrid from "@/features/pocha/components/dashboard/DrinkOrderGrid";
import type { OrderItem, OrderStatus, Orders } from "@/types/pocha";

interface OrdersHook {
  ordersMap: Map<number, OrderItem>;
  immediatePrepOrders: Orders;
  notImmediatePrepOrders: Orders;
  addNewOrderItem: (orderItem: OrderItem) => void;
  updateOrderItemStatusUI: (orderItemID: number, newStatus: OrderStatus) => void;
  status: "loading" | "success" | "error";
  error: Error | undefined;
  refetch: () => Promise<void>;
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
    refetch,
  } = ordersHook;

  useDashboardOrderSocket({
    token,
    email,
    pochaID,
    addNewOrderItem: addNewOrderItem,
  });

  if (status === "loading") {
    return (
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="md:basis-3/5">
          <Skeleton className="h-7 w-32 mb-3" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-28" />
            ))}
          </div>
        </div>
        <div className="md:basis-2/5">
          <Skeleton className="h-7 w-32 mb-3" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-28" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <StatusView
        variant="error"
        title="주문 정보를 불러오지 못했습니다."
        action={
          <Button variant="primary" size="md" onClick={() => refetch()}>
            Try again
          </Button>
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      {/* 1. Food Orders */}
      <div className="md:basis-3/5">
        <FoodOrderGrid
          token={token}
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
          token={token}
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
