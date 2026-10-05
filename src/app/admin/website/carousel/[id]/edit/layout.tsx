import { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "UMich KISA | 캐러셀 항목 수정" },
  description: "Admin page for the KISA home carousel — edit an item",
};

export default function EditCarouselItemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
