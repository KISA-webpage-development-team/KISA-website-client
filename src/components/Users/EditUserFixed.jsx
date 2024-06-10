import Image from "next/image";
import React from "react";
import { sejongHospitalBold } from "../../utils/fonts/textFonts";
import EmailIcon from "../ui/EmailIcon";

// user profile image + name + email

export default function EditUserFixed({ profile, fullname, email }) {
  return (
    <div className="flex flex-col items-center gap-2 md:gap-4">
      {/* Image */}
      {profile && (
        <div
          className="relative flex justify-center 
    aspect-square w-16 md:w-20"
        >
          <Image
            className="rounded-full object-contain"
            src={profile}
            alt="profile image"
            fill
          />
        </div>
      )}

      {/* fullname + major */}
      <div className="flex flex-col items-center">
        <h1 className={`${sejongHospitalBold.className} text-lg md:text-2xl`}>
          {fullname}
        </h1>
        <h2 className="text-base md:text-lg flex items-center gap-2">
          <EmailIcon />
          {email}
        </h2>
      </div>
    </div>
  );
}
