"use client";

import { useSession } from "next-auth/react";

import LoginButton from "@/components/layout/header/LoginButton";
import UserInfo from "@/components/layout/header/UserInfo";
import { UserSession } from "@/lib/next-auth/types";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";

export default function PochaManagePageHeader() {
  const { data: session } = useSession() as {
    data: UserSession | undefined;
    status: string;
  };

  return (
    <div className="relative flex min-h-[4.5rem] items-center justify-between gap-4 overflow-hidden py-2">
      <h1
        className={`relative z-10 ${sejongHospitalBold.className} text-3xl`}
      >
        포차 관리
      </h1>
      <div className="relative z-10 flex items-center gap-4">
        <UserInfo
          email={session?.user?.email}
          image={session?.user?.image}
          name={session?.user?.name}
          textClassName="hidden lg:hidden"
        />
        <LoginButton session={Boolean(session)} />
      </div>
    </div>
  );
}
