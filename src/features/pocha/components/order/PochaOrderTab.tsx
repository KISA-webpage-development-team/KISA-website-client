import React, { useEffect, useState } from "react";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "@/utils/fonts/textFonts";
import useOrders from "../../hooks/useOrders";
import { useSession } from "next-auth/react";
import { io, Socket } from "socket.io-client";

import { UserSession } from "@/lib/next-auth/types";
import PochaOrderItem from "./PochaOrderItem";
import { OrderItem, OrderStatus } from "@/types/pocha";
import { Accordion, AccordionItem } from "@nextui-org/react";
import UserOrderHistories from "./UserOrderHistories";
import OrderTicket from "./OrderTicket";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react"; // Using Tabs
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
    orders,
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
        updateOrders(orderItemID, OrderStatus.CLOSED);
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
    // sejong hospital font
    <div className="flex flex-col w-full h-full px-5">
      <p
        className={`${sejongHospitalLight.className} my-3.5 text-sm text-black text-center`}
      >
        Track your order status.
      </p>

      {/* Tabs for Order Status */}
      <Tabs
        className={`${sejongHospitalBold.className} w-full`}
        size="lg"
        fullWidth
        aria-label="Order Status"
        radius="sm"
      >
        {/* All Tab */}
        <Tab key="all" title="All">
          {(() => {
            // An array that combines all 3: pending, preparing, ready.
            const allOrders = [
              ...(orders?.pending || []),
              ...(orders?.preparing || []),
              ...(orders?.ready || []),
            ];

            // If allOrders array length = 0 --> No order request has been made.
            return allOrders.length === 0 ? (
              <div className="text-center mt-4">
                You haven&apos;t placed any orders yet.
              </div>
            ) : (
              // Else
              <ul className="self-stretch flex flex-col gap-4">
                {allOrders.map((orderItem) => (
                  <div
                    key={orderItem.orderItemID}
                    className="bg-white shadow-md rounded-lg border border-gray-200"
                  >
                    <PochaOrderItem
                      orderItem={orderItem}
                      setSelectedOrder={setSelectedOrder}
                    />
                  </div>
                ))}
              </ul>
            );
          })()}
        </Tab>

        {/* Pending Tab */}
        <Tab key="pending" title="Pending">
          <ul className="self-stretch flex flex-col gap-4">
            {pendingOrders?.map((orderItem, idx) => (
              <div
                key={orderItem.orderItemID}
                className="bg-white shadow-md rounded-lg border border-gray-200"
              >
                <PochaOrderItem
                  orderItem={orderItem}
                  setSelectedOrder={setSelectedOrder}
                />
              </div>
            ))}
          </ul>
        </Tab>

        {/* Preparing Tab */}
        <Tab key="preparing" title="Preparing">
          <ul className="self-stretch flex flex-col gap-4">
            {preparingOrders?.map((orderItem, idx) => (
              <div
                key={orderItem.orderItemID}
                className="bg-white shadow-md rounded-lg border border-gray-200"
              >
                <PochaOrderItem
                  key={orderItem.orderItemID}
                  orderItem={orderItem}
                  setSelectedOrder={setSelectedOrder}
                />
              </div>
            ))}
          </ul>
        </Tab>

        {/* Ready Tab */}
        <Tab key="ready" title="Ready">
          <ul className="self-stretch flex flex-col gap-4">
            {readyOrders?.map((orderItem, idx) => (
              <div
                key={orderItem.orderItemID}
                className="bg-white shadow-md rounded-lg border border-gray-200"
              >
                <PochaOrderItem
                  key={orderItem.orderItemID}
                  orderItem={orderItem}
                  setSelectedOrder={setSelectedOrder}
                />
              </div>
            ))}
          </ul>
        </Tab>
      </Tabs>
    </div>

    //   {/* Order History Accordion */}
    //   <Accordion>
    //     <AccordionItem
    //       key="1"
    //       aria-label="Order History"
    //       title="Order History"
    //       className={`${sejongHospitalBold.className} text-xl !text-gray-300
    //       `}
    //     >
    //       <UserOrderHistories
    //         email={session.user.email}
    //         token={session.token}
    //         pochaID={pochaID}
    //       />
    //     </AccordionItem>
    //   </Accordion>
    // </div>
  );
}
