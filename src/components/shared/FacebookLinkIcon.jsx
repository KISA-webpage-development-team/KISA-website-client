"use client";

import Link from "next/link";
import React from "react";
import FacebookIcon from "../ui/FacebookIcon";

const FacebookURL = "https://www.facebook.com/umich.kisa";

export default function FacebookLinkIcon() {
  const navigateToFacebook = () => {
    window.open(FacebookURL, "_blank");
  };

  return (
    <button onClick={navigateToFacebook}>
      <FacebookIcon />
    </button>
  );
}
