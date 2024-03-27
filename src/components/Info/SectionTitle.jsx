import React from "react";
import { sejongHospitalBold } from "../../utils/fonts/textFonts";
import Link from "next/link";

export default function SectionTitle({ infoType, sectionName, sectionText }) {
  const sectionLink = `/info/${infoType}/detail/${sectionName}`;

  return (
    <Link href={sectionLink} className="text-center">
      <span
        className={`${sejongHospitalBold.className} text-xl md:text-2xl lg:text-3xl text-black hover:text-gray-600`}
      >
        {sectionText}
      </span>
    </Link>
  );
}
