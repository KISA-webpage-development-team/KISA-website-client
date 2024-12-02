import React, { useEffect, useState } from "react";
import useOrders from "../../hooks/useOrders";
import { useSession } from "next-auth/react";
import { io, Socket } from "socket.io-client";

import { UserSession } from "@/lib/next-auth/types";
import { BACKEND_URL } from "@/constants/env";
import PochaOrderItem from "./PochaOrderItem";
import { OrderItem, OrderStatus } from "@/types/pocha";
import { Accordion, AccordionItem } from "@nextui-org/react";
import UserOrderHistories from "./UserOrderHistories";
import OrderTicket from "./OrderTicket";

interface PochaOrderListProps {
  pochaID: number;
}

export default function PochaOrderList({ pochaID }: PochaOrderListProps) {
  const { data: session, status: sessionStatus } = useSession() as {
    data: UserSession | undefined;
    status: string;
  };

  const {
    addNewOrders,
    updateOrders,
    pendingOrders,
    preparingOrders,
    readyOrders,
    status: ordersStatus,
  } = useOrders(session?.user?.email, session?.token, pochaID);

  const [selectedOrder, setSelectedOrder] = useState<OrderItem>();

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
        token: session.token,
      },
      query: {
        email: session.user.email,
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

    // listen to status-change-{email} event
    const statusChangeEvent = `status-change-${session?.user?.email}`;
    socketInstance.on(
      statusChangeEvent,
      ({
        orderItemID,
        status,
      }: {
        orderItemID: number;
        status: OrderStatus;
      }) => {
        updateOrders(orderItemID, status);
      }
    );

    // listen to status-closed-{email} event
    const closedEvent = `status-closed-${session?.user?.email}`;
    socketInstance.on(
      closedEvent,
      ({ orderItemID }: { orderItemID: number }) => {
        updateOrders(orderItemID, "closed");
      }
    );

    // Save socket instance to state
    setSocket(socketInstance);

    // Cleanup function
    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, [session, ordersStatus, pochaID]);

  if (sessionStatus === "loading" || ordersStatus === "loading") {
    return <></>;
  }

  if (selectedOrder !== undefined) {
    return <OrderTicket orderItem={selectedOrder} />;
  }

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex flex-col p-4 space-y-4">
        {/* ready */}
        <div className="text-xl font-bold">Ready</div>
        {readyOrders?.map((orderItem) => (
          <PochaOrderItem
            key={orderItem.orderItemID}
            orderItem={orderItem}
            setSelectedOrder={setSelectedOrder}
          />
        ))}

        {/* preparing */}
        <div className="text-xl font-bold">Preparing</div>
        {preparingOrders?.map((orderItem) => (
          <PochaOrderItem
            key={orderItem.orderItemID}
            orderItem={orderItem}
            setSelectedOrder={setSelectedOrder}
          />
        ))}

        {/* pending */}
        <div className="text-xl font-bold">Pending</div>
        {pendingOrders?.map((orderItem) => (
          <PochaOrderItem
            key={orderItem.orderItemID}
            orderItem={orderItem}
            setSelectedOrder={setSelectedOrder}
          />
        ))}
      </div>

      {/* Order History Accordion */}
      <Accordion>
        <AccordionItem key="1" aria-label="Order History" title="Order History">
          <UserOrderHistories
            email={session.user.email}
            token={session.token}
            pochaID={pochaID}
          />
        </AccordionItem>
      </Accordion>
    </div>
  );
}
