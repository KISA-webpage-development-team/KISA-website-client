"use client";

import React from "react";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "@/utils/fonts/textFonts";
// types
import { PochaTab } from "@/types/pocha";

type PochaTabsProps = {
  activeTab: PochaTab;
  setActiveTab: (PochaTab) => void;
};

export default function PochaTabs({ activeTab, setActiveTab }: PochaTabsProps) {
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
    return `flex-1 px-4 py-1 text-center relative transition-all duration-200 ease-in-out 
    after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 text-base
    ${
      isCurTabSelected
        ? `text-michigan-blue font-semibold ${sejongHospitalBold.className} after:bg-michigan-blue`
        : `text-gray-400 ${sejongHospitalLight.className} after:bg-gray-200`
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
