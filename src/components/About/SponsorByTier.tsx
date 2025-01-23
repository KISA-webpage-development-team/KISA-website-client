"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function SponsorByTier({ sponsor }) {
  const getImagePath = (sponsorID: number) => {
    return `/sponsor/${sponsorID}.png`;
  };

  const { sponsorId, link, division, imageTitle } = sponsor;
  return (
    <Link href={link} className={"flex justify-center"} target="_blank">
      <Image
        alt={imageTitle}
        src={getImagePath(sponsorId)}
        width={200}
        height={150}
      />
    </Link>
  );
}
