"use client";

import { useCallback, useState } from "react";
import LoadingSpinner from "@/components/ui/feedback/LoadingSpinner";
import useDashboardOrderSocket from "@/features/pocha/hooks/useDashboardOrderSocket";
import FoodOrderGrid from "@/features/pocha/components/dashboard/FoodOrderGrid";
import DrinkOrderGrid from "@/features/pocha/components/dashboard/DrinkOrderGrid";
import { Button, Icon } from "@umichkisa-ds/web";
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

  // Long-press / right-click on a card from outside select mode flips us in
  // (the card's onLongPress fires here, then the grid adds it to its own
  // selection set).
  const handleEnterSelectMode = useCallback(() => {
    if (isPromoting) return;
    setSelectMode(true);
  }, [isPromoting]);

  if (status === "loading") {
    return (
      <LoadingSpinner fullScreen={false} label="주문 정보를 가져오는중..." />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Top row: bulk-promote toggle + caption explaining the mode. */}
      <div className="flex items-center justify-between gap-3 px-1">
        <p className="type-caption text-muted-foreground">
          {selectMode
            ? "Tap cards to select · Promote multiple at once"
            : "Promote multiple orders at once with bulk select"}
        </p>
        <Button
          variant={selectMode ? "primary" : "secondary"}
          size="md"
          onClick={handleToggleSelectMode}
          disabled={isPromoting}
          aria-pressed={selectMode}
        >
          <Icon name={selectMode ? "check" : "circle-check"} size="sm" aria-hidden />
          {selectMode ? "Done" : "Bulk promote"}
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        {/* 1. Food Orders */}
        <div className="md:basis-3/5">
          <FoodOrderGrid
            orders={foodOrders}
            updateOrderItemStatusUI={updateOrderItemStatusUI}
            selectMode={selectMode}
            onEnterSelectMode={handleEnterSelectMode}
            onPromotingChange={setIsPromotingFood}
          />
        </div>
        {/* 2. Drink Orders */}
        <div className="md:basis-2/5">
          <DrinkOrderGrid
            orders={drinkOrders}
            updateOrderItemStatusUI={updateOrderItemStatusUI}
            selectMode={selectMode}
            onEnterSelectMode={handleEnterSelectMode}
            onPromotingChange={setIsPromotingDrink}
          />
        </div>
      </div>
    </div>
  );
}
