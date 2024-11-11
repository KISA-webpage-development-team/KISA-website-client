"use client";

import React from "react";
import { useState } from "react";

export default function PochaTabs({ activeTab, setActiveTab }) {
  const handleTabChange = (selectedTab: "menu" | "orders") => {
    setActiveTab(selectedTab);

    // console.log("Tab changed to: ", selectedTab);
  };
  return (
    <div>
      <button onClick={() => handleTabChange("menu")}>Menu</button>
      <button onClick={() => handleTabChange("orders")}>Orders</button>
    </div>
  );
}
