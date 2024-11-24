"use client";

import React from "react";
import {
  getUserCartMock,
  getUserCart,
  getPochaInfo,
} from "@/apis/pocha/queries";
import { LoadingSpinner } from "@/final_refactor_src/components/feedback";
import { Cart } from "@/types/pocha";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getSession } from "@/lib/next-auth/getSession";
import { useSession } from "next-auth/react";
import { UserSession } from "@/lib/next-auth/types";
import CartListItem from "@/features/pocha/components/pay-cart/CartListItem";
import { usePayCart } from "@/features/pocha/hooks/usePayCart";

export default function PochaCartPage() {
  // cart: variable | setCart: function to set variable
  // setCart({ dfjiaosdjif }) -> cart = { dfjiaosdjif }

  const { data: session, status } = useSession() as {
    data: UserSession | undefined;
    status: string;
  };

  const { setAmount, setHasImmediatePrep, setPochaID } = usePayCart();

  const searchParams = useSearchParams();
  const router = useRouter();
  const pochaid = parseInt(searchParams.get("pochaid"));

  const [cart, setCart] = useState<Cart>();
  const [cartItemStale, setCartItemStale] = useState<boolean>(true);

  // fetch initial cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const email = session?.user?.email;
        if (!email || !pochaid) {
          console.log("email or pochaid not found");
        }

        // const response = await getUserCart(email, pochaid);
        const response = await getUserCart(email, pochaid);
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

    const checkImmediatePrep = () => {
      const hasImmediatePrep = Object.values(cart).some(
        (item) => item.menu.isImmediatePrep
      );

      setHasImmediatePrep(hasImmediatePrep);
    };

    if (session && cartItemStale) {
      fetchCart();
    }

    if (cart !== undefined && Object.keys(cart).length > 0) {
      checkImmediatePrep();
    }
  }, [session, pochaid, cartItemStale, setHasImmediatePrep, cart]);

  // keep track of total price
  useEffect(() => {
    setAmount(parseFloat(getTotalPrice()));
  }, [cart]);

  // set pochaID
  // by fetching PochaID from API, ensure that the pochaID is there
  useEffect(() => {
    const fetchPochaInfo = async () => {
      // try API call first
      try {
        const res = await getPochaInfo(new Date());
        setPochaID(res?.pochaID);
      } catch (error) {
        console.error("Error fetching like status: ", error);
      }
    };

    if (pochaid === undefined) {
      // need to fetch
      fetchPochaInfo();
    } else {
      setPochaID(pochaid);
    }
  }, [pochaid, setPochaID]);

  //   // Calculate total price with cart
  //   useEffect(() => {
  //     if (cart) {
  //       const newTotalPrice = Array.from(cart.values())
  //         .reduce((sum, item) => sum + item.menu.price * item.quantity, 0)
  //         .toFixed(2);
  //       setTotalPrice(parseFloat(newTotalPrice));
  //     }
  //   }, [cart]);

  // Because price at that time is brought using API call, can directly access from cart.
  const getTotalPrice = () => {
    if (!cart) return 0;

    return Array.from(Object.values(cart))
      .reduce((total, item) => total + item.menu.price * item.quantity, 0)
      .toFixed(2);
  };

  // Button handlers
  const handleBackButton = () => {
    router.back();
  };

  const handleCheckout = () => {
    setAmount(parseFloat(getTotalPrice()));
    router.push("/pocha/pay");
  };

  if (!pochaid || !cart) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <button className="flex" onClick={handleBackButton}>
        Go Back
      </button>

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
                pochaid={pochaid}
                setCartItemStale={setCartItemStale}
              />
            ))}
          </ul>

          {/* Total Price */}
          <div className="flex justify-between w-full">
            <span className="font-bold">총 주문금액</span>
            <span className="">${getTotalPrice()}</span>
          </div>

          {/* Checkout button */}
          <button onClick={handleCheckout}>Checkout</button>
        </>
      ) : (
        <div>Cart is empty</div>
      )}
    </div>
  );
}
