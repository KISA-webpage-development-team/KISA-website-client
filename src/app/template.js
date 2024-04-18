"use client";

import React, { useState } from "react";
import Header from "../components/Header/Header";

export default function Template({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="h-full flex flex-col">
      <header className="top-0 z-40  bg-michigan-blue">
        <Header
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      </header>
      <main
        className="h-full w-full mx-auto max-w-screen-2xl
       md:px-[60px] lg:px-[75px]"
      >
        {children}
      </main>
    </div>
  );
}
