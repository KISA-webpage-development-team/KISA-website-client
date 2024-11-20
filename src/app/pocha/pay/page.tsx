"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { UserSession } from "@/lib/next-auth/types";
import { Cart } from "@/types/pocha";
import PaymentSubmitForm from "@/features/pocha/components/pay/PaymentSubmitForm";

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

export default function PayPage() {
  const amount = 49.99; // how much money user is going to pay
  const fee = (0.3 + amount * 0.029).toFixed(2); // transaction fee

  const { data: session, status } = useSession() as {
    data: UserSession | null;
    status: string;
  };

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateAge = (birthday: string | null | undefined): number => {
    if (!birthday) return 0;
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const handleBackButton = () => {
    window.location.href = "/pocha/cart";
  };

  //   const handlePayButton = async () => {
  //     setIsProcessing(true);
  //     setError(null);

  //     try {
  //       const userBirthday = session?.user?.birthday;
  //       if (!userBirthday) {
  //         throw new Error("User birthday information is missing.");
  //       }

  //       const age = calculateAge(userBirthday);
  //       if (age < 21) {
  //         window.location.href = "/pocha/pay-fail";
  //         return;
  //       } else if (age >= 21) {
  //         window.location.href = "/pocha/pay-success";
  //       }
  //     } catch (error) {}
  //   };

  return (
    <div>
      <h1>Payment Page</h1>
      <button onClick={handleBackButton}>Back to Cart</button>

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
    </div>
  );
}
