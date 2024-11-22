"use client";

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
  const { orders, status: orderStatus } = useOrders(
    email,
    token,
    pochaInfo?.pochaID
  );

  if (
    adminStatus === "loading" ||
    pochaStatus === "loading" ||
    orderStatus === "loading"
  ) {
    return <LoadingSpinner />;
  }
  // only admin can view this page
  if (!isAdmin) {
    return <NotAuthorized />;
  }

  // need to think about how to display orders on dashboard

  // status에 따라 구분되어 있어야하며, 항상 createdAt을 기준으로 정렬되어 있어야 함
  console.log("orders", orders);

  return (
    <section>
      <Tabs aria-label="Options">
        <Tab key="orders" title="Orders">
          orders
        </Tab>
        <Tab key="stock" title="Stock">
          stock
        </Tab>
        <Tab key="history" title="History">
          history
        </Tab>
      </Tabs>
    </section>
  );
}
