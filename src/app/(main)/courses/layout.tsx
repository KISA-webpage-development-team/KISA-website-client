import { Metadata } from "next";
import { SWRProvider } from "@/lib/swr/providers";

export const metadata: Metadata = {
  title: "강의평",
  description: "미시간 대학교 한인 학생들의 솔직한 강의 후기를 확인하세요.",
};

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return <SWRProvider>{children}</SWRProvider>;
}
