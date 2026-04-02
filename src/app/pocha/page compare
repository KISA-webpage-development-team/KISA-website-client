"use client";

import React, { useState } from "react";

// ui components
// import { LoadingSpinner } from "@/components/ui/feedback";
import HomeHeading from "@/features/pocha/components/home/HomeHeading";
import HomeTabs from "@/features/pocha/components/home/HomeTabs";
import HomeTabContent from "@/features/pocha/components/home/HomeTabContent";
import { CherryBlossomPetals } from "@/features/pocha/components/manage/CherryBlossomPetals_optimized";
import { CherryBlossomBranch } from "@/features/pocha/components/manage/CherryBlossomBranch";

// hooks
import { useSearchParams } from "next/navigation";
// import usePocha from "@/features/pocha/hooks/usePocha";

// types
import { PochaInfo, PochaTab } from "@/types/pocha";
// import { sejongHospitalBold } from "@/utils/fonts/textFonts";

// [DEBUG] static stub — replace with usePocha() when re-enabling dynamic rendering
const DEBUG_POCHA_INFO: PochaInfo = {
  pochaID: 1,
  startDate: new Date(),
  endDate: new Date(),
  title: "벚꽃포차",
  description: "넌 봄 같아. 내 봄",
  ongoing: true,
};

export default function PochaPage() {
  // "/pocha?tab=menu" [default] or "/pocha?tab=orders"
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<PochaTab>(
    (searchParams.get("tab") as PochaTab) || "menu"
  );
  const [swayTrigger, setSwayTrigger] = useState(0);

  // [DEBUG] skip dynamic fetch — uncomment below and remove DEBUG_POCHA_INFO to restore
  // const { pochaInfo, status, error } = usePocha();
  // if (status === "loading") return <LoadingSpinner />;
  // if (status === "error") throw new Error(error || "Unexpected error occurred");
  // if (Object.keys(pochaInfo).length === 0) return (...);
  // if (pochaInfo?.ongoing === false) return (...);
  const pochaInfo = DEBUG_POCHA_INFO;

  return (
    <section
      className={`
        md:hidden flex flex-col min-h-screen
        relative !gap-0`}
    >
      {/* Branch sits in section's stacking context, above sticky tabs */}
      <div className="absolute top-0 left-0 z-[50] w-full">
        <CherryBlossomBranch triggerSway={swayTrigger} />
      </div>

      {/* PochaHeading (at the top, disappear when scrolling) */}
      <div className="relative z-10 flex-shrink-0">
        <CherryBlossomPetals petalCount={4} scrollOpacity={1} />
        <HomeHeading pochaInfo={pochaInfo} />
      </div>

      {/* Sticky Tabs (fixed at the top) */}
      <div className="sticky top-0 z-45 bg-white">
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
        <HomeTabContent activeTab={activeTab} pochaID={pochaInfo.pochaID} />
      </div>
    </section>
  );
}
