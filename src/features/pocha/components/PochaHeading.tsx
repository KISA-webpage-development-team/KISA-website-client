import React from "react";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import { PochaInfo } from "@/types/pocha";

interface PochaHeadingProps {
  pochaInfo: PochaInfo;
}

export default function PochaHeading({ pochaInfo }: PochaHeadingProps) {
  return (
    <div className="flex flex-col items-center px-4">
      {/* Title - pocha name */}
      <h1 className={`${sejongHospitalBold.className} text-xl`}>
        {pochaInfo?.title}
      </h1>

      {/* Description - pocha description */}
      <p className="text-center">{pochaInfo?.description}</p>
    </div>
  );
}
