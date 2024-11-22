"use client";

import React from "react";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
// types
import { PochaTab } from "@/types/pocha";

type PochaTabsProps = {
  activeTab: PochaTab;
  setActiveTab: (PochaTab) => void;
  searchParams: URLSearchParams;
};

export default function PochaTabs({
  activeTab,
  setActiveTab,
  searchParams,
}: PochaTabsProps) {
  // const searchParams = useSearchParams();
  // const currTabState = (searchParams.get("tab") as PochaTab) || "menu";

  // This is used for redirection from pay-success --> directly to orders page.
  // useEffect(() => {
  //   const tab = searchParams.get("tab");
  //   const from = searchParams.get("from");

  //   if (from === "pay-success" && tab) {
  //     setActiveTab(tab as PochaTab);
  //   } else {
  //     setActiveTab("menu");
  //   }
  // }, [searchParams, setActiveTab]);

  const handleTabChange = (selectedTab: PochaTab) => {
    const searchParams = new URLSearchParams({ tab: selectedTab });
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${searchParams}`
    );
    setActiveTab(selectedTab);
  };

  const generateTabStyle = (isCurTabSelected: boolean) => {
    // if (isCurTabSelected) {
    //   return "flex-1 text-black font-semibold";
    // } else {
    //   return "flex-1 text-gray-400";
    // }

    return `flex-1 ${
      isCurTabSelected
        ? `text-black font-semibold ${sejongHospitalBold.className}`
        : "text-gray-400"
    }`;
  };

  return (
    <div className="flex">
      <button
        className={generateTabStyle(activeTab === "menu")}
        onClick={() => handleTabChange("menu")}
      >
        Menu
      </button>
      <button
        className={generateTabStyle(activeTab === "orders")}
        onClick={() => handleTabChange("orders")}
      >
        Orders
      </button>
    </div>
  );
}
