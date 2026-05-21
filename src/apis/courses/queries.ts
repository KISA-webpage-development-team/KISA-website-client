import client from "@/lib/axios/client";
import type { SimpleCourse, CourseReviewsResponse, JokboFile } from "@/types/course";

/**
 * @desc Fetch all courses, optionally filtered by search query [TOKEN NOT REQUIRED]
 * @route GET /courses?q=:query
 */
export async function getCourses(query = ""): Promise<SimpleCourse[]> {
  const url = query
    ? `/courses?q=${encodeURIComponent(query)}`
    : "/courses";
  try {
    const response = await client.get<SimpleCourse[]>(url);
    return response.data;
  } catch {
    return [];
  }
}

/**
 * @desc Fetch a single course by code [TOKEN NOT REQUIRED]
 * @route GET /courses/:code
 */
export async function getCourse(
  code: string
): Promise<SimpleCourse | undefined> {
  const url = `/courses/${encodeURIComponent(code)}`;
  try {
    const response = await client.get<SimpleCourse>(url);
    return response.data;
  } catch {
    return undefined;
  }
}

/**
 * @desc Fetch reviews for a course [TOKEN NOT REQUIRED]
 * @route GET /courses/:code/reviews
 */
export async function getCourseReviews(
  code: string
): Promise<CourseReviewsResponse> {
  const url = `/courses/${encodeURIComponent(code)}/reviews`;
  try {
    const response = await client.get<CourseReviewsResponse>(url);
    return response.data;
  } catch {
    return { commonInfo: { lectureAttendance: false, lectureRecording: false, groupWork: false, labAttendance: false, exam: "", workload: "5~10시간", officeHours: "" }, reviews: [] };
  }
}

/**
 * @desc Fetch jokbo files for a course [TOKEN NOT REQUIRED]
 * @route GET /courses/:code/jokbo
 */
export async function getCourseJokbo(code: string): Promise<JokboFile[]> {
  const url = `/courses/${encodeURIComponent(code)}/jokbo`;
  try {
    const response = await client.get<JokboFile[]>(url);
    return response.data;
  } catch {
    return [];
  }
}
