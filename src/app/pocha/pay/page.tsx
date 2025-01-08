"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { UserSession } from "@/lib/next-auth/types";
import { Cart, PochaInfo } from "@/types/pocha";
import PaymentSubmitForm from "@/features/pocha/components/cart-pay/PaymentSubmitForm";

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
import usePochaID from "@/features/pocha/hooks/usePochaID";
import PochaBackHeading from "@/features/pocha/components/shared/PochaBackHeading";
import PochaHorizontalDivider from "@/features/pocha/components/shared/PochaHorizontalDivider";

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

  const { pochaID, status: pochaIDStatus, error: pochaIDError } = usePochaID();

  const {
    amount,
    fee,
    tip,
    setTip,
    totalPrice,
    ageCheckRequired,
    status: payReadyStatus,
  } = usePay(session?.user?.email, session?.token, pochaID);

  if (
    sessionStatus === "loading" ||
    pochaIDStatus === "loading" ||
    payReadyStatus === "loading"
  ) {
    return <LoadingSpinner />;
  }

  if (pochaIDStatus === "error") {
    throw new Error(pochaIDError || "Unexpected error occurred");
  }

  if (payReadyStatus === "error" || !totalPrice) {
    // [IMPORTANT]
    // this will occur mostly from back button behavior
    // from API, if the cart is empty (already paid or no items)

    // redirect to /pocha
    router.push("/pocha");
  }

  return (
    <section className="!gap-0">
      <PochaBackHeading title="Pay" />
      <PochaHorizontalDivider />

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
