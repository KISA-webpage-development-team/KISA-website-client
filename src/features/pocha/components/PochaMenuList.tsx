import React from "react";
import { useEffect, useState } from "react";
import { getPochaMenu, getPochaMenuMock } from "@/apis/pocha/queries";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";

export default function PochaMenuList() {
  const [pochaMenus, setPochaMenus] = useState(undefined);

  useEffect(() => {
    const fetchPochaMenu = async () => {
      // try API call first
      try {
        const res = await getPochaMenuMock(1);
        setPochaMenus(res);
        // If not
      } catch (error) {
        console.error("Error fetching like status: ", error);
      }
    };
    fetchPochaMenu();
  }, []);

  // () => {
  //   return
  // }

  // () => ()

  return (
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
              <li className="flex flex-col" key={`menu-${menu.menuid}`}>
                <span className={`${sejongHospitalBold.className}`}>
                  {menu.nameKor}
                </span>
                <span>{menu.nameEng}</span>
                <span>{menu.price}</span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
