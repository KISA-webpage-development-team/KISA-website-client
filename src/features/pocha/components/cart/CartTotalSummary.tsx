import React from "react";

interface CartTotalSummaryProps {
  totalAmount: number;
}

export default function CartTotalSummary({
  totalAmount,
}: CartTotalSummaryProps) {
  return (
    <div className="flex justify-between items-baseline w-full">
      <span className="type-body text-muted-foreground">Total</span>
      <span className="type-h3 text-foreground">
        ${Number(totalAmount).toFixed(2)}
      </span>
    </div>
  );
}
