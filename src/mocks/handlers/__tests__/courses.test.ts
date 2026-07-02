// src/mocks/handlers/__tests__/courses.test.ts

import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { setupServer } from "msw/node";
import { coursesHandlers, resetCourseStore } from "../courses";

const server = setupServer(...coursesHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => {
  server.resetHandlers();
  resetCourseStore();
});
afterAll(() => server.close());

describe("MSW courses handlers", () => {
  describe("GET /courses", () => {
    it("returns all courses when no query", async () => {
      const res = await fetch("http://localhost/courses");
      const data = await res.json();
      expect(res.status).toBe(200);
      expect(data.length).toBeGreaterThan(0);
      expect(data[0]).toHaveProperty("code");
      expect(data[0]).toHaveProperty("reviewCount");
    });

    it("filters by code query (case-insensitive)", async () => {
      const res = await fetch("http://localhost/courses?q=eecs");
      const data = await res.json();
      expect(res.status).toBe(200);
      expect(
        data.every((c: { code: string }) => c.code.includes("EECS"))
      ).toBe(true);
    });

    it("returns empty array for unmatched query", async () => {
      const res = await fetch("http://localhost/courses?q=ZZZNOTEXIST");
      const data = await res.json();
      expect(res.status).toBe(200);
      expect(data).toEqual([]);
    });
  });

  describe("GET /courses/:code/reviews", () => {
    it("returns reviews for a known course", async () => {
      const res = await fetch("http://localhost/courses/EECS%20281/reviews");
      const data = await res.json();
      expect(res.status).toBe(200);
      expect(data).toHaveProperty("reviews");
      expect(data).toHaveProperty("commonInfo");
      expect(data.reviews.length).toBeGreaterThan(0);
      expect(data.reviews[0].courseCode).toBe("EECS 281");
      expect(data.reviews[0]).toHaveProperty("professors");
    });

    it("returns empty reviews array for course with no reviews", async () => {
      const res = await fetch("http://localhost/courses/UNKNOWN%20999/reviews");
      const data = await res.json();
      expect(res.status).toBe(200);
      expect(data).toHaveProperty("commonInfo");
      expect(data.reviews).toEqual([]);
    });
  });

  describe("POST /courses/:code/reviews", () => {
    const validReviewBody = {
      courseCode: "EECS 281",
      email: "test@umich.edu",
      semester: "2025 Winter",
      lectureAttendance: true,
      lectureRecording: false,
      groupWork: false,
      labAttendance: false,
      exam: "기말 1회",
      workload: "5~10시간",
      courseComment: "테스트 리뷰입니다.",
      professors: [{ name: "Test Prof", rating: 4, comment: "좋아요" }],
    };

    it("creates a review and returns 201", async () => {
      const res = await fetch(
        "http://localhost/courses/EECS%20281/reviews",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer mock-token",
          },
          body: JSON.stringify(validReviewBody),
        }
      );
      const data = await res.json();
      expect(res.status).toBe(201);
      expect(data).toHaveProperty("reviewid");
      expect(data.semester).toBe("2025 Winter");
      expect(data.courseCode).toBe("EECS 281");
      expect(data.likesCount).toBe(0);
    });

    it("new review appears in subsequent GET", async () => {
      await fetch("http://localhost/courses/EECS%20281/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer mock-token",
        },
        body: JSON.stringify(validReviewBody),
      });
      const res = await fetch("http://localhost/courses/EECS%20281/reviews");
      const data = await res.json();
      expect(
        data.reviews.some((r: { semester: string }) => r.semester === "2025 Winter")
      ).toBe(true);
    });
  });

  describe("GET /courses/:code/jokbo", () => {
    it("returns jokbo files for a known course", async () => {
      const res = await fetch("http://localhost/courses/EECS%20281/jokbo");
      const data = await res.json();
      expect(res.status).toBe(200);
      expect(data.length).toBeGreaterThan(0);
      expect(data[0]).toHaveProperty("fileid");
      expect(data[0]).toHaveProperty("fileName");
    });

    it("returns empty array for course with no jokbo", async () => {
      const res = await fetch("http://localhost/courses/STATS%20412/jokbo");
      const data = await res.json();
      expect(res.status).toBe(200);
      expect(data).toEqual([]);
    });
  });
});
