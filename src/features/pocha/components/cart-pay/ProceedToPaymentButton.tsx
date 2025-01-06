import React from "react";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import PochaButton from "../shared/PochaButton";

type PaymentProps = {
  pochaid: number;
};

export default function ProceedToPaymentButton({ pochaid }: PaymentProps) {
  const handlePaymentClick = () => {
    const queryParams = `pochaid=${pochaid}`;
    window.location.href = `/pocha/pay?${queryParams}`;
  };

  return (
    <div className="w-full px-4">
      <PochaButton label="Checkout" onClick={handlePaymentClick} />
    </div>
  );
}
