"use client";

import LoadingSpinner from "@/final_refactor_src/components/feedback/LoadingSpinner";
import useDashboard from "../../hooks/useDashboard";
import useWebSocketOrders from "../../hooks/useWebSocketOrders";
import FoodOrderGrid from "./FoodOrderGrid";
import DrinkOrderGrid from "./DrinkOrderGrid";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { OrderItem } from "@/types/pocha";

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

  // useWebSocketOrders({
  //   token,
  //   email,
  //   pochaID,
  //   addNewOrderItem: addNewOrderItem,
  // });

  // Socket.IO Connection
  useEffect(() => {
    // defensive check: no orders yet (i.e. no session, no token, no pochaID)
    if (status !== "success") {
      return;
    }
    // Initialize socket connection
    const socketInstance = io("https://umichkisa-api.com", {
      transports: ["websocket"],
      auth: {
        token: token,
      },
      query: {
        email: email,
        pochaId: pochaID,
      },
    });

    // Connection event handlers
    socketInstance.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socketInstance.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
    });

    // Listen for order-created event
    socketInstance.on(
      "order-created",
      ({ newOrderItems }: { newOrderItems: OrderItem[] }) => {
        newOrderItems.forEach((orderItem) => {
          addNewOrderItem(orderItem);
        });
      }
    );

    // Cleanup function
    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, [status, email, pochaID, token, addNewOrderItem]);

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
