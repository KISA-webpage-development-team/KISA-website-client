import React from "react";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import PochaCartIcon from "@/final_refactor_src/components/icon/PochaCartIcon";

type PochaCartProps = {
  pochaid: number;
};

export default function OpenCartButton({ pochaid }: PochaCartProps) {
  const handleCartClick = () => {
    const queryParams = `pochaid=${pochaid}`;
    window.location.href = `/pocha/cart?${queryParams}`;
  };

  return (
    <div className="flex justify-center w-full">
      <button
        className={`
          w-[70%] flex py-3 mt-8
          rounded-lg text-white font-semibold
          bg-cyan-600/75 justify-between items-center
          ${sejongHospitalBold.className}
        `}
        onClick={handleCartClick}
      >
        <span className={`ml-10 ${sejongHospitalBold.className}`}>
          View Cart
        </span>
        <div className="mr-10">
          <PochaCartIcon />
        </div>
      </button>
    </div>
  );
}
