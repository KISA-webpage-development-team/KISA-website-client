"use client";

import { changeStock } from "@/apis/pocha/mutations";
import OrderHistoryTable from "@/features/pocha/components/dashboard/OrderHistoryTable";
import OrdersTable from "@/features/pocha/components/dashboard/OrdersTable";
import useMenu from "@/features/pocha/hooks/useMenu";
import useOrders from "@/features/pocha/hooks/useOrders";
import usePocha from "@/features/pocha/hooks/usePocha";
import {
  LoadingSpinner,
  NotAuthorized,
} from "@/final_refactor_src/components/feedback";
import useAdmin from "@/lib/next-auth/useAdmin";
import { MenuItem, Orders } from "@/types/pocha";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import { Tab, Tabs } from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
// [TODO] put this page into auth middleware (no need to handle missing session)

export default function DashboardPage() {
  // fetch necessary information for the dashboard
  // each hook fetches with GET request
  const { isAdmin, email, token, status: adminStatus } = useAdmin();
  const { pochaInfo, status: pochaStatus } = usePocha();
  const { menuList, status: menuStatus } = useMenu(pochaInfo?.pochaID, token);

  const [stockTestVal, setStockTestVal] = useState<number>(0);

  const getImagePath = (menuID: number) => {
    // Just for the bulgogi case. Else, (menuID != 1) condition should be (menuID != null).
    return menuID != 1
      ? `/pocha/24_last_pocha/${menuID}.png`
      : "/pocha/24_last_pocha/image_not_found.png";
  };

  const handleChangeStock = async (menu: MenuItem) => {
    const body = {
      menuID: menu.menuID,
      quantity: stockTestVal as number,
    };

    const res = await changeStock(body);

    if (res) {
      console.log("Stock changed successfully");
    } else {
      console.error("Stock change failed");
    }
  };

  if (
    adminStatus === "loading" ||
    pochaStatus === "loading" ||
    menuStatus === "loading"
  ) {
    return <LoadingSpinner />;
  }
  // only admin can view this page
  if (!isAdmin) {
    return <NotAuthorized />;
  }

  // need to think about how to display orders on dashboard

  return (
    <section>
      <Tabs aria-label="Options">
        <Tab key="orders" title="Orders">
          <OrdersTable
            email={email}
            token={token}
            pochaID={pochaInfo?.pochaID}
          />
        </Tab>
        <Tab key="stock" title="Stock">
          Under construction
        </Tab>
        <Tab key="history" title="History">
          <OrderHistoryTable token={token} pochaID={pochaInfo?.pochaID} />
        </Tab>
      </Tabs>
    </section>
  );
}

// {/* <ul className="flex flex-col gap-7 w-full mb-16">
// {menuList?.map(({ category, menusList }, categoryIdx) => (
//   <li key={`${category}-${categoryIdx}`}>
//     {/* Category Title */}
//     <span
//       className={`${sejongHospitalBold.className} text-2xl text-michigan-blue
//   font-bold border-b-3 border-gray-400 pb-1`}
//     >
//       {category}
//     </span>
//     {/* List of specific menu items (photo, name, price) */}
//     <ul className="flex flex-col mt-3 divide-y-2 divide-gray-200">
//       {menusList?.map((menu) => {
//         const {
//           menuID,
//           nameEng,
//           nameKor,
//           price,
//           stock,
//           ageCheckRequired,
//         } = menu;

//         return (
//           <li
//             key={`menu-${menuID}`}
//             className="relative self-stretch"
//           >
//             <div className="self-stretch flex items-center gap-4 py-3">
//               {/* [NOTE] added figure tag for semantic html */}
//               <figure className="relative h-24 aspect-square items-center flex-shrink-0">
//                 <Image
//                   src={getImagePath(menuID)}
//                   alt={nameEng}
//                   priority={categoryIdx === 0}
//                   fill
//                   sizes="(max-width: 768px) 20vw"
//                   className="rounded-full border-gray-300 shadow-md"
//                 />
//               </figure>

//               <div className="flex flex-col justify-center items-start">
//                 <div className="flex items-center gap-1">
//                   <span
//                     className={`${sejongHospitalBold.className} text-lg text-michigan-blue`}
//                   >
//                     {nameKor}
//                   </span>
//                   <span
//                     className={`${sejongHospitalBold.className} text-sm text-michigan-blue`}
//                   >
//                     {`(${nameEng})`}
//                   </span>
//                 </div>
//                 <span
//                   className={`font-semibold text mt-1 text-black`}
//                 >{`$${price}`}</span>
//               </div>

//               {/* Stock Tester */}
//               <span className="font-bold">{stock}</span>
//               <input
//                 className="border-2 border-gray-300 p-2"
//                 type="number"
//                 value={stockTestVal}
//                 onChange={(e) =>
//                   setStockTestVal(parseInt(e.target.value))
//                 }
//               />
//               <button
//                 onClick={() => handleChangeStock(menu)}
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//               >
//                 Press Me to Change Stock
//               </button>
//             </div>
//           </li>
//         );
//       })}
//     </ul>
//   </li>
// ))}
// </ul> */}
