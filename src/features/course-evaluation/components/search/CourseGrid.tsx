import React from "react";
import type { SimpleCourse } from "@/types/course";
import CourseCard from "./CourseCard";

type CourseGridProps = {
  courses: SimpleCourse[];
  query: string;
};

export default function CourseGrid({ courses, query }: CourseGridProps) {
  const isEmpty = courses.length === 0;
  const hasQuery = query.trim().length > 0;

  const emptyWithQuery = (
    <div className="flex flex-col items-center gap-2 py-16 text-gray-400">
      <p className="text-sm">검색 결과가 없습니다</p>
    </div>
  );

  const emptyWithoutQuery = (
    <div className="flex flex-col items-center gap-2 py-16 text-gray-400">
      <p className="text-sm">강의를 검색해보세요</p>
    </div>
  );

  if (isEmpty) return hasQuery ? emptyWithQuery : emptyWithoutQuery;

  const resultCount = hasQuery ? (
    <p className="mb-3 text-sm text-gray-500">검색 결과 {courses.length}개</p>
  ) : null;

  return (
    <div>
      {resultCount}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {courses.map((course) => (
          <CourseCard key={course.code} course={course} />
        ))}
      </div>
    </div>
  );
}
