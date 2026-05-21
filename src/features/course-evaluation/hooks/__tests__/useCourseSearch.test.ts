import { describe, expect, it } from "vitest";
import { filterCourses } from "../useCourseSearch";
import type { SimpleCourse } from "@/types/course";

const courses: SimpleCourse[] = [
  {
    code: "EECS 281",
    name: "Data Structures and Algorithms",
    department: "EECS",
    reviewCount: 3,
    averageProfessorRating: 4.2,
  },
  {
    code: "MATH 116",
    name: "Calculus II",
    department: "Mathematics",
    reviewCount: 4,
    averageProfessorRating: 3.1,
  },
  {
    code: "EECS 376",
    name: "Foundations of Computer Science",
    department: "EECS",
    reviewCount: 2,
    averageProfessorRating: 3.8,
  },
];

describe("filterCourses", () => {
  it("returns all courses when query is empty", () => {
    expect(filterCourses(courses, "")).toHaveLength(3);
  });

  it("filters by course code (case-insensitive)", () => {
    const result = filterCourses(courses, "Eecs");
    expect(result).toHaveLength(2);
    expect(result.every((c) => c.code.includes("EECS"))).toBe(true);
  });

  it("filters by course name", () => {
    const result = filterCourses(courses, "calculus");
    expect(result).toHaveLength(1);
    expect(result[0].code).toBe("MATH 116");
  });

  it("returns empty array when nothing matches", () => {
    expect(filterCourses(courses, "ZZZNOTHING")).toHaveLength(0);
  });

  it("trims whitespace before filtering", () => {
    const result = filterCourses(courses, "  eecs  ");
    expect(result).toHaveLength(2);
  });
});
