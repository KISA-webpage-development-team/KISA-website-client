"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { UserSession } from "@/lib/next-auth/types";
import { Cart, PochaInfo } from "@/types/pocha";
import PaymentSubmitForm from "@/features/pocha/components/pay-cart/PaymentSubmitForm";

// Stripe
import { Elements } from "@stripe/react-stripe-js"; // stripe payment element
import { loadStripe } from "@stripe/stripe-js";
import convertToSubcurrency from "@/lib/stripe/convertToSubcurrency";

import { useRouter, useSearchParams } from "next/navigation";
import { getPochaInfo } from "@/apis/pocha/queries";
import usePay from "@/features/pocha/hooks/usePay";
import { LoadingSpinner } from "@/final_refactor_src/components/feedback";
import BackIcon from "@/final_refactor_src/components/icon/BackIcon";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import { ApiError } from "@/lib/axios/types";

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

  const [pochaIDError, setPochaIDError] = useState<ApiError>();
  const [pochaID, setPochaID] = useState<number>(urlPochaID);

  const {
    amount,
    fee,
    tip,
    setTip,
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
        setPochaID(res.pochaID);

        // update URL search params with the fetched pochaID
        const params = new URLSearchParams(window.location.search);
        params.set("pochaid", res.pochaID.toString());
        window.history.replaceState({}, "", `?${params.toString()}`);
      } catch (error) {
        console.error("[PochaPayPage] error while fetching pocha info", error);
        setPochaIDError(error as ApiError);
      }
    };

    // missing pochaID on the URL
    if (!pochaID) {
      // need to fetch
      console.log("need to fetch pochaID");
      fetchPochaInfo();
    } else {
      setPochaID(pochaID);
    }
  }, [pochaID, setPochaID]);

  if (sessionStatus === "loading" || payReadyStatus === "loading") {
    return <LoadingSpinner />;
  }

  if (payReadyStatus === "error" || !totalPrice) {
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

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="375"
        height="4"
        viewBox="0 0 375 4"
        fill="none"
        className="mx-auto mt-1"
      >
        <path
          d="M0 2L375 2"
          stroke="#E3E3E3"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

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
          tip={tip}
          setTip={setTip}
          pochaID={pochaID}
          ageCheckRequired={ageCheckRequired}
        />
      </Elements>
    </section>
  );
}
