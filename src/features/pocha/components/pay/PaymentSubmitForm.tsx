// PaymentSubmitForm.tsx

// [UI]
// - PaymentElement from Stripe (built-in component)
// - Total Price + Transaction Fee Display
// - Submit Button

// [NOTE] I wanted to make a separate component only for the form.
// However, built-in PaymentElement component requires submit button to be included in the form to display error msgs

import React, { FormEvent, useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/stripe/convertToSubcurrency";
import { HorizontalDivider } from "@/final_refactor_src/components/divider";

export default function PaymentSubmitForm({ amount }: { amount: number }) {
  const transactionFee = (0.3 + amount * 0.029).toFixed(2);
  const finalPrice = (amount + parseFloat(transactionFee)).toFixed(2);

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
        return_url: `/pocha/payment-success?amount=${amount}`,
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
    return <></>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full
    flex flex-col
    bg-white rounded-md"
    >
      {/* Payment form input */}
      {clientSecret && (
        <PaymentElement
          options={{
            layout: "accordion",
            paymentMethodOrder: ["apple_pay", "google_pay", "card"],
          }}
        />
      )}

      {/* Total Price + Transaction fee display */}
      <div
        className="w-full flex flex-col items-start 
      border-gray-200 border py-6 px-3 mt-4"
      >
        <span className="text-lg font-bold">결제금액</span>
        <div className="flex flex-col self-stretch mt-4 mb-2">
          <div className="flex items-center justify-between">
            <span>주문금액</span>
            <span>${amount}</span>
          </div>

          <div className="flex items-center justify-between">
            <span>Transaction Fee</span>
            <span>${transactionFee}</span>
          </div>
        </div>

        <HorizontalDivider />

        <div className="flex items-center justify-between self-stretch mt-2">
          <span className="font-bold">Transaction Fee</span>
          <span className="text-xl font-bold">${finalPrice}</span>
        </div>
      </div>

      {/* Submit button (sticky on the bottom) */}
      <button
        disabled={!stripe || loading}
        className="fixed left-0 w-full 
        z-10 bottom-0 mb-4
         bg-blue-500 text-white
        border-gray-200 border py-3 px-2 rounded-lg"
      >
        {!loading ? `$${finalPrice} 결제하기` : "로딩중..."}
      </button>
    </form>
  );
}
