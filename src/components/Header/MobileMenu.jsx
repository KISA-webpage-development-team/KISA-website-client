import React from "react";
import LoginButton from "./LoginButton";
import UserInfo from "./UserInfo";
import MobileMenuList from "./MobileMenuList";

export default function MobileMenu({ session }) {
  return (
    <div className="z-10 w-full h-full flex flex-col gap-12 items-start px-12 pt-24 pb-12 bg-michigan-maize">
      {/* 1. User + Login Button */}
      <div className="flex items-center gap-4">
        {session && (
          <UserInfo
            email={session.user.email}
            image={session.user.image}
            name={session.user.name}
          />
        )}

        <LoginButton session={session} />
      </div>

      <MobileMenuList />
    </div>
  );
}
