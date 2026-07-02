import React from "react";
import Link from "next/link";
import type { SimpleCourse } from "@/types/course";

type CourseCardProps = {
  course: SimpleCourse;
};

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link
      href={`/courses/${encodeURIComponent(course.code)}`}
      className="block rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="mb-1 text-base font-bold text-michigan-blue">
        {course.code}
      </div>
      <div className="mb-1 line-clamp-1 text-sm text-gray-600">
        {course.name}
      </div>
      <div className="text-xs text-gray-400">
        {course.department} · 리뷰 {course.reviewCount}개
      </div>
    </Link>
  );
}
