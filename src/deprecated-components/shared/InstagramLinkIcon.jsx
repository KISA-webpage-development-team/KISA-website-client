"use client";

import React from "react";
import InstagramIcon from "@/deprecated-components/ui/InstagramIcon";
import { Button } from "@nextui-org/react";

const instagramURL = "https://www.instagram.com/kisa_michigan/";

export default function InstagramLinkIcon({ color = "none" }) {
  const navigateToInstagram = () => {
    window.open(instagramURL, "_blank");
  };

  return (
    <Button
      isIconOnly
      color="white"
      aria-label="Instagram"
      onPress={navigateToInstagram}
    >
      <InstagramIcon color={color} />
    </Button>
  );
}
