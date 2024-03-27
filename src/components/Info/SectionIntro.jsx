import React from "react";
import { sejongHospitalLight } from "../../utils/fonts/textFonts";

export default function SectionIntro({ sectionIntro }) {
  if (!sectionIntro) return null;

  return (
    <p
      className={`${sejongHospitalLight.className} text-center text-base md:text-lg lg:text-xl`}
    >
      {sectionIntro}
    </p>
  );
}
