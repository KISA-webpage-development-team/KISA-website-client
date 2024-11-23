import React, { useEffect, useState } from "react";
import useOrders from "../../hooks/useOrders";
import { useSession } from "next-auth/react";
import { io, Socket } from "socket.io-client";

import { UserSession } from "@/lib/next-auth/types";
import { BACKEND_URL } from "@/constants/env";

interface PochaOrderListProps {
  pochaID: number;
}

export default function PochaOrderList({ pochaID }: PochaOrderListProps) {
  const { data: session, status: sessionStatus } = useSession() as {
    data: UserSession | undefined;
    status: string;
  };

  const { orders, status: ordersStatus } = useOrders(
    session?.user?.email,
    session?.token,
    pochaID
  );

  const [socket, setSocket] = useState<Socket | null>(null);

  // Socket.IO Connection
  useEffect(() => {
    // defensive check: no orders yet (i.e. no session, no token, no pochaID)
    if (ordersStatus !== "success") {
      return;
    }
    // Initialize socket connection
    const socketInstance = io(BACKEND_URL, {
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

  console.log("orders: ", orders);

  return <div>Orders</div>;
}
