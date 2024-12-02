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
import { checkCartStock, checkCartStockMock } from "@/apis/pocha/mutations";
import { UserSession } from "@/lib/next-auth/types";
import { useSession } from "next-auth/react";
import useUserAge from "../../hooks/useUserAge";
import { useRouter } from "next/navigation";
import { notifyPayResult } from "@/apis/pocha/mutations";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "@/utils/fonts/textFonts";

interface PaymentSubmitFormProps {
  amount: number;
  fee: number;
  totalPrice: number;
  tip: number;
  setTip: (tip: number) => void;
  pochaID: number;
  ageCheckRequired: boolean;
}

export default function PaymentSubmitForm({
  amount,
  fee,
  totalPrice,
  tip,
  setTip,
  pochaID,
  ageCheckRequired,
}: PaymentSubmitFormProps) {
  const { data: session, status: sessionStatus } = useSession() as {
    data: UserSession | undefined;
    status: string;
  };
  // const { amount, fee, totalPrice, hasImmediatePrep, pochaID } = usePayCart();
  const { underAge, status: userAgeStatus, fullname } = useUserAge(session);

  const router = useRouter();
  // [NOTE] useStripe and useElements should be called inside <Elements> wrapper
  const stripe = useStripe();
  const elements = useElements();

  const [paymentIntentId, setPaymentIntentId] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const createPaymentIntent = async () => {
      // fetch client secret from server
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: convertToSubcurrency(totalPrice),
          customer: {
            email: session?.user?.email,
            name: fullname,
          },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret);
          setPaymentIntentId(data.paymentIntentId);
        });
    };

    if (session?.user?.email && fullname && totalPrice) {
      createPaymentIntent();
    }
  }, [totalPrice, session?.user?.email, fullname]);

  /**
   * @desc Update Payment Intent with Tip
   */
  const updateTip = async () => {
    // fetch updated client secret from server
    fetch("/api/create-payment-intent", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: paymentIntentId,
        tip: parseFloat(tip.toFixed(2)),
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  };

  /**
   * @desc Process Payment with Stripe
   */
  const processPay = async () => {
    // this is actual payment, confirm payment
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
      // [NOTE] for production, return_url should be the actual URL
      confirmParams: {
        return_url: `http://localhost:3000/pocha/pay-success?pochaid=${pochaID}&amount=${totalPrice}`,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message);

      // notify pay result with failure
      const res = await notifyPayResult(session?.user?.email, pochaID, {
        result: "failure",
      });

      if (!res) {
        console.error("Error while updating cart status");
      }
    } else {
      // notify pay result with success
      const res = await notifyPayResult(session?.user?.email, pochaID, {
        result: "success",
      });
      if (!res) {
        console.error("Error while updating cart status");
      }
      // This payment UI automatically closes with a success animation
      // redirect to "return_url"
      router.push(
        `/pocha/pay-success?pochaid=${pochaID}&amount=${totalPrice}&payment_intent=${paymentIntent}`
      );
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
    if (ageCheckRequired) {
      console.log("checking age");
      // check age
      if (userAgeStatus === "success" && underAge) {
        setErrorMessage("미성년자는 주류를 주문할 수 없습니다.");
        setLoading(false);
        return;
      }
    }

    // 3. inventory check ang
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

    // 4. update tip
    try {
      await updateTip();
    } catch (error) {
      console.error("Error while updating tip", error);
    }

    // 5. process payment
    try {
      await processPay();
    } catch (error) {
      console.error("Error while processing payment", error);
    }

    setLoading(false);
  };

  const handleTipTest = (e) => {
    setTip(Number(e.target.value));
  };

  if (
    sessionStatus === "loading" ||
    userAgeStatus === "loading" ||
    !clientSecret ||
    !stripe ||
    !elements
  ) {
    return <></>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full
    flex flex-col
    bg-white rounded-md py-2"
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
        className={`w-full flex flex-col items-start 
          rounded-xl
      border-gray-300 border p-5 mt-4 ${sejongHospitalBold.className}`}
      >
        <span className="text-lg font-bold">Summary</span>
        <div
          className={`flex flex-col self-stretch mt-4 mb-2 ${sejongHospitalLight.className}`}
        >
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span>${amount}</span>
          </div>

          <div className="flex items-center justify-between">
            <span>Transaction Fee</span>
            <span>${fee}</span>
          </div>

          {tip > 0 && (
            <div className="flex items-center justify-between">
              <span>Tip</span>
              <span>${tip}</span>
            </div>
          )}
        </div>

        <HorizontalDivider color="gray" />

        <div className="flex items-center justify-between self-stretch mt-2">
          <span className="font-bold">Total</span>
          <span className="text-xl font-bold">${totalPrice}</span>
        </div>
      </div>
      {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}

      <input
        type="number"
        placeholder="Tip"
        className={`mt-4
            text-lg ${sejongHospitalBold.className}
             left-0 w-full 
            z-10 bottom-0 mb-4
             rounded-lg font-semibold
            border-gray-200 border py-3 px-2`}
        onChange={handleTipTest}
      />

      {/* Submit button (sticky on the bottom) */}
      <button
        disabled={!stripe || loading}
        className={`mt-4
        text-lg ${sejongHospitalBold.className}
         left-0 w-full 
        z-10 bottom-0 mb-4
         rounded-lg text-white font-semibold
          bg-cyan-600/75
        border-gray-200 border py-3 px-2`}
      >
        {!loading ? `Pay $${totalPrice}` : "Loading..."}
      </button>
    </form>
  );
}
