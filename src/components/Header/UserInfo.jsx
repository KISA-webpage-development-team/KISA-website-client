import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function UserInfo({ email, image, name }) {
  // user page is navigated by using email's first part
  const emailid = email.split("@")[0];

  return (
    <Link href={`/users/${emailid}`} className="flex items-center">
      <div className="relative flex w-8 h-8">
        <Image
          className="rounded-full"
          src={image}
          sizes={100}
          fill
          alt="user profile"
        />
      </div>
      <p className="hidden md:block text-lg ml-3 mr-3 text-white">{name}</p>
    </Link>
  );
}
