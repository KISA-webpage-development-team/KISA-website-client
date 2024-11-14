"use client";

import React from "react";
import { useState, useEffect } from "react";
import PochaHeading from "@/features/pocha/components/PochaHeading";
import PochaCartButton from "@/features/pocha/components/PochaCartButton";
import PochaHelpButton from "@/features/pocha/components/PochaHelpButton";
import PochaMenuDetails from "@/features/pocha/components/PochaMenuDetails";
import PochaMenuList from "@/features/pocha/components/PochaMenuList";
import PochaOrders from "@/features/pocha/components/PochaOrders";
import PochaTabs from "@/features/pocha/components/PochaTabs";

// types
import { PochaTab } from "@/types/pocha";
import { sejongHospitalLight } from "@/utils/fonts/textFonts";

export default function PochaPage() {
  const [activeTab, setActiveTab] = useState<PochaTab>("menu");

  return (
    <section
      className={`${sejongHospitalLight.className} w-screen -translate-x-4`}
    >
      {/* pocha title & description */}
      <PochaHeading />
      {/* menu and order history tabs */}
      <PochaTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* Listing the menus OR orders */}
      {activeTab === "menu" ? <PochaMenuList /> : <PochaOrders />}
      {/* [LATER] helper button */}
      <PochaHelpButton />
      {/* Selected menu details */}
      {/* <PochaMenuDetails menu={Menu} /> */}
      {/* Button for viewing cart */}
      <PochaCartButton />
    </section>
  );
}
