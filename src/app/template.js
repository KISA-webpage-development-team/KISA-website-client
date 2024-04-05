"use client";

import React, { useState } from "react";
import Header from "../components/Header/Header";

export default function Template({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="grow flex flex-col h-full">
      <header className="top-0 z-40">
        <div className="max-w-screen-2xl mx-auto px-[15px] md:px-[60px] lg:px-[75px]">
          <Header
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        </div>
      </header>
      <main
        className="grow w-full mx-auto max-w-screen-2xl
       md:px-[60px] lg:px-[75px]"
      >
        {children}
      </main>
    </div>
  );
}
