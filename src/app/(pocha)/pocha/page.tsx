"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

// ui components
import { LoadingSpinner } from "@/components/ui/feedback";
import HomeHeading from "@/features/pocha/components/home/HomeHeading";
import HomeTabs from "@/features/pocha/components/home/HomeTabs";
import HomeTabContent from "@/features/pocha/components/home/HomeTabContent";
import { POCHA_THEME } from "@/features/pocha/featureFlag";

// hooks
import { useSearchParams } from "next/navigation";
import usePocha from "@/features/pocha/hooks/usePocha";

// types
import { PochaTab } from "@/types/pocha";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";

// Spring theme components -- only loaded when theme is spring
const CherryBlossomBranch =
  POCHA_THEME === "spring"
    ? dynamic(
        () =>
          import(
            "@/features/pocha/components/theme/CherryBlossomBranch"
          ).then((mod) => mod.CherryBlossomBranch),
        { ssr: false }
      )
    : null;

const CherryBlossomPetals =
  POCHA_THEME === "spring"
    ? dynamic(
        () =>
          import(
            "@/features/pocha/components/theme/CherryBlossomPetals_optimized"
          ).then((mod) => mod.CherryBlossomPetals),
        { ssr: false }
      )
    : null;

export default function PochaPage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<PochaTab>(
    (searchParams.get("tab") as PochaTab) || "menu"
  );
  const [swayTrigger, setSwayTrigger] = useState(0);

  const { pochaInfo, status, error } = usePocha();

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (status === "error") {
    throw new Error(error || "Unexpected error occurred");
  }

  if (Object.keys(pochaInfo).length === 0) {
    return (
      <section className="flex justify-center items-center h-full">
        <p className={`text-3xl ${sejongHospitalBold.className}`}>
          No scheduled pocha
        </p>
      </section>
    );
  }

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
      {/* Cherry blossom branch -- spring theme only */}
      {CherryBlossomBranch && (
        <div className="absolute top-0 left-0 z-[40] w-full">
          <CherryBlossomBranch triggerSway={swayTrigger} />
        </div>
      )}

      {/* PochaHeading (at the top, disappear when scrolling) */}
      <div className="relative z-[41] flex-shrink-0">
        {CherryBlossomPetals && (
          <CherryBlossomPetals petalCount={4} scrollOpacity={1} />
        )}
        <HomeHeading pochaInfo={pochaInfo} />
      </div>

      {/* Sticky Tabs (fixed at the top) */}
      <div className="sticky top-0 z-[45] bg-white">
        <HomeTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main Content Area (scrollable) */}
      <div
        className="flex-1"
        onClick={
          POCHA_THEME === "spring"
            ? (e) => {
                const btn = (e.target as HTMLElement).closest("button");
                if (btn?.textContent?.includes("View Cart")) {
                  setSwayTrigger((prev) => prev + 1);
                }
              }
            : undefined
        }
      >
        <HomeTabContent activeTab={activeTab} pochaID={pochaInfo?.pochaID} />
      </div>
    </section>
  );
}
