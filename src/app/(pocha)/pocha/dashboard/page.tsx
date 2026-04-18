"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import useAdmin from "@/lib/next-auth/useAdmin";

// ui components
import { LoadingSpinner, NotAuthorized } from "@/components/ui/feedback";
import usePochaID from "@/features/pocha/hooks/usePochaID";
import DashboardTabs from "@/features/pocha/components/dashboard/DashboardTabs";
import DashboardTabContent from "@/features/pocha/components/dashboard/DashboardTabContent";

// types
import { PochaDashboardTab } from "@/types/pocha";

export default function DashboardPage() {
  // fetch necessary information for the dashboard
  // each hook fetches with GET request
  const { isAdmin, email, token, status: adminStatus } = useAdmin();
  const { pochaID, status: pochaIDStatus, error: pochaIDError } = usePochaID();

  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<PochaDashboardTab>(
    (searchParams.get("tab") as PochaDashboardTab) || "orders"
  );

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
    <section className="full-width-container px-2">
      <div className="flex w-full justify-between items-center">
        <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <p className="text-lg">
          To promote Order Item to next status, 1. select the order item, 2.
          click the Promote button
        </p>
      </div>

      <DashboardTabContent
        email={email}
        token={token}
        pochaID={pochaID}
        activeTab={activeTab}
      />
    </section>
  );
}
