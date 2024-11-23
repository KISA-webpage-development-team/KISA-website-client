"use client";

import React from "react";
import { useState, useEffect } from "react";
import PochaHeading from "@/features/pocha/components/PochaHeading";
import PochaMenuList from "@/features/pocha/components/menu/PochaMenuList";
import PochaOrderList from "@/features/pocha/components/order/PochaOrderList";
import PochaTabs from "@/features/pocha/components/PochaTabs";
import { sejongHospitalLight } from "@/utils/fonts/textFonts";
import PochaMenuDetail from "@/features/pocha/components/menu/PochaMenuDetail";
import { LoadingSpinner } from "@/final_refactor_src/components/feedback";

// types
import { MenuItem, PochaTab, PochaInfo } from "@/types/pocha";
import { useSearchParams } from "next/navigation";
import usePocha from "@/features/pocha/hooks/usePocha";

export default function PochaPage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<PochaTab>(
    (searchParams.get("tab") as PochaTab) || "menu"
  );

  const { pochaInfo, status } = usePocha();

  // state for selected menu to open detail page
  const [selectedMenu, setSelectedMenu] = useState<MenuItem>(undefined);

  // page.tsx는 CSR이기에 PochaHeading도 CSR --> async/await 못함
  // getPochaInfoMock만 부분적으로 async (await하려면 async)
  // const fetchPochaInfo = async () => {
  //   const pochaInfo = await getPochaInfoMock(new Date());
  //   console.log("pochaInfo", pochaInfo);
  // };

  // const pochaInfo = await getPochaInfo(new Date()); // When real api is completed, change to this line

  if (status === "loading") {
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
        <PochaOrderList pochaID={pochaInfo.pochaID} />
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
