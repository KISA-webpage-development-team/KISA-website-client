import { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "UMich KISA | 메인 배너 관리" },
  description:
    "Admin page for the KISA home carousel — manage, reorder and archive items",
};

export default function CarouselAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
