import React from "react";
import { getUserCartMock, getUserCart } from "@/apis/pocha/queries";
import { LoadingSpinner } from "@/final_refactor_src/components/feedback";
import { Cart } from "@/types/pocha";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PochaCartPage() {
  // cart: variable | setCart: function to set variable
  // setCart({ dfjiaosdjif }) -> cart = { dfjiaosdjif }

  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const pochaid = parseInt(searchParams.get("pochaid"));

  const [cart, setCart] = useState<Cart>(undefined);

  // fetch initial cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!email || !pochaid) {
          console.log("error");
        }

        // const response = await getUserCart(email, pochaid);
        const response = await getUserCartMock(email, pochaid);
        setCart(response);
        console.log("Cart: ", response);
      } catch (error) {
        console.error(
          "[PochaCartPage] error while fetching user's cart",
          error
        );
      }
    };
    fetchCart();
  }, [email, pochaid]);

  // Calculate total price with cart
  const getTotalPrice = () => {
    return Array.from(cart.values())
      .reduce((sum, item) => sum + item.menu.price * item.quantity, 0)
      .toFixed(2);
  };

  // Button handlers
  const handleBackButton = () => {
    setOpenCartPage(false);
  };

  const handleCheckout = () => {
    console.log("Checkout");
  };

  if (!cart) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <button className="flex" onClick={handleBackButton}>
        Go Back
      </button>

      {/* cart (dict) -> menu item들을 list */}
      <ul className="flex flex-col gap-2">
        {Array.from(cart.entries()).map(([menuid, item]) => (
          <li key={menuid} className="flex flex-col">
            <span>{item.menu.nameEng}</span>
            <span>Quantity: {item.quantity}</span>
            <span className="font-bold">
              Price: ${item.menu.price * item.quantity}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between w-full">
        <span className="font-bold">총 주문금액</span>
        <span className="">${getTotalPrice()}</span>
      </div>

      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}
