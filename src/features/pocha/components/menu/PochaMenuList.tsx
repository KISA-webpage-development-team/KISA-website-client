import React from "react";

import Image from "next/image";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "@/utils/fonts/textFonts";

// Types
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
      <ul className="flex flex-col px-6 gap-6">
        {menuList?.map(({ category, menusList }, idx) => (
          <li key={`${category}-${idx}`}>
            <span
              className={`${sejongHospitalBold.className} text-3xl font-bold border-b-4 border-gray-500 pb-1`}
            >
              {category}
            </span>
            <ul className="flex flex-col mt-3 divide-y-2 divide-gray-200">
              {menusList?.map((menu) => (
                <li
                  className="flex items-center gap-4 py-3"
                  key={`menu-${menu?.menuID}`}
                  onClick={() => handleMenuClick(menu)}
                >
                  {/* [NOTE] added figure tag for semantic html */}
                  <figure className="relative h-24 aspect-square items-center flex-shrink-0">
                    <Image
                      src={getImagePath(menu?.menuID)}
                      alt={menu?.nameEng}
                      fill
                      sizes="(max-width: 768px) 20vw"
                      className="rounded-full border-4 border-gray-300 shadow-md"
                    />
                  </figure>

                  <div className="flex flex-col justify-center">
                    <div>
                      <span
                        className={`${sejongHospitalBold.className} text-xl`}
                      >
                        {menu?.nameKor}
                      </span>
                      <span
                        className={`${sejongHospitalLight.className} text-sm ml-1`}
                      >
                        {`(${menu?.nameEng})`}
                      </span>
                    </div>
                    <span
                      className={`${sejongHospitalLight.className} text-sm mt-1`}
                    >{`$${menu?.price}`}</span>
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
