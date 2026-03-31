import { Metadata } from "next";

export const metadata: Metadata = {
  title: "취업 공고",
  description: "해외 대학교 유학생을 위한 신입/인턴십 취업 공고",
};

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
