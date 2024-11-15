import React from "react";
import { useEffect, useState } from "react";
import { getPochaMenu, getPochaMenuMock } from "@/apis/pocha/queries";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import { select } from "@nextui-org/react";
import PochaMenuDetail from "./PochaMenuDetail";

// Types
import { MenuByCategory, MenuItem, CartItem } from "@/types/pocha";

export default function PochaMenuList({ setSelectedMenu }) {
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
        const res = await getPochaMenuMock(1);
        setPochaMenus(res);
        // If not
      } catch (error) {
        console.error("Error fetching like status: ", error);
      }
    };
    fetchPochaMenu();
  }, []);

  const handleMenuClick = (selectedMenu) => {
    //console.log(selectedMenu);
    setSelectedMenu(selectedMenu);
    setOnDetailPage(true);
  };

  // const addToCart = (menu: MenuItem, quantity: number, totalPrice: number) => {
  //   // Gets value from added, saves to the cart.
  //   const toAdd = { menu, quantity, totalPrice };
  //   setCart([toAdd]);
  // };

  // hash map
  // [menu id: 29] -> value

  return (
    <div
      className="h-full"
      style={
        {
          // backgroundColor: "pink",
        }
      }
    >
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
                  key={`menu-${menu.menuid}`}
                  onClick={() => handleMenuClick(menu)}
                >
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
      {/* TODO: Need to use the cart array to get all PRICES ONLY of added foods. */}
      <span className="flex justify-center mt-4 bg-blue-500 text-white px-4 py-2 font-semibold">
        Total Price: $150; 여기 Total은 임의 설정 값임. 코멘트 참고 바람.
      </span>
    </div>
  );
}
