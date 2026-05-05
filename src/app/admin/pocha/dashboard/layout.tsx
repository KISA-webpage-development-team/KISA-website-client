import { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "UMich KISA | 포차 대시보드" },
  description: "Admin dashboard for KISA pocha — orders, stock, and history",
};

export default function PochaDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
