import React, { useEffect, useState } from "react";
import { sejongHospitalBold, sejongHospitalLight, } from "@/utils/fonts/textFonts";
import useOrders from "../../hooks/useOrders";
import { useSession } from "next-auth/react";
import { io, Socket } from "socket.io-client";

import { UserSession } from "@/lib/next-auth/types";
import { BACKEND_URL } from "@/constants/env";
import PochaOrderItem from "./PochaOrderItem";
import { OrderItem, OrderStatus } from "@/types/pocha";
import OpenCartButton from "@/features/pocha/components/menu/OpenCartButton";

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
      ({ menuID, newStatus }: { menuID: number; newStatus: OrderStatus }) => {
        updateOrders(menuID, newStatus);
      }
    );

    // listen to status-closed-{email} event
    const closedEvent = `status-closed-${session?.user?.email}`;
    socketInstance.on(closedEvent, ({ menuID }: { menuID: number }) => {
      updateOrders(menuID, "closed");
    });

    // Save socket instance to state
    setSocket(socketInstance);

    // Cleanup function
    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, [session, ordersStatus, pochaID]);

  const handleSocketTest = async () => {
    try {
      // /pocha/socket-test GET
      const res = await fetch(`${BACKEND_URL}/pocha/socket-test/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        },
      });

      console.log("Socket test response: ", res);
    } catch (error) {
      console.error("Error fetching orders: ", error);
    }
  };

  if (sessionStatus === "loading" || ordersStatus === "loading") {
    return <></>;
  }

  return (
    <div className="w-full">
      <div className="p-4 space-y-4">
        <button onClick={handleSocketTest}>Test Button</button>
        {/* ready */}
        <div className={`${sejongHospitalBold.className} text-xl font-bold`}>Ready</div>
        {readyOrders?.map((orderItem) => (
          <PochaOrderItem key={orderItem.orderItemID} orderItem={orderItem} />
        ))}

        {/* preparing */}
        <div className={`${sejongHospitalBold.className} text-xl font-bold`}>Preparing</div>
        {preparingOrders?.map((orderItem) => (
          <PochaOrderItem key={orderItem.orderItemID} orderItem={orderItem} />
        ))}

        {/* pending */}
        <div className={`${sejongHospitalBold.className} text-xl font-bold`}>Pending</div>
        {pendingOrders?.map((orderItem) => (
          <PochaOrderItem key={orderItem.orderItemID} orderItem={orderItem} />
        ))}
      </div>
      <OpenCartButton pochaid={pochaID} />
    </div>
  );
}
