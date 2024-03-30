import Image from "next/image";
import React from "react";
import { sejongHospitalBold } from "../../utils/fonts/textFonts";

export default function EventSectionImage({ id, imageTitle }) {
  return (
    <div className="relative w-56 md:w-72 lg:w-96 aspect-square bg-blue-200">
      <Image
        className="object-cover"
        src={`/images/pierpont_commons.png`}
        alt={imageTitle}
        fill
      />
      <div
        className={`absolute inset-0 bg-[#2f2f2f] bg-opacity-40
      flex justify-center items-center 
      ${sejongHospitalBold.className} text-white text-xl md:text-2xl lg:text-3xl text-center `}
      >
        {imageTitle}
      </div>
    </div>
  );
}
