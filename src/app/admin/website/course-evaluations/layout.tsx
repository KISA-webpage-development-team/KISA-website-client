import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "UMich KISA | Course Evaluations 관리" },
  description: "Admin page for managing KISA course evaluation content.",
};

export default function CourseEvaluationsAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
