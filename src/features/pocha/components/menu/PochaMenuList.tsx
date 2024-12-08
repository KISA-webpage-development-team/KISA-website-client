import React from "react";

import Image from "next/image";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "@/utils/fonts/textFonts";

// Types
import { useSession } from "next-auth/react";
import { UserSession } from "@/lib/next-auth/types";
import useMenu from "../../hooks/useMenu";
import PochaCartIcon from "@/final_refactor_src/components/icon/PochaCartIcon";
import useUserAge from "../../hooks/useUserAge";

export default function PochaMenuList({ setSelectedMenu, pochaid }) {
  const { data: session, status: sessionStatus } = useSession() as {
    data: UserSession | null;
    status: string;
  };

  const { menuList, status: menuStatus } = useMenu(pochaid, session?.token);
  const { underAge, status: userStatus } = useUserAge(session);

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
      ? `/pocha/24_last_pocha/${menuID}.png`
      : "/pocha/24_last_pocha/image_not_found.png";
  };

  if (
    sessionStatus === "loading" ||
    menuStatus === "loading" ||
    userStatus === "loading"
  ) {
    return <></>;
  }

  return (
    <div className="relative flex flex-col items-center py-6 px-8 w-full">
      <ul className="flex flex-col gap-7 w-full mb-16">
        {menuList?.map(({ category, menusList }, categoryIdx) => (
          <li key={`${category}-${categoryIdx}`}>
            {/* Category Title */}
            <span
              className={`${sejongHospitalBold.className} text-2xl text-michigan-blue
              font-bold border-b-3 border-gray-400 pb-1`}
            >
              {category}
            </span>
            {/* List of specific menu items (photo, name, price) */}
            <ul className="flex flex-col mt-3 divide-y-2 divide-gray-200">
              {menusList?.map((menu) => {
                const { menuID, nameEng, nameKor, price, ageCheckRequired } =
                  menu;
                const notForUnderAge = ageCheckRequired && underAge;

                return (
                  <li key={`menu-${menuID}`} className="relative self-stretch">
                    {notForUnderAge ? (
                      <div
                        className="absolute z-50 rounded-lg
                       bg-slate-500/50 w-full h-full flex justify-center items-center"
                      >
                        <span
                          className={`text-lg text-red-600 ${sejongHospitalBold.className}`}
                        >
                          Only for 21+
                        </span>
                      </div>
                    ) : (
                      <></>
                    )}

                    <button
                      className="self-stretch flex items-center gap-4 py-3"
                      onClick={() => handleMenuItemClick(menu)}
                      disabled={notForUnderAge}
                    >
                      {/* [NOTE] added figure tag for semantic html */}
                      <figure className="relative h-24 aspect-square items-center flex-shrink-0">
                        <Image
                          src={getImagePath(menuID)}
                          alt={nameEng}
                          priority={categoryIdx === 0}
                          fill
                          sizes="(max-width: 768px) 20vw"
                          className="rounded-full border-gray-300 shadow-md"
                        />
                      </figure>

                      <div className="flex flex-col justify-center items-start">
                        <div className="flex items-center gap-1">
                          <span
                            className={`${sejongHospitalBold.className} text-lg text-michigan-blue`}
                          >
                            {nameKor}
                          </span>
                          <span
                            className={`${sejongHospitalBold.className} text-sm text-michigan-blue`}
                          >
                            {`(${nameEng})`}
                          </span>
                        </div>
                        <span
                          className={`font-semibold text mt-1 text-black`}
                        >{`$${price}`}</span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
      {/* <OpenCartButton pochaid={pochaid} /> */}
      {/* <div className="fixed left-0 w-full flex justify-center pb-4 pt-8">
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
      </div> */}
    </div>
  );
}
