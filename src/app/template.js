"use client";

import React, { useState } from "react";
import Header from "../components/Header/Header";
import { sejongHospitalLight } from "../utils/fonts/textFonts";

export default function Template({ children }) {
  return (
    <div className="h-full flex flex-col">
      <header
        className={`${sejongHospitalLight.className} top-0 z-40 
      bg-gradient-to-r from-michigan-blue/90 via-michigan-blue to-michigan-blue/85
      text-white`}
      >
        <Header />
      </header>
      <main
        className="h-full w-full mx-auto max-w-screen-2xl
       md:px-[60px] lg:px-[75px] pt-5 md:pt-10"
      >
        {children}
      </main>
    </div>
  );
}
