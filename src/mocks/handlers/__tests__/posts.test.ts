import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { setupServer } from "msw/node";
import { postsHandlers, resetPostsStore } from "../posts";
import { BoardType } from "@/types/board";

const server = setupServer(...postsHandlers);

const ADMIN_KEY = "kisa-mock-auth-isadmin";
const AUTH_HEADER = { Authorization: "Bearer mock-access-token" };
const JSON_HEADERS = { "Content-Type": "application/json" };

const MOCK_USER_EMAIL = "tester@umich.edu";
const OTHER_USER_EMAIL = "someone-else@umich.edu";

const newCommunityPost = (overrides?: Partial<Record<string, unknown>>) => ({
  type: BoardType.Community,
  title: "Test post",
  fullname: "KISA Tester",
  email: MOCK_USER_EMAIL,
  text: "Body text",
  isAnnouncement: false,
  anonymous: false,
  readCount: 0,
  ...overrides,
});

const newAnnouncementPayload = (overrides?: Partial<Record<string, unknown>>) => ({
  type: BoardType.Announcement,
  title: "공지사항",
  fullname: "Admin User",
  email: MOCK_USER_EMAIL,
  text: "Important announcement",
  isAnnouncement: true,
  anonymous: false,
  readCount: 0,
  ...overrides,
});

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
beforeEach(() => sessionStorage.removeItem(ADMIN_KEY));
afterEach(() => {
  server.resetHandlers();
  resetPostsStore();
  sessionStorage.removeItem(ADMIN_KEY);
});
afterAll(() => server.close());

