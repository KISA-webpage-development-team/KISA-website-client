import Image from "next/image";
import React from "react";

export default function DetailThumbnail({ id }) {
  return (
    <div
      className="relative bg-[#00274C] flex justify-center 
    w-screen left-0 h-[500px] overflow-hidden"
    >
      <div className={`flex w-full px-36 h-full`}>
        <Image
          className="object-cover px-36"
          src={`/images/${id}.png`}
          alt="Michigan League"
          fill
          priority
        />
        {/* <div className="absolute bg-[#00000040] opacity-[81%] w-full h-full" /> */}
      </div>
    </div>
  );
}
