import React, { useEffect, useState } from "react";
import useOrders from "../../hooks/useOrders";
import { useSession } from "next-auth/react";
import { io, Socket } from "socket.io-client";

import { UserSession } from "@/lib/next-auth/types";
import { BACKEND_URL } from "@/constants/env";
import PochaOrderItem from "./PochaOrderItem";

interface PochaOrderListProps {
  pochaID: number;
}

export default function PochaOrderList({ pochaID }: PochaOrderListProps) {
  const { data: session, status: sessionStatus } = useSession() as {
    data: UserSession | undefined;
    status: string;
  };

  const {
    orders,
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

  return (
    <div className="w-full">
      <div className="p-4 space-y-4">
        {/* ready */}
        <div className="text-xl font-bold">Ready</div>
        {readyOrders?.map((orderItem) => (
          <PochaOrderItem key={orderItem.orderItemID} orderItem={orderItem} />
        ))}

        {/* preparing */}
        <div className="text-xl font-bold">Preparing</div>
        {preparingOrders?.map((orderItem) => (
          <PochaOrderItem key={orderItem.orderItemID} orderItem={orderItem} />
        ))}

        {/* pending */}
        <div className="text-xl font-bold">Pending</div>
        {pendingOrders?.map((orderItem) => (
          <PochaOrderItem key={orderItem.orderItemID} orderItem={orderItem} />
        ))}
      </div>
    </div>
  );
}
