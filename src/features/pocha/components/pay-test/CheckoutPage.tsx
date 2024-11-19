"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/stripe/convertToSubcurrency";

export default function CheckoutPage({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    // stripe and elements should be available at this point
    if (!stripe || !elements) {
      return;
    }

    // this is doing form validation, not submitting the actual payment yet
    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    // this is actual payment, confirm payment
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/pocha/payment-success?amount=${amount}`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      // This payment UI automatically closes with a success animation
      // redirect to "return_url"
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    // loading spinner here
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      {clientSecret && (
        <PaymentElement
          options={{
            layout: "tabs",
            paymentMethodOrder: ["apple_pay", "google_pay", "card"],
          }}
        />
      )}

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <button
        disabled={!stripe || loading}
        className="text-black w-full p-5 bg-yellow-200 mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {!loading ? `Pay $${amount}` : "Loading..."}
      </button>
    </form>
  );
}
