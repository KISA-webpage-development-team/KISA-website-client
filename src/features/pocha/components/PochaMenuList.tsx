import React from "react";
import { useEffect, useState } from "react";
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

  // const addToCart = (menu: MenuItem, quantity: number, totalPrice: number) => {
  //   // Gets value from added, saves to the cart.
  //   const toAdd = { menu, quantity, totalPrice };
  //   setCart([toAdd]);
  // };

  // hash map
  // [menu id: 29] -> value

  if (pochaMenus === undefined) {
    return <></>;
  }

  return (
    <div
      className="h-full w-full"
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
                  key={`menu-${menu?.menuID}`}
                  onClick={() => handleMenuClick(menu)}
                >
                  <span className={`${sejongHospitalBold.className}`}>
                    {menu?.nameKor}
                  </span>
                  <span>{menu?.nameEng}</span>
                  <span>{menu?.price}</span>
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
