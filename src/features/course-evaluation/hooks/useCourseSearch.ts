import { useMemo, useState } from "react";
import type { SimpleCourse } from "@/types/course";

export function filterCourses(
  courses: SimpleCourse[],
  query: string
): SimpleCourse[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return courses;
  return courses.filter(
    (c) =>
      c.code.toLowerCase().includes(trimmed) ||
      c.name.toLowerCase().includes(trimmed)
  );
}

export function useCourseSearch(courses: SimpleCourse[]): {
  query: string;
  setQuery: (q: string) => void;
  filteredCourses: SimpleCourse[];
} {
  const [query, setQuery] = useState("");
  const filteredCourses = useMemo(
    () => filterCourses(courses, query),
    [courses, query]
  );
  return { query, setQuery, filteredCourses };
}
