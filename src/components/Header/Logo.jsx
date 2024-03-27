// Website Logo: Logo + Name

import Image from "next/image";
import Kisa_Logo from "../../../public/umich_kisa_logo.jpeg";
import React from "react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center">
        <Image
          priority
          src={Kisa_Logo}
          width={120}
          height={120}
          alt="kisa logo"
        />
        <div className="ml-2 flex flex-col">
          <h1 className="text-xl">UMich</h1>
          <h1 className="text-4xl font-semibold">KISA</h1>
        </div>
      </div>
    </Link>
  );
}
