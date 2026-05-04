// PaymentSubmitForm.tsx

// [UI]
// - PaymentElement from Stripe (built-in component)
// - Pay summary rows (subtotal / service fee / total)
// - Footnote
// - Sticky-bottom submit button (in form so Stripe submit-in-form invariant holds)

import React from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import PaySummaryCard from "./PaySummaryCard";
import PayButton from "./PayButton";
import { LoadingSpinner } from "@umichkisa-ds/web";
import FloatingCTA from "@/features/pocha/components/shared/FloatingCTA";

// hooks
import useStripePayment from "../../hooks/useStripePayment";

const PAYMENT_ELEMENT_OPTIONS = {
  layout: "accordion" as const,
  paymentMethodOrder: ["apple_pay", "google_pay", "card"],
};

interface PaymentSubmitFormProps {
  amount: number;
  fee: number;
  totalPrice: number;
  pochaID: number;
  ageCheckRequired: boolean;
  userEmail: string;
  underAge: boolean;
  fullname: string;
}

export default function PaymentSubmitForm({
  amount,
  fee,
  totalPrice,
  pochaID,
  ageCheckRequired,
  userEmail,
  underAge,
  fullname,
}: PaymentSubmitFormProps) {
  // [NOTE] useStripe and useElements should be called inside <Elements> wrapper
  const stripe = useStripe();
  const elements = useElements();

  const {
    handlePaymentSubmit,
    loading: paymentLoading,
    errorMessage,
  } = useStripePayment(
    pochaID,
    totalPrice,
    userEmail,
    fullname,
    underAge,
    ageCheckRequired
  );

  if (!stripe || !elements) {
    return (
      <div className="flex justify-center py-10">
        <LoadingSpinner size="md" label="Loading payment details..." />
      </div>
    );
  }

  return (
    <form
      onSubmit={handlePaymentSubmit}
      className="relative flex flex-col flex-1 min-h-0"
    >
      {/* Scroll area — dim/lock during payment in flight */}
      <div
        className={`flex flex-col gap-6 pt-4 pb-32 ${
          paymentLoading ? "opacity-60 pointer-events-none" : ""
        }`}
        aria-busy={paymentLoading}
      >
        <PaymentElement options={PAYMENT_ELEMENT_OPTIONS} />

        <PaySummaryCard amount={amount} fee={fee} totalPrice={totalPrice} />
      </div>

      {/* Floating action footer with inline error above the button */}
      <FloatingCTA>
        {errorMessage ? (
          <p
            role="alert"
            className="type-caption text-error pointer-events-auto"
          >
            {errorMessage}
          </p>
        ) : null}
        <PayButton loading={paymentLoading} />
      </FloatingCTA>
    </form>
  );
}
