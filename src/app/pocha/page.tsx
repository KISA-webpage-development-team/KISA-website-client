"use client";

import React from "react";
import { useState } from "react";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "@/utils/fonts/textFonts";

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
import PochaCartIcon from "@/final_refactor_src/components/icon/PochaCartIcon";
import OnlyMobileView from "@/final_refactor_src/components/feedback/OnlyMobileView";

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

  const handleCartClick = () => {
    const queryParams = `pochaid=${pochaInfo?.pochaID}`;
    window.location.href = `/pocha/cart?${queryParams}`;
  };

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

  // [MAIN UI] --------------------------------------------------------------------------------
  // IF any menu is selected, show the menu detail
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
    <>
      <section className="hidden md:block">
        <OnlyMobileView />
      </section>
      <section
        className={`
        md:hidden
        ${sejongHospitalLight.className} relative w-screen h-[90vh] -translate-x-4 py-2 !gap-0`}
      >
        {/* pocha title & description */}
        <PochaHeading pochaInfo={pochaInfo} />
        {/* menu and orders tabs */}
        <PochaTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Listing the menus OR orders */}
        <div className="flex-1 overflow-y-auto w-full">
          {activeTab === "menu" ? (
            <PochaMenuList
              setSelectedMenu={setSelectedMenu}
              pochaid={pochaInfo?.pochaID}
            />
          ) : (
            <PochaOrderList pochaID={pochaInfo?.pochaID} />
          )}
        </div>

        {/* {activeTab === "menu" && (
          <div
            className="fixed bottom-0 left-0
         w-full flex justify-center pb-6 pt-8"
          >
            <button
              className={`
          w-[70%] flex py-3 mt-8
          rounded-lg text-white font-semibold
          bg-cyan-600/90 justify-between items-center
          ${sejongHospitalBold.className}
        `}
              onClick={handleCartClick}
            >
              <span className={`ml-10 ${sejongHospitalBold.className}`}>
                View Cart
              </span>
              <div className="mr-10">
                <PochaCartIcon />
              </div>
            </button>
          </div>
        )} */}
      </section>
    </>
  );
}
