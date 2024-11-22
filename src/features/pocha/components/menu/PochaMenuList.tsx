import React from "react";
import { useEffect, useState } from "react";

import Image from "next/image";
import { getPochaMenu, getPochaMenuMock } from "@/apis/pocha/queries";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import { select } from "@nextui-org/react";
import PochaMenuDetail from "./PochaMenuDetail";

// Types
import { MenuByCategory, MenuItem, CartItem } from "@/types/pocha";
import { useSession } from "next-auth/react";
import { UserSession } from "@/lib/next-auth/types";
import OpenCartButton from "./OpenCartButton";
import useMenu from "../../hooks/useMenu";

export default function PochaMenuList({ setSelectedMenu, pochaid }) {
  const { data: session, status } = useSession() as {
    data: UserSession | null;
    status: string;
  };

  const { menuList, status: menuStatus } = useMenu(pochaid, session?.token);

  const handleMenuClick = (selectedMenu) => {
    setSelectedMenu(selectedMenu);
  };

  const getImagePath = (menuID: number) => {
    // Just for the bulgogi case. Else, (menuID != 1) condition should be (menuID != null).
    return menuID != 1
      ? `/images/24_last_pocha/${menuID}.png`
      : "/images/24_last_pocha/image_not_found.png";
  };

  if (menuStatus === "loading") {
    return <></>;
  }

  return (
    <div className="h-full w-full">
      <ul className="flex flex-col px-6 gap-8">
        {menuList?.map(({ category, menusList }, idx) => (
          <li key={`${category}-${idx}`}>
            <span
              className={`${sejongHospitalBold.className} text-2xl font-bold`}
            >
              {category}
            </span>
            <ul>
              {menusList?.map((menu) => (
                <li
                  className="flex flex-col"
                  key={`menu-${menu?.menuID}`}
                  onClick={() => handleMenuClick(menu)}
                >
                  <div className="flex gap-8 mb-6 items-center">
                    <Image
                      src={getImagePath(menu?.menuID)}
                      alt={menu?.nameEng}
                      width={100}
                      height={100}
                      className="rounded-full border-4 border-gray-300 shadow-md"
                    />
                    <div className="flex flex-col gap">
                      <span className={`${sejongHospitalBold.className}`}>
                        {menu?.nameKor}
                      </span>
                      <span>{menu?.nameEng}</span>
                      <span>{`$${menu?.price}`}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <OpenCartButton pochaid={pochaid} />
    </div>
  );
}
