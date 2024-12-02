"use client";

import React from "react";
import { useState } from "react";
import { sejongHospitalLight } from "@/utils/fonts/textFonts";

// ui components
import PochaHeading from "@/features/pocha/components/PochaHeading";
import PochaMenuList from "@/features/pocha/components/menu/PochaMenuList";
import PochaOrderList from "@/features/pocha/components/order/PochaOrderList";
import PochaTabs from "@/features/pocha/components/PochaTabs";
import PochaMenuDetail from "@/features/pocha/components/menu/PochaMenuDetail";
import {
  LoadingSpinner,
  NotFound,
  NotLogin,
} from "@/final_refactor_src/components/feedback";

// hooks
import usePocha from "@/features/pocha/hooks/usePocha";

// types
import { MenuItem, PochaTab } from "@/types/pocha";
import { useSearchParams } from "next/navigation";
import UnexpectedError from "@/final_refactor_src/components/feedback/UnexpectedError";

export default function PochaPage() {
  // "/pocha?tab=menu" [default] or "/pocha?tab=orders"
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<PochaTab>(
    (searchParams.get("tab") as PochaTab) || "menu"
  );

  // state for selected menu to open menu detail tab
  const [selectedMenu, setSelectedMenu] = useState<MenuItem>();

  // fetch pocha information (GET /pocha/status-info/)
  const { pochaInfo, status, error } = usePocha();

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  // [TODO] need better way of Error handling
  if (status === "error") {
    if (error.statusCode === 401) {
      return <NotLogin />;
    } else if (error.statusCode === 404) {
      return <NotFound />;
    } else {
      return <UnexpectedError />;
    }
  }

  // [TODO] better UI
  // if pochaInfo === {}, then there is no scheduled pocha
  if (Object.keys(pochaInfo).length === 0) {
    return (
      <section className="flex justify-center items-center h-full">
        <p className="text-3xl font-bold">No scheduled pocha</p>
      </section>
    );
  }

  // [TODO] better UI
  // else if pochaInfo.ongoing === false, then show the upcoming pocha
  if (pochaInfo?.ongoing === false) {
    return (
      <section className="flex justify-center items-center h-full">
        <p className="text-3xl font-bold">Upcoming pocha</p>
        <PochaHeading pochaInfo={pochaInfo} />
      </section>
    );
  }

  if (selectedMenu !== undefined) {
    return (
      <section className="overflow-y-auto h-full">
        <PochaMenuDetail
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          pochaid={pochaInfo?.pochaID}
        />
      </section>
    );
  }

  return (
    <section
      className={`${sejongHospitalLight.className} w-screen -translate-x-4 `}
    >
      {/* pocha title & description */}
      <PochaHeading pochaInfo={pochaInfo} />
      {/* menu and orders tabs */}
      <PochaTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchParams={searchParams}
      />
      {/* Listing the menus OR orders */}
      {activeTab === "menu" ? (
        <PochaMenuList
          setSelectedMenu={setSelectedMenu}
          pochaid={pochaInfo?.pochaID}
        />
      ) : (
        <PochaOrderList pochaID={pochaInfo?.pochaID} />
      )}
    </section>
  );
}
