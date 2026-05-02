"use client";

import React from "react";
import { useAuth } from "@/lib/auth/authContext";
import PaymentSubmitForm from "@/features/pocha/components/pay/PaymentSubmitForm";

// Stripe
import { Elements } from "@stripe/react-stripe-js"; // stripe payment element
import stripePromise from "@/lib/stripe/stripeClient";
import convertToSubcurrency from "@/lib/stripe/convertToSubcurrency";

import { useRouter } from "next/navigation";
import usePay from "@/features/pocha/hooks/usePay";
import { LoadingSpinner } from "@/components/ui/feedback";
import { StatusView } from "@umichkisa-ds/web";
import usePochaID from "@/features/pocha/hooks/usePochaID";
import PochaBackHeading from "@/features/pocha/components/shared/PochaBackHeading";
import PochaHorizontalDivider from "@/features/pocha/components/shared/PochaHorizontalDivider";
import useUserAge from "@/features/pocha/hooks/useUserAge";

export default function PayPage() {
  const { session } = useAuth();

  const router = useRouter();

  const {
    pochaID,
    status: pochaIDStatus,
    error: pochaIDError,
    noPocha,
  } = usePochaID();

  const {
    amount,
    fee,
    totalPrice,
    ageCheckRequired,
    status: payReadyStatus,
  } = usePay(session?.user?.email, session?.token, pochaID);

  const { underAge, status: userAgeStatus, fullname } = useUserAge(session);

  const isLoading =
    pochaIDStatus === "loading" ||
    payReadyStatus === "loading" ||
    userAgeStatus === "loading";
  const hasError =
    pochaIDStatus === "error" ||
    payReadyStatus === "error" ||
    userAgeStatus === "error" ||
    !totalPrice;

  // Short-circuit before the loading check — usePay stalls on null pochaID,
  // so the page would otherwise spin forever when there is no ongoing pocha.
  if (noPocha) {
    return (
      <StatusView
        fullScreen
        variant="not-found"
        icon="calendar"
        title="진행 중인 포차가 없습니다"
        description="다음 포차가 시작되면 결제를 진행할 수 있습니다."
      />
    );
  }

  if (isLoading) return <LoadingSpinner />;
  if (hasError) {
    router.push("/pocha");
    return null;
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
          setup_future_usage: "off_session",
        }}
      >
        <PaymentSubmitForm
          amount={amount}
          fee={fee}
          totalPrice={totalPrice}
          pochaID={pochaID}
          ageCheckRequired={ageCheckRequired}
          userEmail={session?.user?.email}
          underAge={underAge}
          fullname={fullname}
        />
      </Elements>
    </section>
  );
}
