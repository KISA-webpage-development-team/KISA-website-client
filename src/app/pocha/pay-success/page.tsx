"use client";

import { updateCartIsPaidMock } from "@/apis/pocha/mutations";
import { UserSession } from "@/lib/next-auth/types";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function PaySuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pochaID = parseInt(searchParams.get("pochaid"));

  const { data: session, status } = useSession() as {
    data: UserSession | undefined;
    status: string;
  };

  useEffect(() => {
    // send update isPaid order API
    const changeCartToPaid = async () => {
      try {
        const res = await updateCartIsPaidMock(session?.user?.email, pochaID);

        if (!res) {
          console.error("Error while updating cart status");
          // THIS SHOULD BE HANDLED BETTER
        }

        console.log("success");
      } catch (error) {
        console.error("Error while updating cart status", error);

        // THIS SHOULD BE HANDLED BETTER
      }
    };

    if (session && pochaID) {
      changeCartToPaid();
    }
  }, [session, pochaID]);

  const directToMenuList = () => {
    router.push("/pocha");
  };

  const directToOrders = () => {
    router.push("/pocha?tab=orders");
  };

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
