"use client";

import Link from "next/link";
import React from "react";
import InstagramIcon from "../ui/InstagramIcon";

const instagramURL = "https://www.instagram.com/kisa_umich/";

export default function InstagramLinkIcon({ color = "none" }) {
  const navigateToInstagram = () => {
    window.open(instagramURL, "_blank");
  };

  return (
    <button onClick={navigateToInstagram}>
      <InstagramIcon color={color} />
    </button>
  );
}
