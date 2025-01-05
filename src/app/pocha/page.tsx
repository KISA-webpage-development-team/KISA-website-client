"use client";

import React, { useState } from "react";

// ui components
import PochaHeading from "@/features/pocha/components/PochaHeading";
import PochaMenuDetail from "@/features/pocha/components/menu/PochaMenuDetail";
import {
  LoadingSpinner,
  NotFound,
  NotLogin,
  UnexpectedError,
} from "@/final_refactor_src/components/feedback";

// hooks
import { useSearchParams } from "next/navigation";
import usePocha from "@/features/pocha/hooks/usePocha";

// types
import { MenuItem, PochaTab } from "@/types/pocha";
import PochaHomeTabs from "@/features/pocha/components/PochaHomeTabs";
import PochaHomeTabContent from "@/features/pocha/components/PochaHomeTabContent";

export default function PochaPage() {
  // "/pocha?tab=menu" [default] or "/pocha?tab=orders"
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<PochaTab>(
    (searchParams.get("tab") as PochaTab) || "menu"
  );

  // state for selected menu to open menu detail tab
  const [selectedMenu, setSelectedMenu] = useState<MenuItem>();

  // fetch pocha information (GET /pocha/status-info/)
  const { pochaInfo, status, error } = usePocha();

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  // Error Handling using error.tsx,
  // just throw the error, and it will be handled by error.tsx
  if (status === "error") {
    throw new Error(error || "Unexpected error occurred");
  }

  // [TODO] better UI
  // if pochaInfo === {}, then there is no scheduled pocha
  if (Object.keys(pochaInfo).length === 0) {
    return (
      <section className="flex justify-center items-center h-full">
        <p className="text-3xl font-bold">No scheduled pocha</p>
      </section>
    );
  }

  // [TODO] better UI
  // else if pochaInfo.ongoing === false, then show the upcoming pocha
  if (pochaInfo?.ongoing === false) {
    return (
      <section className="flex justify-center items-center h-full">
        <p className="text-3xl font-bold">Upcoming pocha</p>
        <PochaHeading pochaInfo={pochaInfo} />
      </section>
    );
  }

  // [Home UI] --------------------------------------------------------------------------------
  // IF any menu is selected, show the menu detail
  if (selectedMenu !== undefined) {
    return (
      <section className="overflow-y-auto h-full">
        <PochaMenuDetail
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          pochaid={pochaInfo?.pochaID}
        />
      </section>
    );
  }

  return (
    <section
      className={`
        md:hidden flex flex-col min-h-screen
        relative !gap-0`}
    >
      {/* PochaHeading (at the top, disappear when scrolling) */}
      <div className="relative z-40 flex-shrink-0">
        <PochaHeading pochaInfo={pochaInfo} />
      </div>

      {/* Sticky Tabs (fixed at the top) */}
      <div className="sticky top-0 z-50 bg-white flex-shrink-0">
        <PochaHomeTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main Content Area (scrollable) */}
      <div className="flex-1 overflow-y-auto">
        <PochaHomeTabContent
          activeTab={activeTab}
          pochaID={pochaInfo?.pochaID}
          setSelectedMenu={setSelectedMenu}
        />
      </div>
    </section>
  );
}
