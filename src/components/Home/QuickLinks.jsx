"use client";

import React from "react";
import { homeQuickLinksData as items } from "../../config/static/homePageData";
import Image from "next/image";
import { sejongHospitalBold } from "../../utils/fonts/textFonts";

export default function QuickLinks() {
  const navigateToLink = (url) => {
    console.log("url", url);
    window.open(url, "_blank");
  };

  return (
    <div
      className="w-full mt-0 sm:mt-4 md:mt-0
    flex flex-col gap-2"
    >
      <h2
        className={`${sejongHospitalBold.className} text-xl sm:text-2xl md:text-3xl`}
      >
        Quick Links
      </h2>

      <div
        className="relative flex flex-row
        flex-wrap w-full justify-evenly
        items-center gap-10"
      >
        {items.map(({ id, title, url }, index) => (
          <button
            key={`quick-link-${id}-${index}`}
            onClick={() => {
              navigateToLink(url);
            }}
            className="relative
            cursor-pointer flex-1 aspect-square
            flex flex-col items-center justify-center  rounded-xl
            hover:shadow-lg  p-1"
          >
            <Image
              className="object-contain"
              src={`/quick_links/${id}.png`}
              alt={title}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
