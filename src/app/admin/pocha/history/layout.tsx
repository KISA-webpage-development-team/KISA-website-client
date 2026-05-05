import { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "UMich KISA | 포차 기록" },
  description: "Admin page for KISA pocha — past pocha order history",
};

export default function PochaHistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
