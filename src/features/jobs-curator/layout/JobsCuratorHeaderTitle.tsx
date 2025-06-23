import Link from "next/link";
import React from "react";

import WebLogo from "@/components/layout/header/WebLogo";

import { sejongHospitalBold } from "@/utils/fonts/textFonts";

export default function JobsCuratorHeaderTitle() {
  return (
    <div className="flex items-center gap-5">
      <WebLogo />
      <Link href="/jobs" className="flex flex-col items-start gap-0">
        <h1
          className={`text-xs md:text-sm 
    font-bold ${sejongHospitalBold.className}`}
        >
          UMich KISA
        </h1>
        <h1
          className={`flex items-center 
    text-xl lg:text-2xl font-bold ${sejongHospitalBold.className}`}
        >
          Jobs Curator
        </h1>
      </Link>
    </div>
  );
}
