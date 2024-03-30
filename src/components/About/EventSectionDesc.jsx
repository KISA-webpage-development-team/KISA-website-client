import React from "react";
import { sejongHospitalLight } from "../../utils/fonts/textFonts";

export default function EventSectionDesc({ desc }) {
  return (
    <p
      className={`${sejongHospitalLight.className}
     text-base md:text-xl lg:text-2xl`}
    >
      {desc}
    </p>
  );
}
