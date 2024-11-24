import React from "react";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";

type PaymentProps = {
  pochaid: number;
};

export default function ProceedToPaymentButton({ pochaid }: PaymentProps) {
  const handlePaymentClick = () => {
    const queryParams = `pochaid=${pochaid}`;
    window.location.href = `/pocha/pay?${queryParams}`;
  };

  return (
    <div className="flex justify-center w-full">
      <button
        className={`
          w-[70%]  py-3 mt-8
          rounded-lg text-white font-semibold
          bg-cyan-600/75
          flex justify-center items-center
          ${sejongHospitalBold.className}
        `}
        onClick={handlePaymentClick}
      >
        <span className={`${sejongHospitalBold.className}`}>
          Proceed to Payment
        </span>
      </button>
    </div>
  );
}
