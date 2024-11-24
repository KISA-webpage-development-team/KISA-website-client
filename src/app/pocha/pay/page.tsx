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
import { useRouter, useSearchParams } from "next/navigation";
import { getPochaInfo } from "@/apis/pocha/queries";
import usePay from "@/features/pocha/hooks/usePay";
import { LoadingSpinner } from "@/final_refactor_src/components/feedback";
import BackIcon from "@/final_refactor_src/components/icon/BackIcon";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";

// defensive programming check
if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("Stripe publishable key is not set");
}

// load Stripe object to manage stripe-related operations throughout the app
// this should be loaded once, not every time the component is rendered to prevent recreating the object
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function PayPage() {
  const { data: session, status: sessionStatus } = useSession() as {
    data: UserSession | undefined;
    status: string;
  };

  const router = useRouter();

  const searchParams = useSearchParams();
  const urlPochaID = parseInt(searchParams.get("pochaid"));

  const [pochaID, setPochaID] = useState<number>(urlPochaID);

  const {
    amount,
    fee,
    totalPrice,
    ageCheckRequired,
    status: payReadyStatus,
  } = usePay(session?.user?.email, session?.token, pochaID);

  const backToCart = () => {
    router.back();
  };

  // set pochaID
  // by fetching PochaID from API, ensure that the pochaID is there
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

    // missing pochaID on the URL
    if (!pochaID) {
      // need to fetch
      fetchPochaInfo();
    } else {
      setPochaID(pochaID);
    }
  }, [pochaID, setPochaID]);

  if (
    sessionStatus === "loading" ||
    payReadyStatus === "loading"
  ) {
    return <LoadingSpinner />;
  }

  if (payReadyStatus === "error") {
    // [IMPORTANT]
    // this will occur mostly from back button behavior
    // from API, if the cart is empty (already paid or no items)

    // redirect to /pocha
    router.push("/pocha");
  }

  return (
    <section className="py-3">
      <div className="flex items-center  relative">
        <button onClick={backToCart}>
          <BackIcon />
        </button>

        <h1
          className={`${sejongHospitalBold.className} text-2xl text-blue-950
          absolute top-0 left-0 w-full flex justify-center -z-10`}
        >
          Pay
        </h1>
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(totalPrice), // dollars to cents, stripe accepts in the most basic? currency unit
          currency: "usd",
        }}
      >
        <PaymentSubmitForm
          amount={amount}
          fee={fee}
          totalPrice={totalPrice}
          pochaID={pochaID}
          ageCheckRequired={ageCheckRequired}
        />
      </Elements>
    </section>
  );
}