describe("MSW posts handlers", () => {
  describe("GET /posts/:postid/", () => {
    it("returns the seeded post for a known postid (no auth required)", async () => {
      const res = await fetch("http://localhost/posts/10000/");
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.postid).toBe(10000);
      expect(typeof body.title).toBe("string");
      expect(typeof body.text).toBe("string");
      expect(typeof body.isAnnouncement).toBe("boolean");
      expect(typeof body.likesCount).toBe("number");
    });

    it("returns 404 for unknown postid", async () => {
      const res = await fetch("http://localhost/posts/999999/");
      expect(res.status).toBe(404);
    });
  });

  describe("POST /posts/", () => {
    it("returns 401 when Authorization header is missing", async () => {
      const res = await fetch("http://localhost/posts/", {
        method: "POST",
        headers: JSON_HEADERS,
        body: JSON.stringify(newCommunityPost()),
      });
      expect(res.status).toBe(401);
    });

    it("creates a community post and assigns a new postid; subsequent GET returns it", async () => {
      const res = await fetch("http://localhost/posts/", {
        method: "POST",
        headers: { ...AUTH_HEADER, ...JSON_HEADERS },
        body: JSON.stringify(newCommunityPost({ title: "Hello world" })),
      });
      expect(res.status).toBe(200);
      const created = await res.json();
      expect(typeof created.postid).toBe("number");

      const getRes = await fetch(`http://localhost/posts/${created.postid}/`);
      expect(getRes.status).toBe(200);
      const got = await getRes.json();
      expect(got.title).toBe("Hello world");
      expect(got.email).toBe(MOCK_USER_EMAIL);
    });

    it("returns 403 when non-admin attempts announcement creation", async () => {
      const res = await fetch("http://localhost/posts/", {
        method: "POST",
        headers: { ...AUTH_HEADER, ...JSON_HEADERS },
        body: JSON.stringify(newAnnouncementPayload()),
      });
      expect(res.status).toBe(403);
    });

    it("allows admin to create an announcement", async () => {
      sessionStorage.setItem(ADMIN_KEY, "1");
      const res = await fetch("http://localhost/posts/", {
        method: "POST",
        headers: { ...AUTH_HEADER, ...JSON_HEADERS },
        body: JSON.stringify(newAnnouncementPayload()),
      });
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(typeof body.postid).toBe("number");
    });
  });

  describe("PATCH /posts/:postid/", () => {
    it("returns 401 without Authorization header", async () => {
      const res = await fetch("http://localhost/posts/10000/", {
        method: "PATCH",
        headers: JSON_HEADERS,
        body: JSON.stringify({ type: BoardType.Community, title: "New", text: "x", isAnnouncement: false }),
      });
      expect(res.status).toBe(401);
    });

    it("author can update their own post (title + text)", async () => {
      // Seed: postid 10000 in fixture is authored by MOCK_USER_EMAIL.
      const res = await fetch("http://localhost/posts/10000/", {
        method: "PATCH",
        headers: { ...AUTH_HEADER, ...JSON_HEADERS },
        body: JSON.stringify({
          type: BoardType.Community,
          title: "Updated title",
          text: "Updated body",
          isAnnouncement: false,
        }),
      });
      expect(res.status).toBe(200);

      const getRes = await fetch("http://localhost/posts/10000/");
      const got = await getRes.json();
      expect(got.title).toBe("Updated title");
      expect(got.text).toBe("Updated body");
    });

    it("returns 403 when non-author non-admin tries to update", async () => {
      // Seed: postid 10001 is authored by OTHER_USER_EMAIL in fixture.
      const res = await fetch("http://localhost/posts/10001/", {
        method: "PATCH",
        headers: { ...AUTH_HEADER, ...JSON_HEADERS },
        body: JSON.stringify({
          type: BoardType.Community,
          title: "Hacked",
          text: "tampered",
          isAnnouncement: false,
        }),
      });
      expect(res.status).toBe(403);
    });

    it("admin override: admin can update someone else's post", async () => {
      sessionStorage.setItem(ADMIN_KEY, "1");
      const res = await fetch("http://localhost/posts/10001/", {
        method: "PATCH",
        headers: { ...AUTH_HEADER, ...JSON_HEADERS },
        body: JSON.stringify({
          type: BoardType.Community,
          title: "Moderated",
          text: "Moderated body",
          isAnnouncement: false,
        }),
      });
      expect(res.status).toBe(200);
    });
  });

  describe("DELETE /posts/:postid/", () => {
    it("returns 401 without Authorization header", async () => {
      const res = await fetch("http://localhost/posts/10000/", { method: "DELETE" });
      expect(res.status).toBe(401);
    });

    it("author can delete their own post; subsequent GET returns 404", async () => {
      const res = await fetch("http://localhost/posts/10000/", {
        method: "DELETE",
        headers: AUTH_HEADER,
      });
      expect(res.status).toBe(200);

      const getRes = await fetch("http://localhost/posts/10000/");
      expect(getRes.status).toBe(404);
    });

    it("returns 403 when non-author non-admin tries to delete", async () => {
      const res = await fetch("http://localhost/posts/10001/", {
        method: "DELETE",
        headers: AUTH_HEADER,
      });
      expect(res.status).toBe(403);
    });

    it("admin override: admin can delete someone else's post", async () => {
      sessionStorage.setItem(ADMIN_KEY, "1");
      const res = await fetch("http://localhost/posts/10001/", {
        method: "DELETE",
        headers: AUTH_HEADER,
      });
      expect(res.status).toBe(200);
    });
  });

  describe("PATCH /posts/readCount/:postid/", () => {
    it("increments readCount; subsequent GET reflects the increment", async () => {
      const before = await fetch("http://localhost/posts/10000/").then((r) => r.json());
      const startCount = before.readCount;

      const res = await fetch("http://localhost/posts/readCount/10000/", { method: "PATCH" });
      expect(res.status).toBe(200);

      const after = await fetch("http://localhost/posts/10000/").then((r) => r.json());
      expect(after.readCount).toBe(startCount + 1);
    });

    it("returns 404 for unknown postid", async () => {
      const res = await fetch("http://localhost/posts/readCount/999999/", { method: "PATCH" });
      expect(res.status).toBe(404);
    });
  });
});
