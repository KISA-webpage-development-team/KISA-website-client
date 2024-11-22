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

export default function PochaMenuList({ setSelectedMenu, pochaid }) {
  const { data: session, status } = useSession() as {
    data: UserSession | null;
    status: string;
  };

  const [pochaMenus, setPochaMenus] = useState<MenuByCategory[] | undefined>(
    undefined
  );

  // state for selected menu to open detail page
  // const [selectedMenu, setSelectedMenu] = useState<MenuItem | undefined>(
  //   undefined
  // );

  const [onDetailPage, setOnDetailPage] = useState(false);

  // fetch pocha menu from server
  useEffect(() => {
    const fetchPochaMenu = async () => {
      // try API call first
      try {
        const res = await getPochaMenu(pochaid, session?.token);

        setPochaMenus(res);
        // If not
      } catch (error) {
        console.error("Error fetching like status: ", error);
      }
    };

    if (session) {
      fetchPochaMenu();
    }
  }, [pochaid, session]);

  const handleMenuClick = (selectedMenu) => {
    //console.log(selectedMenu);
    setSelectedMenu(selectedMenu);
    setOnDetailPage(true);
  };

  console.log("pochaMenus", pochaMenus);

  const getImagePath = (menuID: number) => {
    // Just for the bulgogi case. Else, (menuID != 1) condition should be (menuID != null).
    return menuID != 1
      ? `/images/24_last_pocha/${menuID}.png`
      : "/images/24_last_pocha/image_not_found.png";
  };

  if (pochaMenus === undefined) {
    return <></>;
  }

  return (
    <div className="h-full w-full">
      <ul className="flex flex-col px-6 gap-8">
        {pochaMenus?.map(({ category, menusList }, idx) => (
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
                    ></Image>
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
