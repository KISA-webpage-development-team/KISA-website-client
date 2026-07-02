"use client";

import React, { useCallback, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LoadingSpinner, Pagination } from "@umichkisa-ds/web";
import { useCourses } from "@/apis/courses/swrHooks";
import { useCourseSearch } from "@/features/course-evaluation/hooks/useCourseSearch";
import CourseSearchBar from "@/features/course-evaluation/components/search/CourseSearchBar";
import CourseGrid from "@/features/course-evaluation/components/search/CourseGrid";

const PAGE_SIZE = 6;

export default function CoursesPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const page = Math.max(1, Number(searchParams.get("page") ?? 1));

  const { courses, isLoading, error } = useCourses();
  const { query, setQuery, filteredCourses } = useCourseSearch(courses);

  const hasQuery = query.trim().length > 0;
  const totalPages = hasQuery
    ? 1
    : Math.max(1, Math.ceil(filteredCourses.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const displayCourses = hasQuery
    ? filteredCourses
    : filteredCourses.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handlePageChange = useCallback(
    (nextPage: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(nextPage));
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    },
    [router, pathname, searchParams],
  );

  const handleQueryChange = useCallback(
    (next: string) => {
      setQuery(next);
      if (page !== 1) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", "1");
        router.replace(`${pathname}?${params.toString()}`);
      }
    },
    [setQuery, page, router, pathname, searchParams],
  );

  if (isLoading) return <LoadingSpinner />;
  if (error) throw new Error("강의 목록을 불러오는 데 실패했습니다.");

  return (
    <div className="flex flex-col gap-6 py-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-michigan-blue">강의평</h1>
        <p className="mt-1 text-sm text-gray-500">
          수강할 강의의 솔직한 후기를 확인하세요
        </p>
      </div>
      <CourseSearchBar query={query} onChange={handleQueryChange} />
      <div className={`mt-4${isPending ? " opacity-60 transition-opacity" : ""}`}>
        <CourseGrid courses={displayCourses} query={query} />
      </div>
      {!hasQuery && totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            page={safePage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
