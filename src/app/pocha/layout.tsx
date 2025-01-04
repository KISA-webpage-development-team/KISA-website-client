"use client";

import { SWRTokenProvider } from "@/lib/swr/providers";
import { SessionProvider } from "next-auth/react";

export default function PochaLayout({ children }) {
  return (
    <SWRTokenProvider>
      <SessionProvider>{children}</SessionProvider>
    </SWRTokenProvider>
  );
}
