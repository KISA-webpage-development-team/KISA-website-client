import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";
import { setupServer } from "msw/node";
import { likesHandlers, resetLikesStore } from "../likes";

const server = setupServer(...likesHandlers);

const AUTH = { Authorization: "Bearer mock-access-token" };

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => {
  server.resetHandlers();
  resetLikesStore();
});
afterAll(() => server.close());

const SEED_LIKED_POSTID = 10000;
const SEED_UNLIKED_POSTID = 10001;
const SEED_LIKED_COMMENTID = 1;
const SEED_UNLIKED_COMMENTID = 2;
const SEED_USER = "tester@umich.edu";
const OTHER_USER = "other@umich.edu";

const url = (
  base: string,
  qs?: Record<string, string>
) => {
  const u = new URL(`http://localhost${base}`);
  if (qs) Object.entries(qs).forEach(([k, v]) => u.searchParams.set(k, v));
  return u.toString();
};

describe("MSW likes handlers", () => {
  describe("GET /likes/:id/ — has-user-liked check", () => {
    it("returns { liked: true } when the user has liked the target post", async () => {
      const res = await fetch(
        url(`/likes/${SEED_LIKED_POSTID}/`, {
          email: SEED_USER,
          target: "post",
        }),
        { headers: AUTH }
      );
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.liked).toBe(true);
    });

    it("returns { liked: false } when the user has not liked the target post", async () => {
      const res = await fetch(
        url(`/likes/${SEED_UNLIKED_POSTID}/`, {
          email: SEED_USER,
          target: "post",
        }),
        { headers: AUTH }
      );
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.liked).toBe(false);
    });

    it("returns { liked: true } when the user has liked the target comment", async () => {
      const res = await fetch(
        url(`/likes/${SEED_LIKED_COMMENTID}/`, {
          email: SEED_USER,
          target: "comment",
        }),
        { headers: AUTH }
      );
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.liked).toBe(true);
    });

    it("returns { liked: false } when the user has not liked the target comment", async () => {
      const res = await fetch(
        url(`/likes/${SEED_UNLIKED_COMMENTID}/`, {
          email: SEED_USER,
          target: "comment",
        }),
        { headers: AUTH }
      );
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.liked).toBe(false);
    });

    it("discriminates targets — post-like on id N is not the same as comment-like on id N", async () => {
      // Seed has a post-like on 10000, but no comment-like on 10000.
      const res = await fetch(
        url(`/likes/${SEED_LIKED_POSTID}/`, {
          email: SEED_USER,
          target: "comment",
        }),
        { headers: AUTH }
      );
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.liked).toBe(false);
    });

    it("returns 401 when Authorization header is missing", async () => {
      const res = await fetch(
        url(`/likes/${SEED_LIKED_POSTID}/`, {
          email: SEED_USER,
          target: "post",
        })
      );
      expect(res.status).toBe(401);
    });
  });

  describe("GET /posts/likes/:postid/ — count", () => {
    it("returns { likesCount } for a post", async () => {
      const res = await fetch(`http://localhost/posts/likes/${SEED_LIKED_POSTID}/`);
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(typeof body.likesCount).toBe("number");
      expect(body.likesCount).toBeGreaterThanOrEqual(1);
    });

    it("returns { likesCount: 0 } for a post with no likes", async () => {
      const res = await fetch(`http://localhost/posts/likes/${SEED_UNLIKED_POSTID}/`);
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.likesCount).toBe(0);
    });

    it("does not require auth for the count endpoint", async () => {
      const res = await fetch(`http://localhost/posts/likes/${SEED_LIKED_POSTID}/`);
      expect(res.status).toBe(200);
    });
  });

  describe("GET /comments/likes/:commentid/ — count", () => {
    it("returns { likesCount } for a comment", async () => {
      const res = await fetch(
        `http://localhost/comments/likes/${SEED_LIKED_COMMENTID}/`
      );
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(typeof body.likesCount).toBe("number");
      expect(body.likesCount).toBeGreaterThanOrEqual(1);
    });

    it("returns { likesCount: 0 } for a comment with no likes", async () => {
      const res = await fetch(
        `http://localhost/comments/likes/${SEED_UNLIKED_COMMENTID}/`
      );
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.likesCount).toBe(0);
    });
  });

  describe("POST /likes/:id/ — create like", () => {
    it("adds a post like; subsequent GET reflects it; count increments", async () => {
      // Baseline count
      const before = await fetch(
        `http://localhost/posts/likes/${SEED_UNLIKED_POSTID}/`
      ).then((r) => r.json());
      expect(before.likesCount).toBe(0);

      const create = await fetch(`http://localhost/likes/${SEED_UNLIKED_POSTID}/`, {
        method: "POST",
        headers: { ...AUTH, "Content-Type": "application/json" },
        body: JSON.stringify({ email: SEED_USER, target: "post" }),
      });
      expect(create.status).toBe(201);

      const after = await fetch(
        `http://localhost/posts/likes/${SEED_UNLIKED_POSTID}/`
      ).then((r) => r.json());
      expect(after.likesCount).toBe(1);

      const lookup = await fetch(
        url(`/likes/${SEED_UNLIKED_POSTID}/`, {
          email: SEED_USER,
          target: "post",
        }),
        { headers: AUTH }
      );
      expect(lookup.status).toBe(200);
      expect((await lookup.json()).liked).toBe(true);
    });

    it("adds a comment like and routes to the comment count, not the post count", async () => {
      const create = await fetch(
        `http://localhost/likes/${SEED_UNLIKED_COMMENTID}/`,
        {
          method: "POST",
          headers: { ...AUTH, "Content-Type": "application/json" },
          body: JSON.stringify({ email: SEED_USER, target: "comment" }),
        }
      );
      expect(create.status).toBe(201);

      const commentCount = await fetch(
        `http://localhost/comments/likes/${SEED_UNLIKED_COMMENTID}/`
      ).then((r) => r.json());
      expect(commentCount.likesCount).toBe(1);

      // The post-likes endpoint for the same numeric id must NOT have been
      // incremented (target discriminator is honored).
      const postCount = await fetch(
        `http://localhost/posts/likes/${SEED_UNLIKED_COMMENTID}/`
      ).then((r) => r.json());
      expect(postCount.likesCount).toBe(0);
    });

    it("is idempotent — POSTing twice from the same user does not double the count", async () => {
      const body = JSON.stringify({ email: SEED_USER, target: "post" });
      const headers = { ...AUTH, "Content-Type": "application/json" };
      await fetch(`http://localhost/likes/${SEED_UNLIKED_POSTID}/`, {
        method: "POST",
        headers,
        body,
      });
      await fetch(`http://localhost/likes/${SEED_UNLIKED_POSTID}/`, {
        method: "POST",
        headers,
        body,
      });
      const count = await fetch(
        `http://localhost/posts/likes/${SEED_UNLIKED_POSTID}/`
      ).then((r) => r.json());
      expect(count.likesCount).toBe(1);
    });

    it("returns 401 when Authorization header is missing", async () => {
      const res = await fetch(`http://localhost/likes/${SEED_UNLIKED_POSTID}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: SEED_USER, target: "post" }),
      });
      expect(res.status).toBe(401);
    });
  });

  describe("DELETE /likes/:id/ — remove like", () => {
    it("removes the like; count decrements", async () => {
      const before = await fetch(
        `http://localhost/posts/likes/${SEED_LIKED_POSTID}/`
      ).then((r) => r.json());
      expect(before.likesCount).toBeGreaterThanOrEqual(1);

      const del = await fetch(
        url(`/likes/${SEED_LIKED_POSTID}/`, {
          email: SEED_USER,
          target: "post",
        }),
        { method: "DELETE", headers: AUTH }
      );
      expect([200, 204]).toContain(del.status);

      const after = await fetch(
        `http://localhost/posts/likes/${SEED_LIKED_POSTID}/`
      ).then((r) => r.json());
      expect(after.likesCount).toBe(before.likesCount - 1);

      const lookup = await fetch(
        url(`/likes/${SEED_LIKED_POSTID}/`, {
          email: SEED_USER,
          target: "post",
        }),
        { headers: AUTH }
      );
      expect(lookup.status).toBe(200);
      expect((await lookup.json()).liked).toBe(false);
    });

    it("returns 401 when Authorization header is missing", async () => {
      const res = await fetch(
        url(`/likes/${SEED_LIKED_POSTID}/`, {
          email: SEED_USER,
          target: "post",
        }),
        { method: "DELETE" }
      );
      expect(res.status).toBe(401);
    });

    it("does not affect another user's like for the same target", async () => {
      // Seed has SEED_USER liking SEED_LIKED_POSTID. Add OTHER_USER too.
      await fetch(`http://localhost/likes/${SEED_LIKED_POSTID}/`, {
        method: "POST",
        headers: { ...AUTH, "Content-Type": "application/json" },
        body: JSON.stringify({ email: OTHER_USER, target: "post" }),
      });
      const beforeCount = await fetch(
        `http://localhost/posts/likes/${SEED_LIKED_POSTID}/`
      ).then((r) => r.json());

      // SEED_USER unlikes; OTHER_USER's like must remain.
      await fetch(
        url(`/likes/${SEED_LIKED_POSTID}/`, {
          email: SEED_USER,
          target: "post",
        }),
        { method: "DELETE", headers: AUTH }
      );

      const afterCount = await fetch(
        `http://localhost/posts/likes/${SEED_LIKED_POSTID}/`
      ).then((r) => r.json());
      expect(afterCount.likesCount).toBe(beforeCount.likesCount - 1);

      const otherLookup = await fetch(
        url(`/likes/${SEED_LIKED_POSTID}/`, {
          email: OTHER_USER,
          target: "post",
        }),
        { headers: AUTH }
      );
      expect(otherLookup.status).toBe(200);
      expect((await otherLookup.json()).liked).toBe(true);
    });
  });

  describe("toggle invariant", () => {
    it("POST then DELETE returns the count to its pre-toggle value", async () => {
      const before = await fetch(
        `http://localhost/posts/likes/${SEED_UNLIKED_POSTID}/`
      ).then((r) => r.json());

      await fetch(`http://localhost/likes/${SEED_UNLIKED_POSTID}/`, {
        method: "POST",
        headers: { ...AUTH, "Content-Type": "application/json" },
        body: JSON.stringify({ email: SEED_USER, target: "post" }),
      });
      await fetch(
        url(`/likes/${SEED_UNLIKED_POSTID}/`, {
          email: SEED_USER,
          target: "post",
        }),
        { method: "DELETE", headers: AUTH }
      );

      const after = await fetch(
        `http://localhost/posts/likes/${SEED_UNLIKED_POSTID}/`
      ).then((r) => r.json());
      expect(after.likesCount).toBe(before.likesCount);
    });

    it("DELETE then POST returns the count to its pre-toggle value", async () => {
      const before = await fetch(
        `http://localhost/posts/likes/${SEED_LIKED_POSTID}/`
      ).then((r) => r.json());

      await fetch(
        url(`/likes/${SEED_LIKED_POSTID}/`, {
          email: SEED_USER,
          target: "post",
        }),
        { method: "DELETE", headers: AUTH }
      );
      await fetch(`http://localhost/likes/${SEED_LIKED_POSTID}/`, {
        method: "POST",
        headers: { ...AUTH, "Content-Type": "application/json" },
        body: JSON.stringify({ email: SEED_USER, target: "post" }),
      });

      const after = await fetch(
        `http://localhost/posts/likes/${SEED_LIKED_POSTID}/`
      ).then((r) => r.json());
      expect(after.likesCount).toBe(before.likesCount);
    });
  });

  describe("store reset between tests", () => {
    it("resetLikesStore restores seed state", async () => {
      // Mutate
      await fetch(`http://localhost/likes/${SEED_UNLIKED_POSTID}/`, {
        method: "POST",
        headers: { ...AUTH, "Content-Type": "application/json" },
        body: JSON.stringify({ email: SEED_USER, target: "post" }),
      });
      const mutated = await fetch(
        `http://localhost/posts/likes/${SEED_UNLIKED_POSTID}/`
      ).then((r) => r.json());
      expect(mutated.likesCount).toBe(1);

      resetLikesStore();

      const restored = await fetch(
        `http://localhost/posts/likes/${SEED_UNLIKED_POSTID}/`
      ).then((r) => r.json());
      expect(restored.likesCount).toBe(0);
    });
  });
});
