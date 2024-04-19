"use client";

import React from "react";
import { useSession } from "next-auth/react";
// sub-ui components
import UserBasicInfoLeft from "./UserBasicInfoLeft";
import UserBaiscInfoRight from "./UserBasicInfoRight";
import { adminEmail } from "../../config/admin";

// SAMPLE
// {
//   bornDate: 26,
//   bornMonth: 9,
//   bornYear: 2004,
//   created: 'Thu, 11 Apr 2024 00:50:14 GMT',
//   email: 'jiohin@umich.edu',
//   fullname: '인지오',
//   gradYear: "Winter 2026",
//   linkedin: "https://www.linkedin.com/in/jioh-in-4228b2222/"
//   major: "Computer Science",
// }

export default function UserBasicInfo({ user }) {
  const { email, fullname, gradYear, major, linkedin } = user;

  // this will decide whether to show edit buttons
  const { data: session, status } = useSession();

  if (status === "loading") {
    // TODO: need to change this to a proper loading ui
    return <div>Loading...</div>;
  }

  // umich kisa validity check
  if (session?.user.email !== adminEmail && email === adminEmail) {
    return <div>권한이 없습니다</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-12 lg:gap-16 justify-center">
      {/* Left: profile image + name + major */}
      {/* TODO: profile 이미지가 구글 로그인 이미지이기 때문에 로그인한 유저만 된다... */}
      <UserBasicInfoLeft
        hasProfile={session?.user.email === email}
        profile={session?.user.image}
        fullname={fullname}
        major={major}
      />

      {/* Right: email, gradYear, borndate, linkedin*/}
      <UserBaiscInfoRight
        email={email}
        gradYear={gradYear}
        linkedin={linkedin}
        canEdit={session?.user.email === email}
      />
    </div>
  );
}
