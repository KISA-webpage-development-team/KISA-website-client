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
import { usePayCart } from "../../hooks/usePayCart";
import { checkCartStock, checkCartStockMock } from "@/apis/pocha/queries";
import { UserSession } from "@/lib/next-auth/types";
import { useSession } from "next-auth/react";
import useUserAge from "../../hooks/useUserAge";

export default function PaymentSubmitForm() {
  const { data: session, status } = useSession() as {
    data: UserSession | undefined;
    status: string;
  };
  const { amount, fee, totalPrice, hasImmediatePrep, pochaID } = usePayCart();
  const { underAge, status: userAgeStatus } = useUserAge(session);

  // [NOTE] useStripe and useElements should be called inside <Elements> wrapper
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
      body: JSON.stringify({ amount: convertToSubcurrency(totalPrice) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [totalPrice]);

  /**
   * @desc Process Payment with Stripe
   */
  const processPay = async () => {
    // this is actual payment, confirm payment
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://localhost:3000/pocha/pay-success?pochaid=${pochaID}&amount=${totalPrice}`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      // This payment UI automatically closes with a success animation
      // redirect to "return_url"
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    // 0. check if stripe, elements, userAgeStatus is loaded
    if (!stripe || !elements || userAgeStatus === "loading") {
      return;
    }

    // 1. check if there is an error in the card input form
    const { error: formError } = await elements.submit();
    if (formError) {
      setErrorMessage(formError.message);
      setLoading(false);
      return;
    }

    // 2. if cart has immediatePrep item (= alcohol), check age
    if (hasImmediatePrep) {
      // check age
      if (userAgeStatus === "success" && underAge) {
        setErrorMessage("미성년자는 주류를 주문할 수 없습니다.");
        setLoading(false);
        return;
      }
    }

    // 3. inventory check
    try {
      // const res = await checkCartStock(session?.user?.email, pochaID);
      const res = await checkCartStockMock(session?.user?.email, pochaID);

      if (!res) {
        setErrorMessage("재고가 부족합니다.");
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error("Error while checking inventory", error);
      setLoading(false);
      return;
    }

    // 4. process payment
    try {
      await processPay();
    } catch (error) {
      console.error("Error while processing payment", error);
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
            <span>${fee}</span>
          </div>
        </div>

        <HorizontalDivider />

        <div className="flex items-center justify-between self-stretch mt-2">
          <span className="font-bold">Transaction Fee</span>
          <span className="text-xl font-bold">${totalPrice}</span>
        </div>
      </div>
      {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}

      {/* Submit button (sticky on the bottom) */}
      <button
        disabled={!stripe || loading}
        className="fixed left-0 w-full 
        z-10 bottom-0 mb-4
         bg-blue-500 text-white
        border-gray-200 border py-3 px-2 rounded-lg"
      >
        {!loading ? `$${totalPrice} 결제하기` : "로딩중..."}
      </button>
    </form>
  );
}
