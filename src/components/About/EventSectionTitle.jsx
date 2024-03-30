import React from "react";
import { sejongHospitalBold } from "../../utils/fonts/textFonts";

export default function EventSectionTitle({ title }) {
  return (
    <h
      className={`${sejongHospitalBold.className} text-xl md:text-2xl lg:text-3xl `}
    >
      {title}
    </h>
  );
}
