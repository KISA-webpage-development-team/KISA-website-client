import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@umichkisa-ds/web";

type PaymentProps = {
  pochaID: number;
};

export default function ProceedToPaymentButton({ pochaID }: PaymentProps) {
  const router = useRouter();

  const handlePaymentClick = () => {
    router.push(`/pocha/pay?pochaid=${pochaID}`);
  };

  return (
    <Button
      variant="primary"
      size="lg"
      onClick={handlePaymentClick}
      className="w-full pointer-events-auto shadow-lg"
    >
      Proceed to payment
    </Button>
  );
}
