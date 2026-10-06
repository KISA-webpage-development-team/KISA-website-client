import type { Metadata } from "next";
import CourseEvaluationsView from "@/features/course-evaluations/CourseEvaluationsView";

export const metadata: Metadata = {
  title: "Course Evaluations",
  description:
    "KISA-collected course evaluations for University of Michigan students.",
};

export default function CourseEvaluationsPage() {
  return <CourseEvaluationsView />;
}
