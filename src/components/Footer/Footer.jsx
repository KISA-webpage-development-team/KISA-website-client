import React from "react";
import InstagramLinkIcon from "../shared/InstagramLinkIcon";
import FacebookLinkIcon from "../shared/FacebookLinkIcon";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "../../utils/fonts/textFonts";

// instagram + facebook icons
// umich kisa text

export default function Footer() {
  return (
    <div
      className={`${sejongHospitalLight.className} flex flex-col gap-0 md:gap-2 justify-center items-center py-[30px]`}
    >
      <div className="flex items-center gap-4">
        <InstagramLinkIcon color="black" />
        <FacebookLinkIcon color="black" />
      </div>

      <h2 className="text-md sm:text-lg md:text-xl">UMICH KISA</h2>
    </div>
  );
}
