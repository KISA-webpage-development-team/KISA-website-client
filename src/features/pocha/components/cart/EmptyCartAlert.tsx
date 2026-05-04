import Image from "next/image";
import React from "react";

export default function EmptyCartAlert() {
  return (
    <div className="flex flex-col justify-center items-center py-12 gap-4">
      <Image
        src="/images/empty_cart.png"
        alt=""
        width={240}
        height={240}
        aria-hidden="true"
      />
      <p className="type-body text-foreground text-center">
        Your cart is empty.
      </p>
    </div>
  );
}
