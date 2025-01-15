import React, { useEffect, useState } from "react";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import useOrders from "../../hooks/useOrders";
import { useSession } from "next-auth/react";
import { io, Socket } from "socket.io-client";

import { UserSession } from "@/lib/next-auth/types";
import PochaOrderItem from "./PochaOrderItem";
import { OrderItem, OrderStatus } from "@/types/pocha";
import { Accordion, AccordionItem } from "@nextui-org/react";
import UserOrderHistories from "./UserOrderHistories";
import OrderTicket from "./OrderTicket";
import { HorizontalDivider } from "@/final_refactor_src/components/divider";
import OrderStatusSelector from "./OrderStatusSelector";

interface PochaOrderTabProps {
  pochaID: number;
}

export default function PochaOrderTab({ pochaID }: PochaOrderTabProps) {
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

  // Socket.IO Connection --------------------------------------
  useEffect(() => {
    // defensive check: no orders yet (i.e. no session, no token, no pochaID)
    if (ordersStatus !== "success") {
      return;
    }
    // Initialize socket connection
    const socketInstance = io("https://umichkisa-api.com", {
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

    // You can save socket instance to state like below
    // setSocket(socketInstance);

    // Cleanup function
    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, [session, ordersStatus, pochaID, updateOrders]);

  // UI Rendering ----------------------------------------------
  if (sessionStatus === "loading" || ordersStatus === "loading") {
    return <></>;
  }

  if (selectedOrder !== undefined) {
    return <OrderTicket orderItem={selectedOrder} />;
  }

  return (
    <div
      className="w-full h-full py-6 px-8
    flex flex-col justify-between bg-white"
    >
      {/* Order Status Section */}
      <OrderStatusSelector />

      <div className="flex flex-col space-y-2">
        {/* ready */}
        <div className="flex flex-col items-start gap-1">
          <h2
            className={`${sejongHospitalBold.className} text-xl text-michigan-blue
              flex flex-col items-start`}
          >
            Ready <span className="text-base">( Pick up at the counter )</span>
          </h2>
          <ul className="self-stretch flex flex-col">
            {readyOrders?.map((orderItem, idx) => (
              <>
                <PochaOrderItem
                  key={orderItem.orderItemID}
                  orderItem={orderItem}
                  setSelectedOrder={setSelectedOrder}
                />
                {idx !== readyOrders.length - 1 && <HorizontalDivider />}
              </>
            ))}
          </ul>
        </div>
        <HorizontalDivider color="gray" />

        {/* preparing */}
        <div className="flex flex-col items-start gap-1">
          <h2
            className={`${sejongHospitalBold.className} text-xl text-michigan-blue
              `}
          >
            Preparing
          </h2>
          <ul className="self-stretch flex flex-col">
            {preparingOrders?.map((orderItem, idx) => (
              <>
                <PochaOrderItem
                  key={orderItem.orderItemID}
                  orderItem={orderItem}
                  setSelectedOrder={setSelectedOrder}
                />
                {idx !== preparingOrders.length - 1 && <HorizontalDivider />}
              </>
            ))}
          </ul>
        </div>
        <HorizontalDivider color="gray" />
        {/* pending */}
        <div className="flex flex-col items-start gap-1">
          <h2
            className={`${sejongHospitalBold.className} text-xl text-michigan-blue
              `}
          >
            Pending
          </h2>
          <ul className="self-stretch flex flex-col">
            {pendingOrders?.map((orderItem, idx) => (
              <>
                <PochaOrderItem
                  key={orderItem.orderItemID}
                  orderItem={orderItem}
                  setSelectedOrder={setSelectedOrder}
                />
                {idx !== pendingOrders.length - 1 && <HorizontalDivider />}
              </>
            ))}
          </ul>
        </div>
        <HorizontalDivider color="gray" />
      </div>

      {/* Order History Accordion */}
      <Accordion>
        <AccordionItem
          key="1"
          aria-label="Order History"
          title="Order History"
          className={`${sejongHospitalBold.className} text-xl !text-gray-300 
          `}
        >
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
