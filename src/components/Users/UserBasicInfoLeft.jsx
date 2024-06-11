import Image from "next/image";
import React from "react";
import { sejongHospitalBold } from "../../utils/fonts/textFonts";

export default function UserBasicInfoLeft({
  hasProfile,
  profile,
  fullname,
  major,
}) {
  return (
    <div
      className="flex flex-row md:flex-col 
      justify-center items-center 
    gap-2 md:gap-4"
    >
      {/* Image */}
      {hasProfile && (
        <div
          className="relative flex justify-center 
      aspect-square w-16 md:w-20"
        >
          <Image
            priority
            className="rounded-full object-contain"
            src={profile}
            alt="profile image"
            fill
          />
        </div>
      )}

      {/* fullname + major */}
      <div
        className="flex flex-col items-center
       gap-0"
      >
        <h1 className={`${sejongHospitalBold.className} text-xl md:text-2xl`}>
          {fullname}
        </h1>
        <h2 className="text-sm md:text-lg">{major}</h2>
      </div>
    </div>
  );
}
