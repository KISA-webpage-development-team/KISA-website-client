"use client";
// Custom hook to handle payment logic

import { createContext, useContext, useState, useEffect } from "react";

export const payCartContext = createContext({
  amount: undefined,
  setAmount: (amount: number) => {},
  hasImmediatePrep: undefined,
  setHasImmediatePrep: (hasImmediatePrep: boolean) => {},
  fee: undefined,
  totalPrice: undefined,
  pochaID: undefined,
  setPochaID: (pochaID: number) => {},
});

export default function PayCartContext({ children }) {
  const [amount, setAmount] = useState<number>();
  const [hasImmediatePrep, setHasImmediatePrep] = useState<boolean>(false);
  const [pochaID, setPochaID] = useState<number>();

  const [status, setStatus] = useState<string>("loading");

  const fee = parseFloat((0.3 + amount * 0.029).toFixed(2)); // transaction fee
  const totalPrice = amount + fee;

  return (
    <payCartContext.Provider
      value={{
        amount,
        setAmount,
        hasImmediatePrep,
        setHasImmediatePrep,
        fee,
        totalPrice,
        pochaID,
        setPochaID,
      }}
    >
      {children}
    </payCartContext.Provider>
  );
}

export const usePayCart = () => useContext(payCartContext);
