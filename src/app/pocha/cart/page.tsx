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
      const res = await getPochaInfo(new Date());

      if ((res as ApiError)?.statusCode) {
        setPochaIDError(res as ApiError);
      } else {
        setPochaID((res as PochaInfo)?.pochaID);
        // update URL search params with the fetched pochaID
        const params = new URLSearchParams(window.location.search);
        params.set("pochaid", (res as PochaInfo).pochaID.toString());
        window.history.replaceState({}, "", `?${params.toString()}`);
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
      <div className="flex items-center relative ">
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
        width="351"
        height="4"
        viewBox="0 0 351 4"
        fill="none"
        className="mx-auto mt-1"
      >
        <path
          d="M2 2.00003L349 2.00003"
          stroke="#E3E3E3"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {Object.keys(cart).length > 0 ? (
        <>
          {/* Cart List */}
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

          {/* Total Price */}
          <div
            className={`flex justify-between w-full ${sejongHospitalBold.className} text-lg`}
          >
            <span className={`ml-7 mt-4 text-blue-950`}>Total</span>
            <span className={`mr-7 mt-4 text-blue-950`}>
              US${cartToAmount(cart)}
            </span>
          </div>

          {/* Checkout button */}
          <ProceedToPaymentButton pochaid={pochaID} />
        </>
      ) : (
        <div
          className={`${sejongHospitalBold.className} flex w-full justify-center`}
        >
          Cart is empty!
        </div>
      )}
    </section>
  );
}
