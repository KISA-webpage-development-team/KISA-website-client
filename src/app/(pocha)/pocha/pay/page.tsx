"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { useAuth } from "@/lib/auth/authContext";

// Stripe
import { Elements } from "@stripe/react-stripe-js"; // stripe payment element
import stripePromise from "@/lib/stripe/stripeClient";
import convertToSubcurrency from "@/lib/stripe/convertToSubcurrency";

import { useRouter } from "next/navigation";
import usePay from "@/features/pocha/hooks/usePay";
import { Container, Skeleton, StatusView } from "@umichkisa-ds/web";
import usePochaID from "@/features/pocha/hooks/usePochaID";
import BackHeader from "@/features/pocha/components/shared/BackHeader";
import useUserAge from "@/features/pocha/hooks/useUserAge";

const PaymentSubmitForm = dynamic(
  () => import("@/features/pocha/components/pay/PaymentSubmitForm"),
  { ssr: false }
);

function PayPageSkeleton() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:rounded-md focus-visible:bg-surface focus-visible:px-4 focus-visible:py-2 focus-visible:type-label focus-visible:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary"
      >
        Skip to main content
      </a>
      <Container
        as="main"
        id="main-content"
        size="sm"
        className="flex flex-col min-h-screen"
      >
        <div className="relative flex items-center justify-center py-3">
        <Skeleton className="h-6 w-16" />
      </div>

      <div className="flex flex-col gap-6 px-4 pt-4 pb-32">
        {/* Stripe region block */}
        <Skeleton variant="rectangular" className="h-64 w-full rounded-md" />

        {/* Summary rows */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-12" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-12" />
          </div>
          <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>

        {/* Footnote */}
        <Skeleton className="h-3 w-3/4" />
      </div>

      {/* Sticky button placeholder */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface px-4 pt-3"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 0.75rem)" }}
      >
        <Skeleton className="h-12 w-full rounded-md" />
      </div>
    </Container>
    </>
  );
}

export default function PayPage() {
  const { session } = useAuth();

  const router = useRouter();

  const {
    pochaID,
    status: pochaIDStatus,
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

  const elementsOptions = useMemo(
    () => ({
      mode: "payment" as const,
      amount: totalPrice ? convertToSubcurrency(totalPrice) : 0,
      currency: "usd",
      setup_future_usage: "off_session" as const,
    }),
    [totalPrice]
  );

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
        title="No pocha in progress"
        description="다음 포차가 시작되면 결제를 진행할 수 있습니다."
      />
    );
  }

  if (isLoading) return <PayPageSkeleton />;
  if (hasError) {
    router.push("/pocha");
    return null;
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:rounded-md focus-visible:bg-surface focus-visible:px-4 focus-visible:py-2 focus-visible:type-label focus-visible:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary"
      >
        Skip to main content
      </a>
      <Container
        as="main"
        id="main-content"
        size="sm"
        className="flex flex-col min-h-screen"
      >
      <BackHeader title="Pay" />

      <Elements stripe={stripePromise} options={elementsOptions}>
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
      </Container>
    </>
  );
}
