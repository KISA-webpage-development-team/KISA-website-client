import React from "react";
import { useEffect, useState } from "react";
import { getPochaMenu, getPochaMenuMock } from "@/apis/pocha/queries";

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

  return pochaMenus?.map(({ category, menusList }) => (
    <div>
      <p>{category}</p>
      {menusList?.map((menu) => (
        <div>
          <p>
            {menu.nameKor} ({menu.nameEng})
          </p>
          <p>{menu.price}</p>
        </div>
      ))}
    </div>
  ));
}
