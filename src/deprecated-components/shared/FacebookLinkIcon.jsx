"use client";

import React from "react";
import FacebookIcon from "@/deprecated-components/ui/FacebookIcon";
import { Button } from "@nextui-org/react";

const FacebookURL = "https://www.facebook.com/umich.kisa";

export default function FacebookLinkIcon({ color = "none" }) {
  const navigateToFacebook = () => {
    window.open(FacebookURL, "_blank");
  };

  return (
    <Button
      isIconOnly
      color="white"
      aria-label="Instagram"
      onClick={navigateToFacebook}
    >
      <FacebookIcon color={color} />
    </Button>
  );
}
