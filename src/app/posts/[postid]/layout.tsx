import { ReactNode } from "react";
import { SWRProvider } from "@/final_refactor_src/lib/swr/providers";

interface LayoutProps {
  children: ReactNode;
}

// post-view page doesn't require token on GET API calls
export default async function PostViewLayout({ children }: LayoutProps) {
  return <SWRProvider>{children}</SWRProvider>;
}
