"use client";

import { ReactNode } from "react";
import { SWRTokenProvider } from "@/lib/swr/providers";
import "./posts.css";
import { SessionProvider } from "next-auth/react";

interface LayoutProps {
  children: ReactNode;
}

export default function PostLayout({ children }: LayoutProps) {
  return (
    <SWRTokenProvider>
      <SessionProvider>{children}</SessionProvider>
    </SWRTokenProvider>
  );
}
