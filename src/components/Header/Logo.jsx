// Website Logo: Logo + Name

import Image from "next/image";
import Kisa_Logo from "../../../public/kisa_logo.png";
import React from "react";
import Link from "next/link";
import { heebo, sejongHospitalBold } from "../../utils/fonts/textFonts";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <div className="relative flex w-12 aspect-square">
        <Image priority src={Kisa_Logo} fill alt="kisa logo" />
      </div>

      <div className={`flex ml-2 flex-col font-medium ${heebo.className}`}>
        <h1 className="text-base md:text-lg lg:text-4xl">UM KISA</h1>
      </div>
    </Link>
  );
}
