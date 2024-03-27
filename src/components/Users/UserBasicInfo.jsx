"use client";

import Image from "next/image";
import React from "react";
import { useSession } from "next-auth/react";

export default function UserBasicInfo({ email, fullname }) {
  const { data: session } = useSession();

  if (!session) return <div> loading...</div>;

  return (
    <div className="flex w-[50%] gap-16 justify-center">
      {/* Left: User Profile Image */}
      {session?.user.email == email && (
        <div className="w-36 h-36">
          <Image
            className="rounded-full"
            src={session?.user.image}
            alt="user profile image"
            width={500}
            height={500}
          />
        </div>
      )}

      {/* Right: User fullname, email address */}
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl font-bold">{fullname}</h1>
        <h1 className="mt-2 text-xl">{email}</h1>
      </div>
    </div>
  );
}
