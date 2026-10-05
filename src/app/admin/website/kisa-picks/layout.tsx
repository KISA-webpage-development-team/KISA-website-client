import { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "UMich KISA | KISA Picks 관리" },
  description: "Admin page for managing KISA Picks place content.",
};

export default function KisaPicksAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
