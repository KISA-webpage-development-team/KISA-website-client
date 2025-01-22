"use client";
import React from "react";
import {
  sejongHospitalLight,
  sejongHospitalBold,
} from "../../utils/fonts/textFonts";
import Image from "next/image";

export default function SponsorByTier({ sponsor }) {
  const handleClick = (link) => {
    window.open(link, "_blank");
  };
  const getImagePath = (sponsorID: number) => {
    return `/sponsor/${sponsorID}.png`;
  };

  const { sponsorId, link, division, imageTitle } = sponsor;
  return (
    <div
      className={`${sejongHospitalBold.className} flex items-center`}
      onClick={() => handleClick(link)}
    >
      <Image
        alt={imageTitle}
        src={getImagePath(sponsorId)}
        width={200}
        height={150}
        // layout="fill"
        // objectFit="contain"
        className="cursor-pointer"
      />
    </div>
  );
}
