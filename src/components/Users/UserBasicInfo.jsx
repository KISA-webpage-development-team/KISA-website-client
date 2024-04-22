"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
// sub-ui components
import UserBasicInfoLeft from "./UserBasicInfoLeft";
import UserBaiscInfoRight from "./UserBasicInfoRight";
import { adminEmail } from "../../config/admin";
import { getUserInfo } from "../../service/user";
import NotLoginModal from "../shared/NotLoginModal";

export default function UserBasicInfo({ email }) {
  const [user, setUser] = useState(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserInfo(email, session?.token);
      if (res) {
        setUser(res);
        return;
      } else {
        // error handling
        console.log("user fetch failed");
      }
    };
    
    fetchUser();
  }, [email, session]);

  // this will decide whether to show edit buttons

  if (status === "unauthenticated") {
    return <NotLoginModal />;
  }

  if (status === "loading" || !user) {
    // TODO: need to change this to a proper loading ui
    return <div>Loading...</div>;
  }

  // umich kisa validity check
  if (email === adminEmail && session?.user.email !== adminEmail) {
    return <div>권한이 없습니다</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-12 lg:gap-16 justify-center">
      {/* Left: profile image + name + major */}
      {/* TODO: profile 이미지가 구글 로그인 이미지이기 때문에 로그인한 유저만 된다... */}
      <UserBasicInfoLeft
        hasProfile={session?.user.email === email}
        profile={session?.user.image}
        fullname={user?.fullname}
        major={user?.major}
      />

      {/* Right: email, gradYear, borndate, linkedin*/}
      <UserBaiscInfoRight
        email={email}
        gradYear={user?.gradYear}
        linkedin={user?.linkedin}
        canEdit={session?.user.email === email}
      />
    </div>
  );
}
