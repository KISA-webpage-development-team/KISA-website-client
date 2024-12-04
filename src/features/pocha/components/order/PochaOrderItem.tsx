import { OrderItem } from "@/types/pocha";
import React from "react";
import { sejongHospitalBold, sejongHospitalLight, } from "@/utils/fonts/textFonts";
import { STATUS_COLORS } from "../../utils/statusToColor";

interface PochaOrderItemProps {
  orderItem: OrderItem;
}
export default function PochaOrderItem({ orderItem }: PochaOrderItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className={`${sejongHospitalBold.className} text-4xl text-gray-400 flex-shrink-0`}
      style={{
        //flexBasis: "5%",
        width: "9%",
        height: "22px",
        justifyContent: "center",
        fontWeight: 600,
        lineHeight: "156%",
        marginTop: "-32px",
        marginLeft: "-4px",

      }}
      >{orderItem.orderItemID}</div>
      <div className="flex items-center" style={{ width: "60%", textAlign: "left" }}>
        <span className={`${sejongHospitalBold.className} text-xl text-blue-950`}>
          {orderItem.menu.nameKor}</span>
        <span className={`${sejongHospitalLight.className} text-sm text-blue-950 ml-1`}>
          ({orderItem.menu.nameEng})
        </span>
      </div>

        <div className="flex flex-col items-center justify-center" style={{width: "10%", textAlign: "center", }}>{orderItem.quantity}</div>
      
      <div
        className={`${STATUS_COLORS[orderItem.status]} 
        rounded-md py-1 px-2 text-white font-bold
      `}
      >
        {orderItem.status}
      </div>
    </div>
  );
}
