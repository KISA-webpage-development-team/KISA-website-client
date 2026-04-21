"use client";

import React from "react";
import { Icon } from "@umichkisa-ds/web";

type MobileMenuButtonProps = {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
};

export default function MobileMenuButton({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: MobileMenuButtonProps) {
  const handleClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
      aria-expanded={isMobileMenuOpen}
      className="relative z-20 flex h-6 w-6 items-center justify-center focus:outline-none focus:bg-transparent"
    >
      <span
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden={isMobileMenuOpen}
      >
        <Icon name="menu" size="md" />
      </span>
      <span
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <Icon name="x" size="md" />
      </span>
    </button>
  );
}
