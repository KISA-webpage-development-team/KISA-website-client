"use client";

import { SessionProvider } from "next-auth/react";

export default function PochaLayout({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
