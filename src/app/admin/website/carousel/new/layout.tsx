import { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "UMich KISA | 배너 추가" },
  description:
    "Admin page for the KISA home carousel — create an item, or start from an archived one",
};

export default function NewCarouselItemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
