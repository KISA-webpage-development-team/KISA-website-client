// Website Logo: Logo + Name

import Image from "next/image";
import Kisa_Logo from "../../../public/umich_kisa_logo.jpeg";
import React from "react";
import Link from "next/link";
import { sejongHospitalBold } from "../../utils/fonts/textFonts";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <div className="relative flex h-16 md:h-20 lg:h-24 aspect-square">
        <Image priority src={Kisa_Logo} fill alt="kisa logo" />
      </div>

      <div className={`flex ml-2 flex-col ${sejongHospitalBold.className}`}>
        <h1 className="text-base md:text-lg lg:text-xl">UMich</h1>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">KISA</h1>
      </div>
    </Link>
  );
}
