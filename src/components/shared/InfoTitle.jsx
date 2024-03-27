import React from "react";
import { sejongHospitalBold } from "../../utils/fonts/textFonts";

export default function InfoTitle({ infoType }) {
  return (
    <h className="w-full flex flex-col gap-4">
      <p
        className={`${sejongHospitalBold.className} text-3xl md:text-[34px] lg:text-[40px] text-left`}
      >
        {infoType}
      </p>
      <div className="w-full border-b-2 border-black" />
    </h>
  );
}
