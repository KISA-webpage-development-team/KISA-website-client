import React from "react";
import InstagramLinkIcon from "../shared/InstagramLinkIcon";
import FacebookLinkIcon from "../shared/FacebookLinkIcon";

// instagram + facebook icons
// umich kisa text

export default function Footer() {
  return (
    <div className="flex flex-col gap-3 justify-center items-center py-[53px]">
      <div className="flex items-center gap-4">
        <InstagramLinkIcon color="black" />
        <FacebookLinkIcon color="black" />
      </div>

      <h2 className="text-2xl">UMICH KISA</h2>
    </div>
  );
}
