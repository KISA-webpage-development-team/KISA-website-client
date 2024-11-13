"use client";

import React from "react";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";

// types
import { PochaTab } from "@/types/pocha";

type PochaTabsProps = { activeTab: PochaTab; setActiveTab: (PochaTab) => void };

export default function PochaTabs({ activeTab, setActiveTab }: PochaTabsProps) {
  const handleTabChange = (selectedTab: PochaTab) => {
    setActiveTab(selectedTab);

    // console.log("Tab changed to: ", selectedTab);
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
