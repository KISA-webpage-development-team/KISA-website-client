import { Metadata } from "next";

export const metadata: Metadata = {
  title: "취업 공고",
  description: "New-grad and internship job postings for international students",
};

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
