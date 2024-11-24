"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { UserSession } from "@/lib/next-auth/types";
import { Cart } from "@/types/pocha";
import PaymentSubmitForm from "@/features/pocha/components/pay-cart/PaymentSubmitForm";

import convertToSubcurrency from "@/lib/stripe/convertToSubcurrency";

// Stripe
import { Elements } from "@stripe/react-stripe-js"; // stripe payment element
import { loadStripe } from "@stripe/stripe-js";
import { usePayCart } from "@/features/pocha/hooks/usePayCart";
import { useRouter } from "next/navigation";
import { getPochaInfo } from "@/apis/pocha/queries";

// defensive programming check
if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("Stripe publishable key is not set");
}

// load Stripe object to manage stripe-related operations throughout the app
// this should be loaded once, not every time the component is rendered to prevent recreating the object
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function PayPage() {
  // const amount = 49.99; // how much money user is going to pay

  const { amount, fee, totalPrice, pochaID, setPochaID } = usePayCart();

  const router = useRouter();

  const handleBackButton = () => {
    router.back();
  };

  const backToCart = () => {
    router.push(`/pocha/cart?pochaid=${pochaID}`);
  };

  // [TODO] need better handling on pochaID
  useEffect(() => {
    const fetchPochaInfo = async () => {
      // try API call first
      try {
        const res = await getPochaInfo(new Date());
        setPochaID(res?.pochaID);
      } catch (error) {
        console.error("Error fetching like status: ", error);
      }
    };

    if (pochaID === undefined) {
      // need to fetch
      fetchPochaInfo();
    }
  }, [pochaID, setPochaID]);

  if (amount === undefined) {
    return (
      <div className="flex flex-col">
        Invalid Access!
        <button onClick={backToCart}>Back To Cart</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Payment Page</h1>
      <button onClick={handleBackButton}>Back to Cart</button>

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(totalPrice), // dollars to cents, stripe accepts in the most basic? currency unit
          currency: "usd",
        }}
      >
        <PaymentSubmitForm />
      </Elements>
    </div>
  );
}
