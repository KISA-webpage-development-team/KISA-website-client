"use client";

import OrderHistoryTable from "@/features/pocha/components/dashboard/OrderHistoryTable";
import OrdersTable from "@/features/pocha/components/dashboard/OrdersTable";
import useOrders from "@/features/pocha/hooks/useOrders";
import usePocha from "@/features/pocha/hooks/usePocha";
import {
  LoadingSpinner,
  NotAuthorized,
} from "@/final_refactor_src/components/feedback";
import useAdmin from "@/lib/next-auth/useAdmin";
import { Orders } from "@/types/pocha";
import { Tab, Tabs } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
// [TODO] put this page into auth middleware (no need to handle missing session)

export default function DashboardPage() {
  // fetch necessary information for the dashboard
  // each hook fetches with GET request
  const { isAdmin, email, token, status: adminStatus } = useAdmin();
  const { pochaInfo, status: pochaStatus } = usePocha();

  if (adminStatus === "loading" || pochaStatus === "loading") {
    return <LoadingSpinner />;
  }
  // only admin can view this page
  if (!isAdmin) {
    return <NotAuthorized />;
  }

  // need to think about how to display orders on dashboard

  return (
    <section>
      <Tabs aria-label="Options">
        <Tab key="orders" title="Orders">
          <OrdersTable token={token} pochaID={pochaInfo?.pochaID} />
        </Tab>
        <Tab key="stock" title="Stock">
          stock
        </Tab>
        <Tab key="history" title="History">
          <OrderHistoryTable token={token} pochaID={pochaInfo?.pochaID} />
        </Tab>
      </Tabs>
    </section>
  );
}
