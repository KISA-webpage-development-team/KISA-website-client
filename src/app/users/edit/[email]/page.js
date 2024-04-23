"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { sejongHospitalLight } from "../../../../utils/fonts/textFonts";
import UserEditClient from "../../../../components/Users/UserEditClient";

export default function UserEditPage({ params }) {
  const { data: session, status } = useSession();
  const { email } = params;
  const decodedEmail = decodeURIComponent(email);

  // loading for session
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // page view validity check
  if (session?.user.email !== decodedEmail) {
    return <div>권한이 없습니다</div>;
  }

  return (
    <div className={`container ${sejongHospitalLight.className}`}>
      <UserEditClient email={email} profile={session?.user.image} />
    </div>
  );
}
