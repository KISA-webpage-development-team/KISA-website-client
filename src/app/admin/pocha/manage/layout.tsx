import { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "UMich KISA | 포차 관리" },
  description: "Admin page for KISA pocha — manage pocha info and menus",
};

export default function PochaManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
