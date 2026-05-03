"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  IconButton,
  Skeleton,
  StatusView,
  Button,
} from "@umichkisa-ds/web";

import EmptyCartAlert from "@/features/pocha/components/cart/EmptyCartAlert";
import CartList from "@/features/pocha/components/cart/CartList";
import CartTotalSummary from "@/features/pocha/components/cart/CartTotalSummary";
import ProceedToPaymentButton from "@/features/pocha/components/cart/ProceedToPaymentButton";

import usePochaID from "@/features/pocha/hooks/usePochaID";
import useCart from "@/features/pocha/hooks/useCart";
import { useAuth } from "@/lib/auth/authContext";

function CartPageHeader() {
  const router = useRouter();

  return (
    <header className="relative flex items-center justify-center py-3">
      <IconButton
        icon="chevron-left"
        aria-label="Back"
        size="md"
        variant="tertiary"
        onClick={() => router.back()}
        className="absolute left-2"
      />
      <h1 className="type-h3 text-foreground">Cart</h1>
    </header>
  );
}

function CartPageSkeleton() {
  return (
    <Container
      as="section"
      size="sm"
      className="flex flex-col min-h-screen !gap-0"
    >
      <div className="relative flex items-center justify-center py-3">
        <Skeleton className="h-6 w-16" />
      </div>
      <div className="flex flex-col divide-y divide-border">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className="flex items-center gap-3 py-4">
            <Skeleton variant="rectangular" className="h-20 w-20 rounded-md" />
            <div className="flex flex-col gap-2 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/3" />
            </div>
            <Skeleton className="h-8 w-24 rounded-md" />
          </div>
        ))}
      </div>
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface px-4 pt-3"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 0.75rem)" }}
      >
        <Skeleton className="h-12 w-full rounded-md" />
      </div>
    </Container>
  );
}

export default function PochaCartPage() {
  const { session } = useAuth();

  const {
    pochaID,
    status: pochaIDStatus,
    error: pochaIDError,
    noPocha,
  } = usePochaID();

  const {
    cart,
    status: cartStatus,
    error: cartError,
    totalAmount,
    handleQuantityChange,
    fetchCart,
  } = useCart(session?.user?.email, pochaID);

  // Short-circuit before the loading check — useCart stalls on null pochaID,
  // so the page would otherwise spin forever when there is no ongoing pocha.
  if (noPocha) {
    return (
      <StatusView
        fullScreen
        variant="not-found"
        icon="calendar"
        title="No pocha in progress"
        description="다음 포차가 시작되면 장바구니를 사용할 수 있습니다."
      />
    );
  }

  if (pochaIDStatus === "loading" || cartStatus === "loading") {
    return <CartPageSkeleton />;
  }

  if (pochaIDStatus === "error" || cartStatus === "error") {
    return (
      <Container
        as="section"
        size="sm"
        className="flex flex-col min-h-screen !gap-0"
      >
        <CartPageHeader />
        <StatusView
          variant="error"
          title="Could not load cart"
          description={pochaIDError || cartError || "Please try again."}
          action={
            <Button variant="primary" onClick={() => fetchCart()}>
              Retry
            </Button>
          }
        />
      </Container>
    );
  }

  const isEmpty = !cart || Object.keys(cart).length === 0;

  return (
    <Container
      as="section"
      size="sm"
      className="flex flex-col min-h-screen !gap-0"
    >
      <CartPageHeader />

      {isEmpty ? (
        <EmptyCartAlert />
      ) : (
        <>
          <div className="flex-grow pb-40">
            <CartList cart={cart} handleQuantityChange={handleQuantityChange} />
          </div>
          <div
            className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface px-4 pt-3 flex flex-col gap-3"
            style={{
              paddingBottom: "calc(env(safe-area-inset-bottom) + 0.75rem)",
            }}
          >
            <CartTotalSummary totalAmount={totalAmount} />
            <ProceedToPaymentButton pochaid={pochaID} />
          </div>
        </>
      )}
    </Container>
  );
}
