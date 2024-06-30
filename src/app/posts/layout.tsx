import { ReactNode } from "react";
import { SWRTokenProvider } from "../../context/SWRProvider";
import "./posts.css";

interface LayoutProps {
  children: ReactNode;
}

export default async function PostLayout({ children }: LayoutProps) {
  return <SWRTokenProvider>{children}</SWRTokenProvider>;
}
