"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Container,
  StatusView,
  buttonVariants,
} from "@umichkisa-ds/web";

import useAdmin from "@/lib/next-auth/useAdmin";

import usePochaID from "@/features/pocha/hooks/usePochaID";
import useDashboardOrders from "@/features/pocha/hooks/useDashboardOrders";
import OrderDashboard from "@/features/pocha/components/dashboard/OrderDashboard";
import OrderHistoryTable from "@/features/pocha/components/dashboard/OrderHistoryTable";
import StockManager from "@/features/pocha/components/dashboard/StockManager";
import DashboardStatsStrip from "@/features/pocha/components/dashboard/DashboardStatsStrip";
import { updateURLWithTab } from "@/features/pocha/utils/updateURL";
import { useDashboardSelectMode } from "./useDashboardSelectMode";
import BulkPromoteToggle from "./BulkPromoteToggle";

// types
import { PochaDashboardTab } from "@/types/pocha";

export default function DashboardPage() {
  // fetch necessary information for the dashboard
  // each hook fetches with GET request
  const { email, token } = useAdmin();
  const {
    pochaID,
    status: pochaIDStatus,
    error: pochaIDError,
    noPocha,
  } = usePochaID();

  const searchParams = useSearchParams();
  const VALID_TABS: PochaDashboardTab[] = ["orders", "stock", "history"];
  const rawTab = searchParams.get("tab");
  const initialTab: PochaDashboardTab =
    rawTab && (VALID_TABS as string[]).includes(rawTab)
      ? (rawTab as PochaDashboardTab)
      : "orders";

  // Controlled tab state — drives whether the Bulk-promote toggle renders
  // (only meaningful on Orders tab) and lets us auto-exit select mode on
  // tab switch.
  const [currentTab, setCurrentTab] = useState<PochaDashboardTab>(initialTab);

  // Hoisted dashboard-orders hook so DashboardStatsStrip and OrderDashboard
  // share a single fetch. (useDashboardOrders is plain useEffect+useState,
  // not SWR-deduped — wiring it twice would double-fetch.) Coerce a null
  // pochaID to 0 so the hook stays in its `loading` branch (it gates on
  // falsy) while admin/pochaID are still resolving — the page itself now
  // renders the shell with skeletons instead of a full-screen spinner.
  const ordersHook = useDashboardOrders(pochaID ?? 0, token ?? "");

  // Page-level select mode (lifted from OrderDashboard so the Bulk-promote
  // toggle can live on the same row as Tabs instead of inside the food grid).
  const select = useDashboardSelectMode(currentTab);

  if (pochaIDStatus === "error") {
    throw new Error(pochaIDError);
  }

  // 204 from /pocha/status-info — backend signals there is no ongoing pocha
  // right now. Not an error, not loading; render a dedicated empty state
  // with a CTA into /pocha/manage so admins can create/schedule one.
  if (noPocha) {
    return (
      <StatusView
        fullScreen
        variant="not-found"
        icon="calendar"
        title="진행 중인 포차가 없습니다"
        description="다음 포차가 시작되면 이 곳에서 주문을 확인할 수 있습니다."
        action={
          <Link
            href="/admin/pocha/manage"
            className={buttonVariants({ variant: "primary", size: "md" })}
          >
            포차 관리로 이동
          </Link>
        }
      />
    );
  }

  const safePochaID = pochaID ?? 0;

  return (
    <Container size="full">
      <div className="flex flex-col gap-6">
        <DashboardStatsStrip
          pochaID={safePochaID}
          token={token ?? ""}
          ordersMap={ordersHook.ordersMap}
          ordersStatus={ordersHook.status}
        />

        <Tabs
          value={currentTab}
          onValueChange={(v) => {
            setCurrentTab(v as PochaDashboardTab);
            updateURLWithTab(v);
          }}
        >
          <div className="flex w-full justify-between items-center gap-4 flex-wrap">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="stock">Stock</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            {currentTab === "orders" && (
              <BulkPromoteToggle
                selectMode={select.selectMode}
                disabled={select.isPromoting}
                onToggle={select.handleToggle}
              />
            )}
          </div>

          <TabsContent value="orders">
            <OrderDashboard
              pochaID={safePochaID}
              email={email ?? ""}
              token={token ?? ""}
              ordersHook={ordersHook}
              selectMode={select.selectMode}
              onEnterSelectMode={select.handleEnter}
              onPromotingFoodChange={select.setIsPromotingFood}
              onPromotingDrinkChange={select.setIsPromotingDrink}
            />
          </TabsContent>
          <TabsContent value="stock">
            <StockManager pochaID={safePochaID} token={token ?? ""} />
          </TabsContent>
          <TabsContent value="history">
            <OrderHistoryTable token={token ?? ""} pochaID={safePochaID} />
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
}
