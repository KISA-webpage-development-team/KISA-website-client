import Image from "next/image";
import React from "react";

export default function UserBasicInfoLeft({ profile, fullname, major }) {
  return (
    <div className="flex flex-col justify-center gap-4">
      {/* Image */}
      <div>
        <Image
          className="rounded-full object-contain"
          src={profile}
          alt="profile image"
          width={200}
          height={200}
        />
      </div>

      {/* fullname + major */}

      <div className="bg-pink-200">
        <h1 className="text-3xl font-bold">{fullname}</h1>
        <h2 className="text-xl">{major}</h2>
      </div>
    </div>
  );
}
