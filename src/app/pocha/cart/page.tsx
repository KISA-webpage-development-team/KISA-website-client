"use client";

import React from "react";
import { getUserCartMock, getUserCart } from "@/apis/pocha/queries";
import { LoadingSpinner } from "@/final_refactor_src/components/feedback";
import { Cart } from "@/types/pocha";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getSession } from "@/lib/next-auth/getSession";
import { useSession } from "next-auth/react";
import { UserSession } from "@/lib/next-auth/types";
import CartListItem from "@/features/pocha/components/cart/CartListItem";

export default function PochaCartPage() {
  // cart: variable | setCart: function to set variable
  // setCart({ dfjiaosdjif }) -> cart = { dfjiaosdjif }

  const { data: session, status } = useSession() as {
    data: UserSession | undefined;
    status: string;
  };
  const email = session?.user.email;

  const searchParams = useSearchParams();
  const router = useRouter();
  const pochaid = parseInt(searchParams.get("pochaid"));

  const [cart, setCart] = useState<Cart>(undefined);
  const [cartItemStale, setCartItemStale] = useState<boolean>(true);

  // fetch initial cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!email || !pochaid) {
          console.log("email or pochaid not found");
        }

        // const response = await getUserCart(email, pochaid);
        const response = await getUserCartMock(email, pochaid);
        setCart(response);
        setCartItemStale(false);
        console.log("Cart: ", response);
      } catch (error) {
        console.error(
          "[PochaCartPage] error while fetching user's cart",
          error
        );
      }
    };
    if (cartItemStale) {
      fetchCart();
    }
  }, [email, pochaid, cartItemStale]);

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
    return Array.from(cart?.values())
      .reduce((sum, item) => sum + item.menu.price * item.quantity, 0)
      .toFixed(2);
  };

  // Button handlers
  const handleBackButton = () => {
    router.push("/pocha");
  };

  // Implementation needed.
  const handleCheckout = () => {
    router.push("/pocha/pay");
  };

  if (!cart) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <button className="flex" onClick={handleBackButton}>
        Go Back
      </button>

      {/* Cart List */}
      <ul className="flex flex-col gap-2">
        {Array.from(cart.entries()).map(([menuid, item]) => (
          <CartListItem
            key={menuid}
            menuid={menuid}
            item={item}
            email={email}
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
    </div>
  );
}
