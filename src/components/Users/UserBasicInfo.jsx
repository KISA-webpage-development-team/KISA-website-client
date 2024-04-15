"use client";

import React from "react";
import { useSession } from "next-auth/react";
// sub-ui components
import UserBasicInfoLeft from "./UserBasicInfoLeft";
import UserBaiscInfoRight from "./UserBasicInfoRight";

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
  const {
    email,
    fullname,
    bornDate,
    bornMonth,
    bornYear,
    gradYear,
    major,
    linkedin,
  } = user;

  // this will decide whether to show edit buttons
  const { data: session, status } = useSession();

  if (status === "loading") {
    // TODO: need to change this to a proper loading ui
    return <div>Loading...</div>;
  }

  return (
    <div className="flex gap-24 justify-center">
      {/* Left: profile image + name + major */}
      {/* TODO: profile 이미지가 구글 로그인 이미지이기 때문에 로그인한 유저만 된다... */}
      <UserBasicInfoLeft
        profile={session?.user.image}
        fullname={fullname}
        major={major}
      />

      {/* Right: email, gradYear, borndate, linkedin*/}
      <UserBaiscInfoRight
        email={email}
        gradYear={gradYear}
        bornDate={bornDate}
        bornMonth={bornMonth}
        bornYear={bornYear}
        linkedin={linkedin}
      />
    </div>
  );
}
