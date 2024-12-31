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

    // Save socket instance to state
    setSocket(socketInstance);

    // Cleanup function
    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, [session, ordersStatus, pochaID, updateOrders]);

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
          <Card>
            <CardBody>
              <h3 className="text-xl font-bold text-michigan-blue mb-2">All</h3>
              <ul className="self-stretch flex flex-col">
                {/* {readyOrders?.map((orderItem, idx) => (
                  <>
                    <PochaOrderItem
                      key={orderItem.orderItemID}
                      orderItem={orderItem}
                      setSelectedOrder={setSelectedOrder}
                    />
                    {idx !== readyOrders.length - 1 && <HorizontalDivider />}
                  </>
                ))} */}
              </ul>
            </CardBody>
          </Card>
        </Tab>

        {/* Pending Tab */}
        <Tab key="pending" title="Pending">
          <Card>
            <CardBody>
              <h3 className="text-xl font-bold text-michigan-blue mb-2">
                Pending
              </h3>
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
            </CardBody>
          </Card>
        </Tab>

        {/* Preparing Tab */}
        <Tab key="preparing" title="Preparing">
          <Card>
            <CardBody>
              <h3 className="text-xl font-bold text-michigan-blue mb-2">
                Preparing
              </h3>
              <ul className="self-stretch flex flex-col">
                {preparingOrders?.map((orderItem, idx) => (
                  <>
                    <PochaOrderItem
                      key={orderItem.orderItemID}
                      orderItem={orderItem}
                      setSelectedOrder={setSelectedOrder}
                    />
                    {idx !== preparingOrders.length - 1 && (
                      <HorizontalDivider />
                    )}
                  </>
                ))}
              </ul>
            </CardBody>
          </Card>
        </Tab>

        {/* Ready Tab */}
        <Tab key="ready" title="Ready">
          <Card>
            <CardBody>
              <h3 className="text-xl font-bold text-michigan-blue mb-2">
                Ready{" "}
                <span className="text-base text-gray-500">
                  (Pick up at the counter)
                </span>
              </h3>
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
            </CardBody>
          </Card>
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
