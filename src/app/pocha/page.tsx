"use client";

import React from "react";
import { useState } from "react";
import PochaHeading from "@/features/pocha/components/PochaHeading";
import PochaCartButton from "@/features/pocha/components/PochaCartButton";
import PochaHelpButton from "@/features/pocha/components/PochaHelpButton";
import PochaMenuDetails from "@/features/pocha/components/PochaMenuDetails";
import PochaMenuList from "@/features/pocha/components/PochaMenuList";
import PochaOrders from "@/features/pocha/components/PochaOrders";
import PochaTabs from "@/features/pocha/components/PochaTabs";

export default function PochaPage() {
  const [activeTab, setActiveTab] = useState<"menu" | "orders">("menu");

  return (
    <div>
      {/* pocha title & description */}
      <PochaHeading />
      {/* menu and order history tabs */}
      <PochaTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* Listing the menus OR orders */}
      {activeTab === "menu" ? <PochaMenuList /> : <PochaOrders />}
      {/* helper button */}
      <PochaHelpButton />
      {/* Selected menu details */}
      <PochaMenuDetails />
      {/* Button for viewing cart */}
      <PochaCartButton />
    </div>
  );
}
