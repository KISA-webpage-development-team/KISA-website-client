// 이걸 entity로 옮겨야할 것 같긴함.

// [ui]
// - user profile image
// - name
// - major

import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import Image from "next/image";
import React from "react";

type UserProfileInfoProps = {
  fullname: string;
  major: string;
  hasProfile: boolean;
  profile?: string;
};

export function UserProfileInfo({
  fullname,
  major,
  hasProfile,
  profile,
}: UserProfileInfoProps) {
  return (
    <div
      className="flex flex-row md:flex-col 
      justify-center items-center 
    gap-2 md:gap-4"
      aria-label="User Profile Information"
    >
      {/* Profile Image */}
      {hasProfile && (
        <figure
          className="relative flex justify-center
          aspect-square w-16 md:w-20"
        >
          {/* [NOTE] 프로필 이미지는 LCP로 걸린다. priority를 붙여주자 */}
          <Image
            priority
            className="rounded-full object-contain"
            src={profile}
            alt="profile image"
            fill
            sizes="100%"
          />
        </figure>
      )}

      {/* fullname + major */}
      <div
        className="flex flex-col items-center
       gap-0"
      >
        {/* [NOTE] user의 이름이 페이지의 가장 주된 텍스트 (헤딩)이라고 취급 */}
        <h1 className={`${sejongHospitalBold.className} text-xl md:text-2xl`}>
          {fullname}
        </h1>
        <span className="text-sm md:text-lg">{major}</span>
      </div>
    </div>
  );
}
