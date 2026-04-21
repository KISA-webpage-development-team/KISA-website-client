"use client";

import { ReactNode } from "react";
import { SWRProvider } from "@/lib/swr/providers";
import { SessionProvider } from "next-auth/react";
interface LayoutProps {
  children: ReactNode;
}

// post-view page doesn't require token on GET API calls
export default function PostViewLayout({ children }: LayoutProps) {
  return (
    <SWRProvider>
      <SessionProvider>{children}</SessionProvider>
    </SWRProvider>
  );
}
