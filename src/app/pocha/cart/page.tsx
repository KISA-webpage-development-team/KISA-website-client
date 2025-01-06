"use client";

import React from "react";
import { getUserCart, getPochaInfo } from "@/apis/pocha/queries";
import { LoadingSpinner } from "@/final_refactor_src/components/feedback";
import { Cart, PochaInfo } from "@/types/pocha";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { UserSession } from "@/lib/next-auth/types";
import CartListItem from "@/features/pocha/components/cart-pay/CartListItem";
import ProceedToPaymentButton from "@/features/pocha/components/cart-pay/ProceedToPaymentButton";
import Image from "next/image";

import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import cartToAmount from "@/features/pocha/utils/cartToAmount";
import { ApiError } from "@/lib/axios/types";

// UI
import PochaBackHeading from "@/features/pocha/components/shared/PochaBackHeading";
import PochaHorizontalDivider from "@/features/pocha/components/shared/PochaHorizontalDivider";
import useCart from "@/features/pocha/hooks/useCart";

export default function PochaCartPage() {
  const { data: session, status: sessionStatus } = useSession() as {
    data: UserSession | undefined;
    status: string;
  };

  const searchParams = useSearchParams();
  const urlPochaID = parseInt(searchParams.get("pochaid"));

  const [cartItemStale, setCartItemStale] = useState<boolean>(true);

  const [pochaID, setPochaID] = useState<number>(urlPochaID);
  const [pochaIDError, setPochaIDError] = useState<ApiError>();

  const {
    cart,
    status: cartStatus,
    error,
    totalAmount,
    handleQuantityChange,
  } = useCart(session?.user?.email, pochaID);

  // set pochaID
  // by fetching PochaID from API, ensure that the pochaID is there
  useEffect(() => {
    const fetchPochaInfo = async () => {
      // try API call first

      try {
        const res = await getPochaInfo(new Date());
        setPochaID((res as PochaInfo)?.pochaID);

        // update URL search params with the fetched pochaID
        const params = new URLSearchParams(window.location.search);
        params.set("pochaid", (res as PochaInfo).pochaID.toString());
        window.history.replaceState({}, "", `?${params.toString()}`);
      } catch (error) {
        console.error("[PochaCartPage] error while fetching pocha info", error);
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

  if (sessionStatus === "loading" || cartStatus === "loading") {
    return <LoadingSpinner />;
  }

  if (cartStatus === "error") {
    throw new Error(error || "Unexpected error occurred");
  }

  return (
    <section className="!gap-0">
      <PochaBackHeading title="Cart" />

      <PochaHorizontalDivider fullWidth />

      {Object.keys(cart).length > 0 ? (
        <div className="flex flex-col h-screen">
          {/* Cart List */}
          <div className="flex-grow overflow-y-auto">
            <ul className="flex flex-col gap-2">
              {Object.entries(cart).map(([menuid, item]) => (
                <CartListItem
                  key={menuid}
                  menuid={parseInt(menuid)}
                  item={item}
                  email={session?.user?.email}
                  pochaid={pochaID}
                  setCartItemStale={setCartItemStale}
                />
              ))}
            </ul>
          </div>
          <div className="fixed bottom-0 left-0 w-full bg-white">
            <PochaHorizontalDivider />
            {/* Total Price */}
            <div
              className={`flex justify-between w-full px-4 py-2 ${sejongHospitalBold.className} text-lg`}
            >
              <span className="text-blue-950 pb-3 pt-1">Total</span>
              <span className="text-blue-950 pb-3 pt-1">${totalAmount}</span>
            </div>

            {/* Checkout Button */}
            <div className="w-full flex justify-center pb-2">
              <ProceedToPaymentButton pochaid={pochaID} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <Image
            src={`/images/empty_cart.png`}
            alt="Empty Cart Icon"
            width={300}
            height={300}
          />
          <div className={`${sejongHospitalBold.className} text-center mt-4`}>
            Your Cart is Empty
          </div>
        </div>
      )}
    </section>
  );
}
