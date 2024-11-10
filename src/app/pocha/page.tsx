import React from "react";
import PochaHeading from "@/features/pocha/components/PochaHeading";
import PochaCartButton from "@/features/pocha/components/PochaCartButton";
import PochaHelpButton from "@/features/pocha/components/PochaHelpButton";
import PochaMenuDetails from "@/features/pocha/components/PochaMenuDetails";
import PochaMenuList from "@/features/pocha/components/PochaMenuList";
import PochaTabs from "@/features/pocha/components/PochaTabs";

export default function PochaPage() {
  return (
    <div>
      {/* pocha title & description */}
      <PochaHeading />

      {/* menu and order history tabs */}
      <PochaTabs />

      {/* Listing the menus */}
      <PochaMenuList />

      {/* helper button */}
      <PochaHelpButton />

      {/* Selected menu details */}
      <PochaMenuDetails />

      {/* Button for viewing cart */}
      <PochaCartButton />
    </div>
  );
}
