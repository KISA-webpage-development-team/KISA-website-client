"use client";

import PayCartContext from "@/features/pocha/hooks/usePayCart";
import { SessionProvider } from "next-auth/react";

export default function PochaLayout({ children }) {
  return (
    <SessionProvider>
      <PayCartContext>{children}</PayCartContext>
    </SessionProvider>
  );
}
