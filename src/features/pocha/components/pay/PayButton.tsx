import React from "react";
import { Button, LoadingSpinner } from "@umichkisa-ds/web";

// Domain action component for the pay form's submit affordance.
// Encapsulates the payment-loading state. Lane 4.5b extends this with
// mock-mode branching (POST pay-result vs Stripe submit) — keeping the
// branch inside this component rather than at the call-site.

interface PayButtonProps {
  loading: boolean;
}

export default function PayButton({ loading }: PayButtonProps) {
  return (
    <Button
      type="submit"
      variant="primary"
      size="lg"
      disabled={loading}
      className="w-full pointer-events-auto shadow-lg"
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <LoadingSpinner size="sm" />
          Processing...
        </span>
      ) : (
        "Pay"
      )}
    </Button>
  );
}
