"use client";

import LoginButton from "@/components/layout/header/LoginButton";
import UserInfo from "@/components/layout/header/UserInfo";
import { useAuth } from "@/lib/auth/authContext";

export default function PochaManagePageHeader() {
  const { session, isAuthenticated } = useAuth();

  return (
    <div className="relative flex min-h-[4.5rem] items-center justify-between gap-4 overflow-hidden py-2">
      <h1 className="type-h1 relative z-10 text-foreground">포차 관리</h1>
      <div className="relative z-10 flex items-center gap-4">
        {session?.user?.email && session.user.name && session.user.image && (
          <UserInfo
            email={session.user.email}
            image={session.user.image}
            name={session.user.name}
          />
        )}
        <LoginButton isAuthenticated={isAuthenticated} />
      </div>
    </div>
  );
}
