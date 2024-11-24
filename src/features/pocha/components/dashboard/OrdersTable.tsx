import React, { useEffect, useState } from "react";
import useOrders from "../../hooks/useOrders";
import DashboardOrderItem from "../dashboard/DashboardOrderItem";
import { Socket, io } from "socket.io-client";
import { useSession } from "next-auth/react";
import { UserSession } from "@/lib/next-auth/types";
import { OrderItem } from "@/types/pocha";
import { Accordion, AccordionItem, Divider } from "@nextui-org/react";

interface OrdersTableProps {
  email: string;
  token: string;
  pochaID: number;
}

export default function OrdersTable({
  email,
  token,
  pochaID,
}: OrdersTableProps) {
  // initial GET API call to fetch all orders
  const {
    addNewOrders,
    updateOrders,
    pendingOrders,
    preparingOrders,
    readyOrders,
    status: ordersStatus,
  } = useOrders("*", token, pochaID);

  const [socket, setSocket] = useState<Socket | null>(null);

  // Socket.IO Connection
  useEffect(() => {
    // defensive check: no orders yet (i.e. no session, no token, no pochaID)
    if (ordersStatus !== "success") {
      return;
    }
    // Initialize socket connection
    const socketInstance = io("localhost:8000", {
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
        addNewOrders(newOrderItems);
      }
    );

    // Save socket instance to state

    // Cleanup function
    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, [ordersStatus, email, pochaID, token, addNewOrders]);

  if (ordersStatus === "loading") {
    return <></>;
  }

  // TEMP: using PocahOrderItem component for just displaying
  return (
    <div className="w-full">
      <Accordion selectionMode="multiple" defaultSelectedKeys={"all"}>
        <AccordionItem
          key={1}
          aria-label="Ready"
          subtitle="Press to expand"
          title="Ready"
        >
          {/* ready */}
          <ul className="flex flex-col gap-2 py-4">
            {readyOrders?.map((orderItem) => (
              <DashboardOrderItem
                key={orderItem.orderItemID}
                orderItem={orderItem}
                updateOrders={updateOrders}
                nextStatus="closed"
              />
            ))}
          </ul>
        </AccordionItem>

        <AccordionItem
          key={2}
          aria-label="Preparing"
          subtitle="Press to expand"
          title="Preparing"
        >
          {/* preparing */}
          <ul className="flex flex-col gap-2 py-4">
            {preparingOrders?.map((orderItem) => (
              <DashboardOrderItem
                key={orderItem.orderItemID}
                orderItem={orderItem}
                updateOrders={updateOrders}
                nextStatus="ready"
              />
            ))}
          </ul>
        </AccordionItem>

        <AccordionItem
          key={3}
          aria-label="Pending"
          subtitle="Press to expand"
          title="Pending"
        >
          {/* pending */}
          <ul className="flex flex-col gap-2 py-4">
            {pendingOrders?.map((orderItem) => (
              <DashboardOrderItem
                key={orderItem.orderItemID}
                orderItem={orderItem}
                updateOrders={updateOrders}
                nextStatus="preparing"
              />
            ))}
          </ul>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
