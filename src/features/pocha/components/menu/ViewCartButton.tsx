/*
  ViewCartButton
  - Always-visible footer CTA on the menu tab.
  - Full-width, edge-to-edge, with safe-area-inset-bottom padding.
  - Label-only "View Cart" — no count, no total.
*/

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@umichkisa-ds/web";

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
    <div
      className="fixed bottom-0 left-0 right-0 z-30 bg-surface px-4 pt-3 border-t border-border"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 0.75rem)" }}
    >
      <Button
        variant="primary"
        size="lg"
        onClick={handleViewCart}
        disabled={pochaID === undefined}
        className="w-full"
      >
        View Cart
      </Button>
    </div>
  );
}
