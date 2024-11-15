"use client";

import React from "react";
import { useState, useEffect } from "react";
import PochaHeading from "@/features/pocha/components/PochaHeading";
import OpenCartButton from "@/features/pocha/components/OpenCartButton";
import PochaHelpButton from "@/features/pocha/components/PochaHelpButton";
import PochaMenuDetails from "@/features/pocha/components/PochaMenuDetail";
import PochaMenuList from "@/features/pocha/components/PochaMenuList";
import PochaOrders from "@/features/pocha/components/PochaOrders";
import PochaTabs from "@/features/pocha/components/PochaTabs";
import PochaCartPage from "@/features/pocha/components/PochaCartPage";
import { sejongHospitalLight } from "@/utils/fonts/textFonts";
import PochaMenuDetail from "@/features/pocha/components/PochaMenuDetail";

// types
import { MenuItem, PochaTab, CartItem } from "@/types/pocha";

export default function PochaPage() {
  const [activeTab, setActiveTab] = useState<PochaTab>("menu");
  // Key-Value Structure, receiving menuID as key, MenuItem & Quantity for that menu as value.
  const [cart, setCart] = useState<Map<number, CartItem>>(
    // Initializing as an empty map.
    new Map<number, CartItem>()
  );
  console.log("cart: ", cart);

  // state for selected menu to open detail page
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | undefined>(
    undefined
  );

  const [openCartPage, setOpenCartPage] = useState<boolean>(false);

  if (selectedMenu !== undefined) {
    return (
      <PochaMenuDetail
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        cart={cart}
        setCart={setCart}
      />
    );
  }

  if (openCartPage) {
    return <PochaCartPage cart={cart} setOpenCartPage={setOpenCartPage} />;
  }

  return (
    <section
      className={`${sejongHospitalLight.className} relative h-full w-screen -translate-x-4 `}
    >
      {/* pocha title & description */}
      <PochaHeading />
      {/* menu and order history tabs */}
      <PochaTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* Listing the menus OR orders */}
      {activeTab === "menu" ? (
        <PochaMenuList setSelectedMenu={setSelectedMenu} />
      ) : (
        <PochaOrders />
      )}
      {/* [LATER] helper button */}
      {/* <PochaHelpButton /> */}
      {/* Selected menu details */}
      {/* <PochaMenuDetails menu={Menu} /> */}
      {/* Button for viewing cart */}
      {/* TODO: Need to use the cart array to get all PRICES ONLY of added foods. */}
      <OpenCartButton setOpenCartPage={setOpenCartPage} />
    </section>
  );
}
