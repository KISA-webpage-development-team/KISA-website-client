import Image from "next/image";
import React from "react";
import { sejongHospitalBold } from "../../utils/fonts/textFonts";

export default function EventSectionImage({ id, imageTitle }) {
  return (
    <div className="relative w-56 md:w-64 lg:w-72 aspect-square ">
      <Image
        className="object-cover"
        src={`/events/${id}.png`}
        alt={imageTitle}
        fill
      />
      <div
        className={`absolute inset-0 bg-[#2f2f2f] bg-opacity-40
      flex justify-center items-center 
      ${sejongHospitalBold.className} text-white text-lg md:text-xl lg:text-2xl text-center `}
      >
        {imageTitle}
      </div>
    </div>
  );
}
