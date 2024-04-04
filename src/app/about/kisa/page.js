// 1. 단체 사진
// 2. 텍스트

import React from "react";
import AboutMainText from "../../../components/About/AboutMainText";
import KisaAll from "../../../components/About/KisaAll";

export default function KisaPage() {
  return (
    <section className="flex flex-col mt-5 mb-16 md:mb-24 lg:mb-32">
      {/* link is for Kepler adobe font */}
      <link rel="stylesheet" href="https://use.typekit.net/xbq1zkp.css"></link>
      <div className="flex justify-center w-screen bg-[#00274C] self-center">
        <KisaAll />
      </div>

      {/* 텍스트 */}
      {/* <h1 className="example">About KISA</h1> */}
      <div className="flex justify-center mt-[72px]">
        <AboutMainText />
      </div>
    </section>
  );
}
