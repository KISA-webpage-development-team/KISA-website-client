import { Metadata } from "next";
import { ReactNode } from "react";
import AdminLayoutClient from "./AdminLayoutClient";

export const metadata: Metadata = {
  title: "Admin",
  description:
    "KISA 관리자 허브 — 포차 운영, 회원 관리, 콘텐츠 도구를 한 곳에서.",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
