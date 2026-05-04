import React from "react";

interface PaySummaryCardProps {
  amount: number;
  fee: number;
  totalPrice: number;
}

export default function PaySummaryCard({
  amount,
  fee,
  totalPrice,
}: PaySummaryCardProps) {
  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between type-body-sm text-foreground">
          <span>Subtotal</span>
          <span>${amount}</span>
        </div>

        <div className="flex items-center justify-between type-body-sm text-foreground">
          <span>Service Fee</span>
          <span>${fee}</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-border flex items-center justify-between type-body text-foreground">
        <span>Total</span>
        <span>
          <strong>${totalPrice}</strong>
        </span>
      </div>
    </div>
  );
}
