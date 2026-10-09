import { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "UMich KISA | Website CMS" },
  description:
    "Admin page for KISA website content — the home main banner and the board members page",
};

export default function WebsiteCmsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
