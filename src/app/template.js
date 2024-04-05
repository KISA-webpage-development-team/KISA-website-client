"use client";

import React, { useState } from "react";
import Header from "../components/Header/Header";

export default function Template({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <header className="top-0 z-40">
        <div className="max-w-[1920px] mx-auto">
          <Header
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        </div>
      </header>
      {children}
    </div>
  );
}
