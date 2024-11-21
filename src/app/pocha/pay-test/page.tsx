"use client";

import PaymentSubmitForm from "@/features/pocha/components/cart/PaymentSubmitForm";
import convertToSubcurrency from "@/lib/stripe/convertToSubcurrency";

// Stripe
import { Elements } from "@stripe/react-stripe-js"; // stripe payment element
import { loadStripe } from "@stripe/stripe-js";

// defensive programming check
if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("Stripe publishable key is not set");
}

// load Stripe object to manage stripe-related operations throughout the app
// this should be loaded once, not every time the component is rendered to prevent recreating the object
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function PayTestPage() {
  const amount = 49.99; // how much money user is going to pay
  const fee = (0.3 + amount * 0.029).toFixed(2); // transaction fee

  return (
    <section
      className="max-w-6xl mx-auto relative
    "
    >
      <div className="bg-gray-200 h-[600px]" />
      {/* [FOCUS] this is a main part of using Stripe Payment Element */}
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount + parseFloat(fee)), // dollars to cents, stripe accepts in the most basic? currency unit
          currency: "usd",
        }}
      >
        <PaymentSubmitForm amount={amount} />
      </Elements>
    </section>
  );
}
