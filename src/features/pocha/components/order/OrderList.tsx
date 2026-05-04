/**
 * OrderList
 * - Sectioned single-scroll: Ready (cards) > In progress (rows) > Past (collapsed).
 * - No filter tabs. Sections with zero items are omitted.
 * - Loading shows skeleton rows in the In-progress slot.
 * - Empty (no orders) shows a centered hint, no CTA.
 * - Errors show an inline Alert with a Retry affordance.
 */

import React, { useState } from "react";
import {
  Alert,
  Skeleton,
  Button,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@umichkisa-ds/web";

import useUserOrders from "../../hooks/useUserOrders";
import useUserOrderSocket from "../../hooks/useUserOrderSocket";
import { useAuth } from "@/lib/auth/authContext";
import { OrderItem } from "@/types/pocha";

import ReadyOrderCard from "./ReadyOrderCard";
import InProgressOrderRow from "./InProgressOrderRow";
import OrderTicketModal from "./OrderTicketModal";

interface OrderListProps {
  pochaID: number;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="type-h3 text-foreground">{children}</h2>
  );
}

function SkeletonRow() {
  return (
    <li className="list-none">
      <div className="flex items-start gap-4 rounded-md border border-border bg-surface">
        <Skeleton variant="rectangular" className="w-12 h-12 rounded-md" />
        <div className="flex-1 flex flex-col gap-2">
          <Skeleton variant="rectangular" className="h-4 w-2/3" />
          <Skeleton variant="rectangular" className="h-3 w-1/3" />
          <Skeleton variant="rectangular" className="h-3 w-full" />
        </div>
      </div>
    </li>
  );
}

export default function OrderList({ pochaID }: OrderListProps) {
  const { session } = useAuth();

  const {
    updateOrder,
    addNewOrderItem,
    pendingOrders,
    preparingOrders,
    readyOrders,
    closedOrders,
    status: ordersStatus,
    refetch,
  } = useUserOrders(session?.user?.email, session?.token, pochaID);

  useUserOrderSocket({
    token: session?.token,
    email: session?.user?.email,
    pochaID,
    updateOrder,
    addNewOrderItem,
  });

  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);

  const handleOpenTicket = (orderItem: OrderItem) => {
    setSelectedOrder(orderItem);
  };
  const handleCloseTicket = () => setSelectedOrder(null);

  const handleRetry = () => {
    refetch();
  };

  // ------- Error state -------
  if (ordersStatus === "error") {
    return (
      <div className="flex flex-col w-full px-4 py-3 gap-4">
        <Alert
          variant="error"
          title="Couldn't load your orders"
        >
          Something went wrong fetching your orders. Please try again.
        </Alert>
        <Button variant="secondary" size="md" onClick={handleRetry}>
          Retry
        </Button>
      </div>
    );
  }

  // ------- Loading state -------
  if (ordersStatus === "loading") {
    return (
      <div className="flex flex-col w-full px-4 py-3 gap-4">
        <SectionHeading>In progress</SectionHeading>
        <ul className="flex flex-col gap-3">
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </ul>
      </div>
    );
  }

  const activeInProgress = [...preparingOrders, ...pendingOrders];
  const hasReady = readyOrders.length > 0;
  const hasActive = activeInProgress.length > 0;
  const hasPast = closedOrders.length > 0;
  const totallyEmpty = !hasReady && !hasActive && !hasPast;

  // ------- Wholly empty state -------
  if (totallyEmpty) {
    return (
      <div className="flex flex-col items-center justify-center w-full px-4 py-12 text-center">
        <p className="type-body text-muted-foreground">No orders yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col w-full gap-6">
        {/* ----- Ready for pickup ----- */}
        {hasReady && (
          <section className="flex flex-col gap-3">
            <SectionHeading>Ready for pickup</SectionHeading>
            <ul className="flex flex-col gap-3">
              {readyOrders.map((orderItem) => (
                <ReadyOrderCard
                  key={orderItem.orderItemID}
                  orderItem={orderItem}
                  onOpen={handleOpenTicket}
                />
              ))}
            </ul>
          </section>
        )}

        {/* ----- In progress ----- */}
        {hasActive && (
          <section className="flex flex-col gap-3">
            <SectionHeading>In progress</SectionHeading>
            <ul className="flex flex-col gap-3">
              {activeInProgress.map((orderItem) => (
                <InProgressOrderRow
                  key={orderItem.orderItemID}
                  orderItem={orderItem}
                />
              ))}
            </ul>
          </section>
        )}

        {/* ----- Past orders (collapsed footer) ----- */}
        {hasPast && (
          <section className="flex flex-col gap-3">
            {!hasActive && (
              <p className="type-caption text-muted-foreground">
                No active orders
              </p>
            )}
            <Accordion type="single">
              <AccordionItem value="past-orders">
                <AccordionTrigger>
                  <span className="text-muted-foreground">
                    Past orders ({closedOrders.length})
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="flex flex-col gap-3 pt-2">
                    {closedOrders.map((orderItem) => (
                      <InProgressOrderRow
                        key={orderItem.orderItemID}
                        orderItem={orderItem}
                      />
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        )}
      </div>

      <OrderTicketModal
        orderItem={selectedOrder}
        onClose={handleCloseTicket}
      />
    </>
  );
}
