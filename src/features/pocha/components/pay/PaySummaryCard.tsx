import { Divider } from "@umichkisa-ds/web";
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
    <div className="w-full flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between type-body text-foreground">
          <span>Subtotal</span>
          <span>${amount}</span>
        </div>

        <div className="flex items-center justify-between type-body text-foreground">
          <span>Service Fee</span>
          <span>${fee}</span>
        </div>
      </div>

      <Divider orientation="horizontal" className="my-1"/>

      <div className="flex items-center justify-between type-h4 text-foreground">
        <span>Total</span>
        <span>
          <strong>${totalPrice}</strong>
        </span>
      </div>

      <p className="type-caption text-muted-foreground">
          *A service fee is charged by Stripe and consists of a $0.30 flat fee
          plus 3.1% of the order amount.
        </p>
    </div>
  );
}
