import React from "react";
import Header from "../components/Header/Header";
import { sejongHospitalLight } from "../utils/fonts/textFonts";

export default function Template({ children }) {
  // mainConentsWidth: this will control all of the horizontal padding and margin of the page contents
  const mainContentsWidth = "max-w-screen-2xl px-4 md:px-24 lg:px-32";

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
        className={`w-full h-full
        mx-auto ${mainContentsWidth}
        pt-3 md:pt-6`}
      >
        {children}
      </main>
    </div>
  );
}
