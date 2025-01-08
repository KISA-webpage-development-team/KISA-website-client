"use client";

import { UserSession } from "@/lib/next-auth/types";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "@/utils/fonts/textFonts";
import React, { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";

export default function PaySuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pochaID = parseInt(searchParams.get("pochaid"));
  const paymentIntent = searchParams.get("payment_intent");
  const [menuClicked, setMenuClicked] = useState(false);
  const [homeClicked, setHomeClicked] = useState(false);

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
  }, [router]);

  const directToMenuList = () => {
    setHomeClicked(true);
    setTimeout(() => {
      router.push("/pocha");
    }, 150);
  };

  const directToOrders = () => {
    setMenuClicked(true);
    setTimeout(() => {
      router.push("/pocha?tab=orders");
    }, 150);
  };

  if (!paymentIntent) {
    // [TODO] better handling
    window.location.href = "/pocha";
  }

  return (
    <div className="">
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex flex-col items-center gap-14">
          <div
            className={`${sejongHospitalBold.className} text-center text-black text-[30px]`}
          >
            결제가 완료되었습니다
          </div>
          <div>
            <Image
              src={`/images/check_circle.png`}
              alt="Success Icon"
              width={250}
              height={250}
            />
          </div>
          <div className="flex flex-col items-center gap-4">
            <button
              className={`w-[297px] h-[55px] rounded-lg text-white text-lg ${
                menuClicked ? "bg-blue-900" : "bg-cyan-600"
              }
               justify-between items-center
                ${sejongHospitalBold.className}
              `}
              onClick={directToOrders}
            >
              주문 내역 보기
            </button>
            <button
              className={`w-[297px] h-[55px] rounded-lg text-white text-lg ${
                homeClicked ? "bg-blue-900" : "bg-cyan-600"
              }
               justify-between items-center
                ${sejongHospitalBold.className}
              `}
              onClick={directToMenuList}
            >
              홈으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
