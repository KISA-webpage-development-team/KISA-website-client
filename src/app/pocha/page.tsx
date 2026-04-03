"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

// ui components
import { LoadingSpinner } from "@/components/ui/feedback";
import HomeHeading from "@/features/pocha/components/home/HomeHeading";
import HomeTabs from "@/features/pocha/components/home/HomeTabs";
import HomeTabContent from "@/features/pocha/components/home/HomeTabContent";
import { CherryBlossomPetals } from "@/features/pocha/components/theme/CherryBlossomPetals_optimized";

const CherryBlossomBranch = dynamic(
  () =>
    import("@/features/pocha/components/theme/CherryBlossomBranch").then(
      (mod) => mod.CherryBlossomBranch
    ),
  { ssr: false }
);

// hooks
import { useSearchParams } from "next/navigation";
import usePocha from "@/features/pocha/hooks/usePocha";

// types
import { PochaTab } from "@/types/pocha";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";

export default function PochaPage() {
  // "/pocha?tab=menu" [default] or "/pocha?tab=orders"
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<PochaTab>(
    (searchParams.get("tab") as PochaTab) || "menu"
  );
  const [swayTrigger, setSwayTrigger] = useState(0);

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
        <p className={`text-3xl ${sejongHospitalBold.className}`}>
          No scheduled pocha
        </p>
      </section>
    );
  }

  // [TODO] better UI
  // else if pochaInfo.ongoing === false, then show the upcoming pocha
  if (pochaInfo?.ongoing === false) {
    return (
      <section className="flex justify-center items-center h-full">
        <p className={`text-3xl ${sejongHospitalBold.className}`}>
          Upcoming pocha
        </p>
        <HomeHeading pochaInfo={pochaInfo} />
      </section>
    );
  }

  return (
    <section
      className={`
        md:hidden flex flex-col min-h-screen
        relative !gap-0`}
    >
      {/* Branch sits in section's stacking context, above sticky tabs */}
      <div className="absolute top-0 left-0 z-[40] w-full">
        <CherryBlossomBranch triggerSway={swayTrigger} />
      </div>

      {/* PochaHeading (at the top, disappear when scrolling) */}
      <div className="relative z-[41] flex-shrink-0">
        <CherryBlossomPetals petalCount={4} scrollOpacity={1} />
        <HomeHeading pochaInfo={pochaInfo} />
      </div>

      {/* Sticky Tabs (fixed at the top) */}
      <div className="sticky top-0 z-[45] bg-white">
        <HomeTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main Content Area (scrollable) */}
      <div
        className="flex-1"
        onClick={(e) => {
          const btn = (e.target as HTMLElement).closest('button');
          if (btn?.textContent?.includes('View Cart')) {
            setSwayTrigger((prev) => prev + 1);
          }
        }}
      >
        <HomeTabContent activeTab={activeTab} pochaID={pochaInfo?.pochaID} />
      </div>
    </section>
  );
}
