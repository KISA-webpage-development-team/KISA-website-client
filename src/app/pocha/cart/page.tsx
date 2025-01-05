"use client";

import React from "react";
import { getUserCart, getPochaInfo } from "@/apis/pocha/queries";
import { LoadingSpinner } from "@/final_refactor_src/components/feedback";
import { Cart, PochaInfo } from "@/types/pocha";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { UserSession } from "@/lib/next-auth/types";
import CartListItem from "@/features/pocha/components/pay-cart/CartListItem";
import ProceedToPaymentButton from "@/features/pocha/components/pay-cart/ProceedToPaymentButton";
import Image from "next/image";

import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "@/utils/fonts/textFonts";
import BackIcon from "@/final_refactor_src/components/icon/BackIcon";
import cartToAmount from "@/features/pocha/utils/cartToAmount";
import { ApiError } from "@/lib/axios/types";

export default function PochaCartPage() {
  // cart: variable | setCart: function to set variable
  // setCart({ dfjiaosdjif }) -> cart = { dfjiaosdjif }

  const { data: session, status: sessionStatus } = useSession() as {
    data: UserSession | undefined;
    status: string;
  };

  const router = useRouter();

  const searchParams = useSearchParams();
  const urlPochaID = parseInt(searchParams.get("pochaid"));

  const [cart, setCart] = useState<Cart>();
  const [cartItemStale, setCartItemStale] = useState<boolean>(true);

  const [pochaID, setPochaID] = useState<number>(urlPochaID);
  const [pochaIDError, setPochaIDError] = useState<ApiError>();

  // fetch initial cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const email = session?.user?.email;
        if (!email || !pochaID) {
          console.log("email or pochaid not found");
        }

        // const response = await getUserCart(email, pochaid);
        const response = await getUserCart(email, pochaID);
        setCart(response);

        // check whether the cart has immediate prep

        setCartItemStale(false);
      } catch (error) {
        console.error(
          "[PochaCartPage] error while fetching user's cart",
          error
        );
      }
    };

    if (session && pochaID && cartItemStale) {
      fetchCart();
    }
  }, [session, pochaID, cartItemStale]);

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

  // Button handlers
  const handleBackButton = () => {
    router.back();
  };

  if (sessionStatus === "loading" || !cart) {
    return <LoadingSpinner />;
  }

  return (
    <section className="py-3">
      <div className="flex items-center relative">
        <button className="flex" onClick={handleBackButton}>
          <BackIcon />
        </button>
        <h1
          className={`${sejongHospitalBold.className} text-2xl text-blue-950
          absolute top-0 left-0 w-full flex justify-center -z-10`}
        >
          Cart
        </h1>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="375"
        height="4"
        viewBox="0 0 375 4"
        fill="none"
        className="mx-auto mt-1"
      >
        <path
          d="M0 2L375 2"
          stroke="#E3E3E3"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

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
          <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300">
            {/* Total Price */}
            <div
              className={`flex justify-between w-full px-4 py-2 ${sejongHospitalBold.className} text-lg`}
            >
              <span className="text-blue-950 pb-3 pt-1">Total</span>
              <span className="text-blue-950 pb-3 pt-1">
                ${cartToAmount(cart)}
              </span>
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
