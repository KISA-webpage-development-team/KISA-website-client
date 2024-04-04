import React from "react";
import BurgerMenuIcon from "../ui/BurgerMenuIcon";
import CancelIcon from "../ui/CancelIcon";

export default function MobileMenuButton({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) {
  const handleClick = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <button onClick={handleClick} className="z-20">
      {isMobileMenuOpen ? <CancelIcon /> : <BurgerMenuIcon />}
    </button>
  );
}
