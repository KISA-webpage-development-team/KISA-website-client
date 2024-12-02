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
import PochaCartIcon from "@/final_refactor_src/components/icon/PochaCartIcon";

export default function PochaMenuList({ setSelectedMenu, pochaid }) {
  const { data: session, status } = useSession() as {
    data: UserSession | null;
    status: string;
  };

  const { menuList, status: menuStatus } = useMenu(pochaid, session?.token);

  const handleMenuItemClick = (selectedMenu) => {
    setSelectedMenu(selectedMenu);
  };

  const handleCartClick = () => {
    const queryParams = `pochaid=${pochaid}`;
    window.location.href = `/pocha/cart?${queryParams}`;
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
    <div className="flex flex-col items-center py-4 px-8 w-full">
      <ul className="flex flex-col gap-7 w-full">
        {menuList?.map(({ category, menusList }, idx) => (
          <li key={`${category}-${idx}`}>
            {/* Category Title */}
            <span
              className={`${sejongHospitalBold.className} text-2xl text-michigan-blue
              font-bold border-b-3 border-gray-400 pb-1`}
            >
              {category}
            </span>
            {/* List of specific menu items (photo, name, price) */}
            <ul className="flex flex-col mt-3 divide-y-2 divide-gray-200">
              {menusList?.map((menu) => (
                <li
                  className="flex items-center gap-4 py-3"
                  key={`menu-${menu?.menuID}`}
                  onClick={() => handleMenuItemClick(menu)}
                >
                  {/* [NOTE] added figure tag for semantic html */}
                  <figure className="relative h-24 aspect-square items-center flex-shrink-0">
                    <Image
                      src={getImagePath(menu?.menuID)}
                      alt={menu?.nameEng}
                      fill
                      sizes="(max-width: 768px) 20vw"
                      className="rounded-full border-gray-300 shadow-md"
                    />
                  </figure>

                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-1">
                      <span
                        className={`${sejongHospitalBold.className} text-lg text-michigan-blue`}
                      >
                        {menu?.nameKor}
                      </span>
                      <span
                        className={`${sejongHospitalBold.className} text-sm text-michigan-blue`}
                      >
                        {`(${menu?.nameEng})`}
                      </span>
                    </div>
                    <span
                      className={`font-semibold text mt-1 text-black`}
                    >{`$${menu?.price}`}</span>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {/* <OpenCartButton pochaid={pochaid} /> */}
      <div className="fixed bottom-0 left-0 w-full flex justify-center pb-4 pt-8">
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
    </div>
  );
}
