"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { sejongHospitalLight } from "../../../../utils/fonts/textFonts";
import UserEditClient from "../../../../components/Users/UserEditClient";

export default function UserEditPage({ params }) {
  const { data: session, status } = useSession();
  const { emailid } = params;

  // loading for session
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // page view validity check
  if (session?.user.email.split("@")[0] !== emailid) {
    return <div>권한이 없습니다</div>;
  }

  return (
    <div className={`container ${sejongHospitalLight.className}`}>
      <UserEditClient emailid={emailid} profile={session?.user.image} />
    </div>
  );
}
