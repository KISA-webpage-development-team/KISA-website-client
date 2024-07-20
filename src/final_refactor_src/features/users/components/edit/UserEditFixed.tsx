import { User } from "@/final_refactor_src/types/user";
import Image from "next/image";
import React from "react";

type UserEditFixedProps = {
  profile: string;
  fields: Record<keyof User, any>;
};

export default function UserEditFixed({ profile, fields }: UserEditFixedProps) {
  return (
    <div className="flex flex-col items-center gap-2 md:gap-4">
      {/* Image */}
      {profile && (
        <figure
          className="relative flex justify-center 
    aspect-square w-16 md:w-20"
        >
          <Image
            className="rounded-full object-contain"
            src={profile}
            alt="profile image"
            fill
          />
        </figure>
      )}

      {/* fullname + major */}
      <div className="flex flex-col items-center">
        {Object.entries(fields).map(([key, value]) => (
          <div key={key} className="flex flex-col items-center gap-1">
            <span className="text-sm md:text-base">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
