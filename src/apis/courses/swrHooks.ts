import useSWR, { SWRConfiguration } from "swr";
import { immutableOption } from "@/lib/swr/options";
import type { CustomAxiosError } from "@/lib/axios/types";
import type { SimpleCourse, CourseCommonInfo, CourseReviewsResponse, Review, JokboFile } from "@/types/course";

/**
 * @desc Fetch all courses (full list; client-side search filters this)
 * @route GET /courses
 */
export function useCourses(options: SWRConfiguration = immutableOption): {
  courses: SimpleCourse[];
  isLoading: boolean;
  error: CustomAxiosError | undefined;
} {
  const { data, error, isLoading } = useSWR<SimpleCourse[]>(
    "/courses",
    options
  );
  return { courses: data ?? [], isLoading, error };
}

/**
 * @desc Fetch a single course by code
 * @route GET /courses/:code
 */
export function useCourse(
  code: string,
  options: SWRConfiguration = immutableOption
): {
  course: SimpleCourse | undefined;
  isLoading: boolean;
  error: CustomAxiosError | undefined;
} {
  const url = code ? `/courses/${encodeURIComponent(code)}` : null;
  const { data, error, isLoading } = useSWR<SimpleCourse>(url, options);
  return { course: data, isLoading, error };
}

/**
 * @desc Fetch reviews for a course
 * @route GET /courses/:code/reviews
 */
const defaultCommonInfo: CourseCommonInfo = {
  lectureAttendance: false,
  lectureRecording: false,
  groupWork: false,
  labAttendance: false,
  exam: "",
  workload: "5~10시간",
  officeHours: "",
};

export function useCourseReviews(
  code: string,
  options: SWRConfiguration = immutableOption
): {
  reviews: Review[];
  commonInfo: CourseCommonInfo;
  isLoading: boolean;
  error: CustomAxiosError | undefined;
  refreshReviews: () => Promise<void>;
} {
  const url = code
    ? `/courses/${encodeURIComponent(code)}/reviews`
    : null;
  const { data, error, isLoading, mutate } = useSWR<CourseReviewsResponse>(url, options);
  return {
    reviews: data?.reviews ?? [],
    commonInfo: data?.commonInfo ?? defaultCommonInfo,
    isLoading,
    error,
    refreshReviews: () => mutate().then(() => undefined),
  };
}

/**
 * @desc Fetch jokbo files for a course
 * @route GET /courses/:code/jokbo
 */
export function useCourseJokbo(
  code: string,
  options: SWRConfiguration = immutableOption
): {
  jokboFiles: JokboFile[];
  isLoading: boolean;
  error: CustomAxiosError | undefined;
} {
  const url = code
    ? `/courses/${encodeURIComponent(code)}/jokbo`
    : null;
  const { data, error, isLoading } = useSWR<JokboFile[]>(url, options);
  return { jokboFiles: data ?? [], isLoading, error };
}
