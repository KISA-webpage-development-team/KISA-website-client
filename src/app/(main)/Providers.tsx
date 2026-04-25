"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { AuthContextProvider, type AppSession } from "@/lib/auth/authContext";

export default function Providers({
  session,
  children,
}: {
  session: Session | null;
  children: ReactNode;
}) {
  return (
    <SessionProvider session={session}>
      <AuthContextProvider initialSession={session as AppSession | null}>
        {children}
      </AuthContextProvider>
    </SessionProvider>
  );
}
