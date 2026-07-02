import { http, HttpResponse } from "msw";
import { mockCourseCommonInfo, mockCourses, mockJokboFiles, mockReviews } from "../fixtures/courses";
import type { CourseCommonInfo, JokboFile, Review, SimpleCourse } from "@/types/course";

let reviewStore: Review[] = [...mockReviews];
let jokboStore: JokboFile[] = [...mockJokboFiles];
let courseCommonInfoStore: Record<string, CourseCommonInfo> = { ...mockCourseCommonInfo };
let nextReviewId = mockReviews.length + 1;
let nextFileid = mockJokboFiles.length + 1;

const defaultCommonInfo: CourseCommonInfo = {
  lectureAttendance: false,
  lectureRecording: false,
  groupWork: false,
  labAttendance: false,
  exam: "",
  workload: "5~10시간",
};

export function resetCourseStore(): void {
  reviewStore = [...mockReviews];
  jokboStore = [...mockJokboFiles];
  courseCommonInfoStore = { ...mockCourseCommonInfo };
  nextReviewId = mockReviews.length + 1;
  nextFileid = mockJokboFiles.length + 1;
}

export const coursesHandlers = [
  // GET /courses?q=
  http.get("*/courses", ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get("q")?.toLowerCase() ?? "";
    const results: SimpleCourse[] = q
      ? mockCourses.filter(
          (c) =>
            c.code.toLowerCase().includes(q) ||
            c.name.toLowerCase().includes(q)
        )
      : mockCourses;
    return HttpResponse.json(results);
  }),

  // GET /courses/:code/reviews
  http.get("*/courses/:code/reviews", ({ params }) => {
    const code = decodeURIComponent(params.code as string);
    const reviews = reviewStore.filter((r) => r.courseCode === code);
    const commonInfo = courseCommonInfoStore[code] ?? defaultCommonInfo;
    return HttpResponse.json({ commonInfo, reviews });
  }),

  // POST /courses/:code/reviews
  http.post("*/courses/:code/reviews", async ({ params, request }) => {
    const code = decodeURIComponent(params.code as string);
    const body = (await request.json()) as Record<string, unknown>;
    courseCommonInfoStore[code] = {
      lectureAttendance: body.lectureAttendance as boolean,
      lectureRecording: body.lectureRecording as boolean,
      groupWork: body.groupWork as boolean,
      labAttendance: body.labAttendance as boolean,
      exam: body.exam as string,
      workload: body.workload as CourseCommonInfo["workload"],
    };
    const newReview: Review = {
      reviewid: nextReviewId++,
      courseCode: code,
      authorName: "익명",
      semester: body.semester as string,
      courseComment: body.courseComment as string,
      professors: body.professors as Review["professors"],
      likesCount: 0,
    };
    reviewStore.push(newReview);
    return HttpResponse.json(newReview, { status: 201 });
  }),

  // GET /courses/:code/jokbo
  http.get("*/courses/:code/jokbo", ({ params }) => {
    const code = decodeURIComponent(params.code as string);
    const files = jokboStore.filter((f) => f.courseCode === code);
    return HttpResponse.json(files);
  }),

  // POST /courses/:code/jokbo
  http.post("*/courses/:code/jokbo", async ({ params, request }) => {
    const code = decodeURIComponent(params.code as string);
    const body = (await request.json()) as Record<string, unknown>;
    const newFile: JokboFile = {
      fileid: nextFileid++,
      courseCode: code,
      fileName: body.fileName as string,
      uploadedBy: "익명",
      semester: body.semester as string,
      uploadedAt: new Date().toISOString().split("T")[0],
    };
    jokboStore.push(newFile);
    return HttpResponse.json(newFile, { status: 201 });
  }),

  // POST /courses/:code/reviews/:reviewid/likes
  http.post("*/courses/:code/reviews/:reviewid/likes", ({ params }) => {
    const code = decodeURIComponent(params.code as string);
    const reviewid = Number(params.reviewid);
    const review = reviewStore.find(
      (r) => r.courseCode === code && r.reviewid === reviewid
    );
    if (!review) return HttpResponse.json({ error: "Not found" }, { status: 404 });
    review.likesCount += 1;
    return HttpResponse.json({ likesCount: review.likesCount });
  }),

  // GET /courses/:code  (must come after sub-path handlers)
  http.get("*/courses/:code", ({ params }) => {
    const code = decodeURIComponent(params.code as string);
    const course = mockCourses.find((c) => c.code === code);
    if (!course)
      return HttpResponse.json({ error: "Not found" }, { status: 404 });
    return HttpResponse.json(course);
  }),
];
