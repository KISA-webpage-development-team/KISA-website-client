import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@umichkisa-ds/web";

type PaymentProps = {
  pochaid: number;
};

export default function ProceedToPaymentButton({ pochaid }: PaymentProps) {
  const router = useRouter();

  const handlePaymentClick = () => {
    router.push(`/pocha/pay?pochaid=${pochaid}`);
  };

  return (
    <Button
      variant="primary"
      size="lg"
      onClick={handlePaymentClick}
      className="w-full"
    >
      Proceed to payment
    </Button>
  );
}
