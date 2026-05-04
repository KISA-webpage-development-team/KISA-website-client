/*
  ViewCartButton
  - Floating footer CTA on the menu tab.
  - Label-only "View Cart" — no count, no total.
*/

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@umichkisa-ds/web";
import FloatingCTA from "@/features/pocha/components/shared/FloatingCTA";

interface ViewCartButtonProps {
  pochaID: number | undefined;
}

export default function ViewCartButton({ pochaID }: ViewCartButtonProps) {
  const router = useRouter();

  const handleViewCart = () => {
    if (pochaID === undefined) return;
    router.push(`/pocha/cart?pochaid=${pochaID}`);
  };

  return (
    <FloatingCTA>
      <Button
        variant="primary"
        size="lg"
        onClick={handleViewCart}
        disabled={pochaID === undefined}
        className="w-full pointer-events-auto shadow-lg"
      >
        View Cart
      </Button>
    </FloatingCTA>
  );
}
