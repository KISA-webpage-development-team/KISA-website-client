import Image from "next/image";
import React from "react";
import { sejongHospitalBold } from "../../utils/fonts/textFonts";

export default function UserBasicInfoLeft({ profile, fullname, major }) {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Image */}
      <div
        className="relative flex justify-center 
      aspect-square w-24"
      >
        <Image
          className="rounded-full object-contain"
          src={profile}
          alt="profile image"
          fill
        />
      </div>

      {/* fullname + major */}
      <div className="flex flex-col items-center gap-1">
        <h1 className={`${sejongHospitalBold.className} text-3xl`}>
          {fullname}
        </h1>
        <h2 className="text-xl">{major}</h2>
      </div>
    </div>
  );
}
