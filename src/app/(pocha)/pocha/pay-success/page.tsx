"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Container, Icon } from "@umichkisa-ds/web";

export default function PaySuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pochaID = searchParams.get("pochaid");
  const amount = searchParams.get("amount");

  // Redirect guard: required URL params missing.
  useEffect(() => {
    if (!pochaID || !amount) {
      router.replace("/pocha");
    }
  }, [pochaID, amount, router]);

  // Back-navigation guard: this is a terminal screen — intercept the back
  // button and route to the pocha home instead of the previous pay flow.
  useEffect(() => {
    window.history.pushState({ from: "pay-success" }, "", window.location.href);

    const handlePopState = () => {
      router.replace("/pocha");
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

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
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-8">
          <div className="text-success">
            <Icon name="circle-check" size="xl" />
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="type-h1 text-foreground">Payment complete</h1>
            <p className="type-body text-foreground">
              Your order is being prepared.
            </p>
          </div>
          <div className="flex w-full flex-col gap-4 pt-2">
            <Button
              variant="primary"
              className="w-full"
              onClick={() => router.push("/pocha?tab=orders")}
            >
              View orders
            </Button>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => router.push("/pocha")}
            >
              Order more
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
