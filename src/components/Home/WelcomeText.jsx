import React from "react";
import { arial } from "../../utils/fonts/textFonts";

export default function WelcomeText() {
  return (
    <div className="flex flex-col items-center gap-[26px] text-white z-10">
      <h1 className={`${arial.className} text-[70px] font-bold`}>
        WELCOME TO UMICH KISA
      </h1>
      <h3 className={`${arial.className} text-[35px]`}>
        - Korean International Student Association -
      </h3>
    </div>
  );
}
