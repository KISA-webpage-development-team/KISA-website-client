import React from "react";
import { sejongHospitalLight } from "../../utils/fonts/textFonts";

export default function DetailDescription({ desc }) {
  return (
    <div
      className={`${sejongHospitalLight.className} text-sm sm:text-base md:text-lg lg:text-xl 
    flex flex-col items-center text-center max-w-4xl`}
    >
      {desc}
    </div>
  );
}
