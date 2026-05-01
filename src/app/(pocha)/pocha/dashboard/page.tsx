"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent, Container } from "@umichkisa-ds/web";

import useAdmin from "@/lib/next-auth/useAdmin";

// ui components
import { LoadingSpinner, NotAuthorized } from "@/components/ui/feedback";
import usePochaID from "@/features/pocha/hooks/usePochaID";
import useDashboardOrders from "@/features/pocha/hooks/useDashboardOrders";
import OrderDashboard from "@/features/pocha/components/dashboard/OrderDashboard";
import OrderHistoryTable from "@/features/pocha/components/dashboard/OrderHistoryTable";
import StockManager from "@/features/pocha/components/dashboard/StockManager";
import DashboardStatsStrip from "@/features/pocha/components/dashboard/DashboardStatsStrip";
import { updateURLWithTab } from "@/features/pocha/utils/updateURL";

// types
import { PochaDashboardTab } from "@/types/pocha";

export default function DashboardPage() {
  // fetch necessary information for the dashboard
  // each hook fetches with GET request
  const { isAdmin, email, token, status: adminStatus } = useAdmin();
  const { pochaID, status: pochaIDStatus, error: pochaIDError } = usePochaID();

  const searchParams = useSearchParams();
  const initialTab: PochaDashboardTab =
    (searchParams.get("tab") as PochaDashboardTab) || "orders";

  // Hoisted dashboard-orders hook so DashboardStatsStrip and OrderDashboard
  // share a single fetch. (useDashboardOrders is plain useEffect+useState,
  // not SWR-deduped — wiring it twice would double-fetch.)
  const ordersHook = useDashboardOrders(pochaID, token ?? "");

  // Rebuild a flat ordersMap for the stats strip from the bucketed return.
  const ordersMap = useMemo(() => {
    const m = new Map<number, (typeof ordersHook.immediatePrepOrders.pending)[number]>();
    [
      ...ordersHook.immediatePrepOrders.pending,
      ...ordersHook.immediatePrepOrders.preparing,
      ...ordersHook.immediatePrepOrders.ready,
      ...ordersHook.notImmediatePrepOrders.pending,
      ...ordersHook.notImmediatePrepOrders.preparing,
      ...ordersHook.notImmediatePrepOrders.ready,
    ].forEach((o) => m.set(o.orderItemID, o));
    return m;
  }, [ordersHook.immediatePrepOrders, ordersHook.notImmediatePrepOrders]);

  if (adminStatus === "loading" || pochaIDStatus === "loading") {
    return <LoadingSpinner />;
  }

  if (pochaIDStatus === "error") {
    throw new Error(pochaIDError);
  }

  // only admin can view this page
  if (!isAdmin) {
    return <NotAuthorized />;
  }

  return (
    <Container size="full">
      <div className="flex flex-col gap-6">
        <DashboardStatsStrip
          pochaID={pochaID}
          token={token ?? ""}
          ordersMap={ordersMap}
          ordersStatus={ordersHook.status}
        />

        <Tabs
          defaultValue={initialTab}
          onValueChange={(v) => updateURLWithTab(v)}
        >
          <div className="flex w-full justify-between items-center gap-4 flex-wrap">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="stock">Stock</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <p className="type-body-sm text-muted-foreground">
              To promote Order Item to next status, 1. select the order item, 2.
              click the Promote button
            </p>
          </div>

          <TabsContent value="orders">
            <OrderDashboard
              pochaID={pochaID}
              email={email ?? ""}
              token={token ?? ""}
              ordersHook={ordersHook}
            />
          </TabsContent>
          <TabsContent value="stock">
            <StockManager pochaID={pochaID} token={token ?? ""} />
          </TabsContent>
          <TabsContent value="history">
            <OrderHistoryTable token={token ?? ""} pochaID={pochaID} />
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
}
