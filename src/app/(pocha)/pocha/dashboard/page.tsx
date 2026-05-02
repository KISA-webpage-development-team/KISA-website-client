"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Container,
  Button,
  Icon,
  StatusView,
} from "@umichkisa-ds/web";

import useAdmin from "@/lib/next-auth/useAdmin";

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
  const {
    pochaID,
    status: pochaIDStatus,
    error: pochaIDError,
    noPocha,
  } = usePochaID();

  const searchParams = useSearchParams();
  const initialTab: PochaDashboardTab =
    (searchParams.get("tab") as PochaDashboardTab) || "orders";

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
  const [selectMode, setSelectMode] = useState(false);
  const [isPromotingFood, setIsPromotingFood] = useState(false);
  const [isPromotingDrink, setIsPromotingDrink] = useState(false);
  const isPromoting = isPromotingFood || isPromotingDrink;

  const handleToggleSelectMode = useCallback(() => {
    if (isPromoting) return;
    setSelectMode((prev) => !prev);
  }, [isPromoting]);

  const handleEnterSelectMode = useCallback(() => {
    if (isPromoting) return;
    setSelectMode(true);
  }, [isPromoting]);

  // Switching away from Orders tab → exit select mode (the grids' existing
  // selectMode-false effect clears their selectedIds).
  useEffect(() => {
    if (currentTab !== "orders" && selectMode) {
      setSelectMode(false);
    }
  }, [currentTab, selectMode]);

  if (pochaIDStatus === "error") {
    throw new Error(pochaIDError);
  }

  // Auth resolved + not admin → block. Gated on adminStatus === "success" so
  // we don't flash NotAuthorized while the session is still loading.
  if (adminStatus === "success" && !isAdmin) {
    return <StatusView fullScreen variant="not-authorized" />;
  }

  // 204 from /pocha/status-info — backend signals there is no ongoing pocha
  // right now. Not an error, not loading; render a dedicated empty state.
  if (noPocha) {
    return (
      <StatusView
        fullScreen
        variant="not-found"
        icon="calendar"
        title="진행 중인 포차가 없습니다"
        description="다음 포차가 시작되면 이 곳에서 주문을 확인할 수 있습니다."
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
              <div className="flex items-center gap-4">
                <span className="type-body-sm text-muted-foreground hidden sm:inline">
                  {selectMode
                    ? "Tap cards to select"
                    : "Promote multiple at once"}
                </span>
                <Button
                  variant={selectMode ? "primary" : "secondary"}
                  size="md"
                  onClick={handleToggleSelectMode}
                  disabled={isPromoting}
                  aria-pressed={selectMode}
                >
                  <Icon
                    name={selectMode ? "check" : "circle-check"}
                    size="sm"
                    aria-hidden
                  />
                  {selectMode ? "Done" : "Bulk promote"}
                </Button>
              </div>
            )}
          </div>

          <TabsContent value="orders">
            <OrderDashboard
              pochaID={safePochaID}
              email={email ?? ""}
              token={token ?? ""}
              ordersHook={ordersHook}
              selectMode={selectMode}
              onEnterSelectMode={handleEnterSelectMode}
              onPromotingFoodChange={setIsPromotingFood}
              onPromotingDrinkChange={setIsPromotingDrink}
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
