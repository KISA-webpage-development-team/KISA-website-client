import { sejongHospitalBold } from "@/final_refactor_src/utils/fonts/fonts";
import Image from "next/image";
import React, { memo } from "react";

type fixedField = {
  icon: JSX.Element;
  text: string;
};

type UserEditFixedProps = {
  fullname: string;
  profile: string;
  fixedFields: fixedField[];
};

const UserEditFixed = ({
  fullname,
  profile,
  fixedFields,
}: UserEditFixedProps) => {
  return (
    <div
      className={`flex flex-col items-center 
    gap-2 md:gap-4`}
    >
      {/* Image */}
      {profile && (
        <figure
          className="relative flex justify-center 
    aspect-square w-16 md:w-20"
        >
          <Image
            className="rounded-full object-contain"
            src={profile}
            alt="profile image"
            fill
          />
        </figure>
      )}

      {/* fullname + major */}
      <div className="flex flex-col items-center">
        {/* [NOTE] User's name is treated as the main text (heading) of the page */}
        <h1 className={`${sejongHospitalBold.className} text-xl md:text-2xl`}>
          {fullname}
        </h1>
        {fixedFields.map(({ icon, text }, idx) => (
          <div key={`${text}-${idx}`} className="flex flex-row gap-2">
            {icon}
            <span className="text-sm md:text-base">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// memo() is applied to prevent re-rendering of the fixed fields
export default memo(UserEditFixed);
