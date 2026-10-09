import { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "UMich KISA | 멤버 관리" },
  description:
    "Admin page for the KISA board members page — manage board years, entries and their order",
};

export default function MembersAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
