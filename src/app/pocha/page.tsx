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
import PochaCartPage from "@/features/pocha/components/cart/PochaCartPage";
import { sejongHospitalLight } from "@/utils/fonts/textFonts";
import PochaMenuDetail from "@/features/pocha/components/PochaMenuDetail";

// types
import { MenuItem, PochaTab, CartItem, PochaInfo } from "@/types/pocha";
import { getPochaInfoMock } from "@/apis/pocha/queries";

export default function PochaPage() {
  const fakeEmail = "dongsubk@umich.edu";
  const [activeTab, setActiveTab] = useState<PochaTab>("menu");

  // state for selected menu to open detail page
  const [selectedMenu, setSelectedMenu] = useState<MenuItem>(undefined);

  // page.tsx는 CSR이기에 PochaHeading도 CSR --> async/await 못함
  // getPochaInfoMock만 부분적으로 async (await하려면 async)
  // const fetchPochaInfo = async () => {
  //   const pochaInfo = await getPochaInfoMock(new Date());
  //   console.log("pochaInfo", pochaInfo);
  // };

  // const pochaInfo = await getPochaInfo(new Date()); // When real api is completed, change to this line
  const [pochaInfo, setPochaInfo] = useState<PochaInfo>(undefined);

  useEffect(() => {
    // define fetchPochaInfo
    const fetchPochaInfo = async () => {
      // try API call first
      try {
        const res = await getPochaInfoMock(new Date());
        setPochaInfo(res);
        // If not
      } catch (error) {
        console.error("Error fetching like status: ", error);
      }
    };
    // call fetchPochaInfo function
    fetchPochaInfo();
  }, []);

  if (selectedMenu !== undefined) {
    return (
      <PochaMenuDetail
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        email={fakeEmail}
        pochaid={pochaInfo.pochaid}
      />
    );
  }

  return (
    <section
      className={`${sejongHospitalLight.className} relative h-full w-screen -translate-x-4 `}
    >
      {/* pocha title & description */}
      <PochaHeading pochaInfo={pochaInfo} />
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
      <OpenCartButton />
    </section>
  );
}
