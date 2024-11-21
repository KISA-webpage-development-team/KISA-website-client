"use client";

import { getUser } from "@/apis/users/queries";
import { UserSession } from "@/lib/next-auth/types";
import { useSession } from "next-auth/react";
// Custom hook to handle payment logic

import { createContext, useContext, useState, useEffect } from "react";

export const payCartContext = createContext({
  amount: undefined,
  setAmount: (amount: number) => {},
  hasImmediatePrep: undefined,
  setHasImmediatePrep: (hasImmediatePrep: boolean) => {},
  fee: undefined,
  totalPrice: undefined,
});

// export const authContext = createContext({
//   loggedInUserId: null,
//   setLoggedInUserId: () => {},
// });

export default function PayCartContext({ children }) {
  const { data: session, status: sessionStatus } = useSession() as {
    data: UserSession | null;
    status: string;
  };

  const [amount, setAmount] = useState<number>();
  const [hasImmediatePrep, setHasImmediatePrep] = useState<boolean>(false);
  const [userAge, setUserAge] = useState<number>();

  const [status, setStatus] = useState<string>("loading");

  const fee = parseFloat((0.3 + amount * 0.029).toFixed(2)); // transaction fee
  const totalPrice = amount + fee;

  // fetch user's age
  useEffect(() => {
    const fetchUserAge = async () => {
      try {
        const res = await getUser(session?.user.email, session?.token);

        console.log(res);
      } catch (error) {
        console.error("Error while fetching user's age", error);
        setStatus("error");
      }
    };

    if (session) {
      fetchUserAge();
    }
  }, [session]);

  return (
    <payCartContext.Provider
      value={{
        amount,
        setAmount,
        hasImmediatePrep,
        setHasImmediatePrep,
        fee,
        totalPrice,
      }}
    >
      {children}
    </payCartContext.Provider>
  );
}

export const usePayCart = () => useContext(payCartContext);
