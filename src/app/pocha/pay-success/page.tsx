"use client";

import { notifyPayResult } from "@/apis/pocha/mutations";
import { UserSession } from "@/lib/next-auth/types";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function PaySuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pochaID = parseInt(searchParams.get("pochaid"));
  const paymentIntent = searchParams.get("payment_intent");

  const { data: session, status } = useSession() as {
    data: UserSession | undefined;
    status: string;
  };

  useEffect(() => {
    // Add a new entry to prevent direct back navigation
    window.history.pushState({ from: "pay-success" }, "", window.location.href);

    // Handle the popstate (back/forward button) event
    const handlePopState = () => {
      // Navigate to /pocha instead of going back
      router.replace("/pocha");
    };

    window.addEventListener("popstate", handlePopState);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const directToMenuList = () => {
    router.push("/pocha");
  };

  const directToOrders = () => {
    router.push("/pocha?tab=orders");
  };

  if (!paymentIntent) {
    // [TODO] better handling
    window.location.href = "/pocha";
  }

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <button onClick={directToMenuList}>X</button>
        <p className="flex-grow text-center text-lg font-bold mr-3">주문완료</p>
      </div>
      <span className="flex flex-col text-center items-center">
        접수대기 중!<br></br> 가게에서 주문을 확인 중입니다.
      </span>
      <div>
        <button
          className="w-full flex justify-center mt-4 bg-blue-500 text-white px-4 py-2 font-semibold"
          onClick={directToOrders}
        >
          주문내역 보기
        </button>
        <button
          className="w-full flex justify-center"
          onClick={directToMenuList}
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}
