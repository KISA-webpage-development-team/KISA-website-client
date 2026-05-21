import React from "react";
import Link from "next/link";
import type { SimpleCourse } from "@/types/course";

type CourseHeaderProps = {
  course: SimpleCourse;
};

export default function CourseHeader({ course }: CourseHeaderProps) {
  const ratingDisplay = course.averageProfessorRating.toFixed(1);

  return (
    <div className="flex flex-col gap-2">
      <Link href="/courses" className="text-sm text-gray-400 hover:text-michigan-blue">
        &larr; 목록으로
      </Link>
      <h1 className="text-2xl font-bold text-michigan-blue">{course.code}</h1>
      <p className="text-sm text-gray-600">
        {course.name} · {course.department}
      </p>
      <div className="flex items-center gap-3">
        <span className="inline-block rounded-full bg-michigan-maize px-2.5 py-0.5 text-sm font-bold text-michigan-blue">
          ★ {ratingDisplay}
        </span>
        <span className="text-sm text-gray-400">리뷰 {course.reviewCount}개</span>
      </div>
    </div>
  );
}
