import React from "react";
import type { SimpleCourse } from "@/types/course";

type CourseHeaderProps = {
  course: SimpleCourse;
};

export default function CourseHeader({ course }: CourseHeaderProps) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold text-michigan-blue">{course.code}</h1>
      <p className="text-sm text-gray-600">
        {course.name} · {course.department}
      </p>
      <span className="text-sm text-gray-400">리뷰 {course.reviewCount}개</span>
    </div>
  );
}
