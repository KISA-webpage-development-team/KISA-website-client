"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { sejongHospitalLight } from "../../../../utils/fonts/textFonts";
import UserEditClient from "../../../../components/Users/UserEditClient";
import { useUser } from "../../../../service/user";
import { CustomSession } from "../../../../model/common/types";

export default function UserEditPage({ params }) {
  const { email } = params;
  const decodedEmail = decodeURIComponent(email);

  const { data: session, status } = useSession() as {
    data: CustomSession | null;
    status: string;
  };

  const { user, isLoading, isError } = useUser(decodedEmail, session?.token);

  // loading for session
  if (status === "loading" || isLoading) {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>권한이 없습니다</div>;
  }

  // page view validity check
  if (session?.user.email !== decodedEmail) {
    return <div>권한이 없습니다</div>;
  }

  return (
    <section
      className="pt-2 md:pt-3 lg:pt-4 
  "
    >
      <UserEditClient
        user={user}
        email={decodedEmail}
        profile={session?.user.image}
      />
    </section>
  );
}
