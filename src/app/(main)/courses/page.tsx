"use client";

import React from "react";
import { LoadingSpinner } from "@umichkisa-ds/web";
import { useCourses } from "@/apis/courses/swrHooks";
import { useCourseSearch } from "@/features/course-evaluation/hooks/useCourseSearch";
import CourseSearchBar from "@/features/course-evaluation/components/search/CourseSearchBar";
import CourseGrid from "@/features/course-evaluation/components/search/CourseGrid";

export default function CoursesPage() {
  const { courses, isLoading, error } = useCourses();
  const { query, setQuery, filteredCourses } = useCourseSearch(courses);

  if (isLoading) { 
    return <LoadingSpinner />;
  }

  if (error) {
    throw new Error("강의 목록을 불러오는 데 실패했습니다.");
  }

  return (
    <div className="flex flex-col gap-6 py-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-michigan-blue">강의평</h1>
        <p className="mt-1 text-sm text-gray-500">
          수강할 강의의 솔직한 후기를 확인하세요
        </p>
      </div>
      <CourseSearchBar query={query} onChange={setQuery} />
      <CourseGrid courses={filteredCourses} query={query} />
    </div>
  );
}
