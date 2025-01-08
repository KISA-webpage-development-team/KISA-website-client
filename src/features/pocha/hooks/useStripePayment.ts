// hooks/useStripePayment.ts
import { FormEvent, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { checkCartStock, notifyPayResult } from "@/apis/pocha/mutations";
import { useRouter } from "next/navigation";

const useStripePayment = (
  clientSecret: string,
  pochaID: number,
  totalPrice: number,
  userEmail: string,
  underAge: boolean,
  ageCheckRequired: boolean
) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  /** Step 1: Validate Payment Form */
  const validatePaymentForm = async () => {
    const { error } = await elements.submit();
    if (error) throw new Error(error.message);
  };

  /** Step 2: Check User Age */
  const checkUserUnderAge = () => {
    if (ageCheckRequired && underAge) {
      throw new Error("미성년자는 주류를 주문할 수 없습니다.");
    }
  };

  /** Step 3: Check Inventory */
  const checkCartInventory = async () => {
    try {
      const res = await checkCartStock(userEmail, pochaID);
      if (!res?.isStocked) {
        throw new Error("재고가 부족합니다.");
      }
    } catch (error) {
      throw new Error("Error while checking inventory.");
    }
  };

  /** Step 4: Process Payment */
  const processPayment = async () => {
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
      const res = await notifyPayResult(userEmail, pochaID, {
        result: "failure",
      });

      if (!res) {
        throw new Error("Error while updating cart status");
      }
    }
    // notify pay result with success
    const res = await notifyPayResult(userEmail, pochaID, {
      result: "success",
    });
    if (!res) {
      throw new Error("Error while updating cart status");
    }
    // This payment UI automatically closes with a success animation
    // redirect to "return_url"
    router.push(
      `/pocha/pay-success?pochaid=${pochaID}&amount=${totalPrice}&payment_intent=${paymentIntent}`
    );
  };

  /** Main Submit Function */
  const handlePaymentSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    // 0. check if stripe, elements, userAgeStatus is loaded
    if (!stripe || !elements) {
      return;
    }

    try {
      // Step 1: validate payment form
      await validatePaymentForm();

      // Step 2: check user age
      checkUserUnderAge();

      // Step 3: check cart inventory
      await checkCartInventory();

      // Step 4: process payment
      await processPayment();
    } catch (error) {
      console.error("Payment failed: ", error);
      setErrorMessage(error.message || "결제 실패");
    } finally {
      setLoading(false);
    }
  };

  return {
    handlePaymentSubmit,
    loading,
    errorMessage,
  };
};

export default useStripePayment;
