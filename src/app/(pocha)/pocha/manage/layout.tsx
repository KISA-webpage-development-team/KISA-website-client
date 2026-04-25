import { Metadata } from "next";

export const metadata: Metadata = {
  title: "포차 관리",
  description: "KISA 포차 운영진을 위한 포차 정보 및 메뉴 관리 페이지",
};

export default function PochaManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
