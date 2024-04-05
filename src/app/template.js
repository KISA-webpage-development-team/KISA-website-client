"use client";

import React, { useState } from "react";
import Header from "../components/Header/Header";

export default function Template({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div>
      <header className="top-0 z-10">
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
