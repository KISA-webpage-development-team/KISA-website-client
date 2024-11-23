"use client";

import React from "react";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "@/utils/fonts/textFonts";
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
    return `flex-1 px-4 py-2 text-center relative transition-all duration-200 ease-in-out ${
      // [NOTE]: 이렇게 했었는데 border-b-2에 ㅈ버그 생겨서 일단은 manually함.
      // isCurTabSelected
      //   ? `text-black font-semibold ${sejongHospitalBold.className} border-b-2 border-black`
      //   : `text-gray-400 ${sejongHospitalLight.className}`

      isCurTabSelected
        ? `text-black font-semibold ${sejongHospitalBold.className} after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black text-xl`
        : `text-gray-400 ${sejongHospitalLight.className} text-xl`
    }`;
  };

  return (
    <div className="flex divide-x divide-gray-300">
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
