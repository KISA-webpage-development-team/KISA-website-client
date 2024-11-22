"use client";

import React from "react";
import { useState, useEffect } from "react";
import PochaHeading from "@/features/pocha/components/PochaHeading";
import OpenCartButton from "@/features/pocha/components/OpenCartButton";
import PochaHelpButton from "@/features/pocha/components/PochaHelpButton";
import PochaMenuDetails from "@/features/pocha/components/PochaMenuDetail";
import PochaMenuList from "@/features/pocha/components/PochaMenuList";
import PochaOrderList from "@/features/pocha/components/order/PochaOrderList";
import PochaTabs from "@/features/pocha/components/PochaTabs";
import { sejongHospitalLight } from "@/utils/fonts/textFonts";
import PochaMenuDetail from "@/features/pocha/components/PochaMenuDetail";
import { getPochaInfo, getPochaInfoMock } from "@/apis/pocha/queries";
import { LoadingSpinner } from "@/final_refactor_src/components/feedback";

// types
import { MenuItem, PochaTab, PochaInfo } from "@/types/pocha";
import { useSearchParams } from "next/navigation";

export default function PochaPage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<PochaTab>(
    (searchParams.get("tab") as PochaTab) || "menu"
  );

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
        const res = await getPochaInfo(new Date());
        setPochaInfo(res);
      } catch (error) {
        console.error("Error fetching like status: ", error);
      }
    };
    // call fetchPochaInfo function
    fetchPochaInfo();
  }, []);

  if (pochaInfo === undefined) {
    return <LoadingSpinner />;
  }

  if (selectedMenu !== undefined) {
    return (
      <PochaMenuDetail
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        pochaid={pochaInfo?.pochaID}
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
      <PochaTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchParams={searchParams}
      />
      {/* Listing the menus OR orders */}
      {activeTab === "menu" ? (
        <>
          <PochaMenuList
            setSelectedMenu={setSelectedMenu}
            pochaid={pochaInfo?.pochaID}
          />
        </>
      ) : (
        <PochaOrderList />
      )}
      {/* [LATER] helper button */}
      {/* <PochaHelpButton /> */}
      {/* Selected menu details */}
      {/* <PochaMenuDetails menu={Menu} /> */}
      {/* Button for viewing cart */}
      {/* TODO: Need to use the cart array to get all PRICES ONLY of added foods. */}
    </section>
  );
}
