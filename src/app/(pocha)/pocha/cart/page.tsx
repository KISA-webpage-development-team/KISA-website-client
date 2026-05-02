"use client";

// UI
import PochaBackHeading from "@/features/pocha/components/shared/PochaBackHeading";
import PochaHorizontalDivider from "@/features/pocha/components/shared/PochaHorizontalDivider";
import EmptyCartAlert from "@/features/pocha/components/cart/EmptyCartAlert";
import CartList from "@/features/pocha/components/cart/CartList";
import CartTotalSummary from "@/features/pocha/components/cart/CartTotalSummary";
import { LoadingSpinner } from "@/components/ui/feedback";
import ProceedToPaymentButton from "@/features/pocha/components/cart/ProceedToPaymentButton";
import { StatusView } from "@umichkisa-ds/web";

// hooks
import usePochaID from "@/features/pocha/hooks/usePochaID";
import useCart from "@/features/pocha/hooks/useCart";
import { useSession } from "next-auth/react";

// types
import { UserSession } from "@/lib/next-auth/types";

export default function PochaCartPage() {
  const { data: session, status: sessionStatus } = useSession() as {
    data: UserSession | undefined;
    status: string;
  };

  // get pochaID from URL or API to use in cart
  const {
    pochaID,
    status: pochaIDStatus,
    error: pochaIDError,
    noPocha,
  } = usePochaID();

  // get cart items and total amount
  const {
    cart,
    status: cartStatus,
    error: cartError,
    totalAmount,
    handleQuantityChange,
  } = useCart(session?.user?.email, pochaID);

  // Short-circuit before the loading check — useCart stalls on null pochaID,
  // so the page would otherwise spin forever when there is no ongoing pocha.
  if (noPocha) {
    return (
      <StatusView
        fullScreen
        variant="not-found"
        icon="calendar"
        title="진행 중인 포차가 없습니다"
        description="다음 포차가 시작되면 장바구니를 사용할 수 있습니다."
      />
    );
  }

  if (
    sessionStatus === "loading" ||
    pochaIDStatus === "loading" ||
    cartStatus === "loading"
  ) {
    return <LoadingSpinner />;
  }

  if (pochaIDStatus === "error" || cartStatus === "error") {
    throw new Error(pochaIDError || cartError || "Unexpected error occurred");
  }

  return (
    <section className="flex flex-col w-full min-h-screen !gap-0">
      <PochaBackHeading title="Cart" />
      <PochaHorizontalDivider />

      {Object.keys(cart)?.length === 0 ? (
        <EmptyCartAlert />
      ) : (
        <>
          <div className="flex-grow">
            <CartList cart={cart} handleQuantityChange={handleQuantityChange} />
          </div>
          <div
            className="sticky bottom-0 self-stretch w-full
           bg-white pb-4 gap-2 z-50"
          >
            <PochaHorizontalDivider />
            <CartTotalSummary totalAmount={totalAmount} />
            <ProceedToPaymentButton pochaid={pochaID} />
          </div>
        </>
      )}
    </section>
  );
}
