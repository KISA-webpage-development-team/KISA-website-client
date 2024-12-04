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
import { Select, SelectItem } from "@nextui-org/react";
import { cp } from "fs";

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
  const [loading, setLoading] = useState<boolean>(false);

  const [tipPercentage, setTipPercentage] = useState(new Set(["0"]));
  const [isTipModalOpen, setIsTipModalOpen] = useState<boolean>(false);

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
    // console.log("new Tip: ", tip);
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
    console.log("paying totalPrice: ", totalPrice);
    // this is actual payment, confirm payment
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
      // [NOTE] for production, return_url should be the actual URL
      confirmParams: {
        return_url: `https://umichkisa.com/pocha/pay-success?pochaid=${pochaID}&amount=${totalPrice}`,
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
      const res = await checkCartStock(session?.user?.email, pochaID);
      // const res = await checkCartStockMock(session?.user?.email, pochaID);

      if (res?.isStocked === false) {
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
    // setTipPercentage(new Set(["15"]));

    // const defaultTip = (amount * 15) / 100;
    // setTip(defaultTip);
    // setIsTipModalOpen(true);

    // 5. [TODO: remove] process payment
    try {
      await processPay();
    } catch (error) {
      console.error("Error while processing payment", error);
    }

    setLoading(false);
  };

  const handleTipSubmit = async () => {
    try {
      await updateTip();

      setIsTipModalOpen(false);
      // 5. process payment
      try {
        await processPay();
      } catch (error) {
        console.error("Error while processing payment", error);
      }
    } catch (error) {
      console.error("Error while updating tip", error);
    }

    setLoading(false);
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
    <>
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

        {/* Submit button (sticky on the bottom) */}
        <button
          disabled={!stripe || loading}
          className={`mt-4
        text-lg ${sejongHospitalBold.className}
         left-0 w-full 
        bottom-0 mb-4
         rounded-lg text-white font-semibold
          bg-cyan-600/75
        border-gray-200 border py-3 px-2`}
        >
          {!loading ? `Pay $${totalPrice}` : "Loading..."}
        </button>
      </form>

      {/* {Tip Modal} */}
      {/* {isTipModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">
              잠깐! 팁은 주고 가야지 ㅋㅋ
            </h2>
            <Select
              label="Choose a tip amount"
              selectedKeys={tipPercentage}
              onSelectionChange={(value) => {
                const selectedTip = Array.from(value)[0] as string;

                if (selectedTip === undefined) {
                  console.log("tipPercentage: ", tipPercentage);
                  return;
                }

                setTipPercentage(value);
                setTip((amount * parseInt(selectedTip)) / 100);
              }}
              isRequired={true}
              className="w-full mb-4"
            >
              <SelectItem key="0">No Tip</SelectItem>
              <SelectItem key="15">15%</SelectItem>
              <SelectItem key="18">18%</SelectItem>
              <SelectItem key="20">20%</SelectItem>
            </Select>
            <div className="flex justify-between">
              <button
                onClick={() => {
                  setIsTipModalOpen(false);
                  setLoading(false);
                }}
                className="bg-gray-300 text-black px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (tip !== null) {
                    handleTipSubmit();
                  }
                }}
                disabled={tip === null} // Disable button if no value is selected
                className={`px-4 py-2 rounded-lg ${
                  tip !== null
                    ? "bg-blue-500 text-white cursor-pointer"
                    : "bg-gray-300 text-black cursor-not-allowed"
                }`}
              >
                Submit Tip
              </button>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
}
