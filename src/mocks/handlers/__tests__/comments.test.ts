import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { setupServer } from "msw/node";
import { commentsHandlers, resetCommentsStore } from "../comments";
import type { Comment } from "@/types/comment";

const server = setupServer(...commentsHandlers);

const ADMIN_KEY = "kisa-mock-auth-isadmin";
const AUTH_HEADER = { Authorization: "Bearer mock-access-token" };
const JSON_HEADERS = { "Content-Type": "application/json" };

const MOCK_USER_EMAIL = "tester@umich.edu";

// 6.5b cross-lane contract: postid 10000 (Community → everykisa), 10001 (BuyAndSell → board), 10002 (Academic → everykisa).
const COMMUNITY_POSTID = 10000; // everykisa
const BUYANDSELL_POSTID = 10001; // non-everykisa

const newComment = (overrides?: Partial<Record<string, unknown>>) => ({
  email: MOCK_USER_EMAIL,
  fullname: "KISA Tester",
  text: "Hello",
  isCommentOfComment: false,
  parentCommentid: null,
  anonymous: false,
  secret: false,
  ...overrides,
});

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
beforeEach(() => sessionStorage.removeItem(ADMIN_KEY));
afterEach(() => {
  server.resetHandlers();
  resetCommentsStore();
  sessionStorage.removeItem(ADMIN_KEY);
});
afterAll(() => server.close());

function maxDepth(comments: Comment[]): number {
  if (comments.length === 0) return 0;
  return 1 + Math.max(...comments.map((c) => maxDepth(c.childComments ?? [])));
}

describe("MSW comments handlers", () => {
  describe("GET /comments/:postid/", () => {
    it("returns nested tree with childComments populated; depth >= 3 on community fixture", async () => {
      const res = await fetch(`http://localhost/comments/${COMMUNITY_POSTID}/`);
      expect(res.status).toBe(200);
      const tree = (await res.json()) as Comment[];
      expect(Array.isArray(tree)).toBe(true);
      expect(tree.length).toBeGreaterThan(0);
      expect(maxDepth(tree)).toBeGreaterThanOrEqual(3);
      for (const root of tree) {
        expect(root.parentCommentid).toBeNull();
        expect(Array.isArray(root.childComments)).toBe(true);
      }
    });

    it("returns [] for postid with no comments", async () => {
      const res = await fetch("http://localhost/comments/999999/");
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body).toEqual([]);
    });
  });

  describe("POST /comments/:postid/", () => {
    it("returns 401 without Authorization header", async () => {
      const res = await fetch(`http://localhost/comments/${COMMUNITY_POSTID}/`, {
        method: "POST",
        headers: JSON_HEADERS,
        body: JSON.stringify(newComment()),
      });
      expect(res.status).toBe(401);
    });

    it("creates a top-level comment; subsequent GET shows it as a new root", async () => {
      const res = await fetch(`http://localhost/comments/${COMMUNITY_POSTID}/`, {
        method: "POST",
        headers: { ...AUTH_HEADER, ...JSON_HEADERS },
        body: JSON.stringify(newComment({ text: "Brand new comment" })),
      });
      expect(res.status).toBe(200);

      const tree = (await fetch(`http://localhost/comments/${COMMUNITY_POSTID}/`).then((r) =>
        r.json()
      )) as Comment[];
      expect(tree.some((c) => c.text === "Brand new comment")).toBe(true);
    });

    it("creates a child comment under an existing parent (childComments populated)", async () => {
      const tree0 = (await fetch(`http://localhost/comments/${COMMUNITY_POSTID}/`).then((r) =>
        r.json()
      )) as Comment[];
      const parentId = tree0[0].commentid;

      const res = await fetch(`http://localhost/comments/${COMMUNITY_POSTID}/`, {
        method: "POST",
        headers: { ...AUTH_HEADER, ...JSON_HEADERS },
        body: JSON.stringify(
          newComment({
            text: "child reply",
            isCommentOfComment: true,
            parentCommentid: parentId,
          })
        ),
      });
      expect(res.status).toBe(200);

      const tree1 = (await fetch(`http://localhost/comments/${COMMUNITY_POSTID}/`).then((r) =>
        r.json()
      )) as Comment[];
      const parent = tree1.find((c) => c.commentid === parentId)!;
      const childTexts = parent.childComments.map((c) => c.text);
      expect(childTexts).toContain("child reply");
    });

    it("everykisa post: anonymous: true is honored as-is", async () => {
      const res = await fetch(`http://localhost/comments/${COMMUNITY_POSTID}/`, {
        method: "POST",
        headers: { ...AUTH_HEADER, ...JSON_HEADERS },
        body: JSON.stringify(newComment({ text: "anon comment", anonymous: true })),
      });
      expect(res.status).toBe(200);

      const tree = (await fetch(`http://localhost/comments/${COMMUNITY_POSTID}/`).then((r) =>
        r.json()
      )) as Comment[];
      const created = tree.find((c) => c.text === "anon comment");
      expect(created).toBeDefined();
      expect(created!.anonymous).toBe(true);
    });

    it("non-everykisa post: anonymous: true is normalized to false", async () => {
      const res = await fetch(`http://localhost/comments/${BUYANDSELL_POSTID}/`, {
        method: "POST",
        headers: { ...AUTH_HEADER, ...JSON_HEADERS },
        body: JSON.stringify(newComment({ text: "should-not-be-anon", anonymous: true })),
      });
      expect(res.status).toBe(200);

      const tree = (await fetch(`http://localhost/comments/${BUYANDSELL_POSTID}/`).then((r) =>
        r.json()
      )) as Comment[];
      const created = tree.find((c) => c.text === "should-not-be-anon");
      expect(created).toBeDefined();
      expect(created!.anonymous).toBe(false);
    });
  });

  describe("PUT /comments/:commentid/", () => {
    it("returns 401 without Authorization", async () => {
      const tree = (await fetch(`http://localhost/comments/${COMMUNITY_POSTID}/`).then((r) =>
        r.json()
      )) as Comment[];
      const cid = tree[0].commentid;
      const res = await fetch(`http://localhost/comments/${cid}/`, {
        method: "PUT",
        headers: JSON_HEADERS,
        body: JSON.stringify({ text: "x" }),
      });
      expect(res.status).toBe(401);
    });

    it("author can edit their own comment", async () => {
      // Seed: in the community fixture, find a comment authored by MOCK_USER_EMAIL.
      const tree = (await fetch(`http://localhost/comments/${COMMUNITY_POSTID}/`).then((r) =>
        r.json()
      )) as Comment[];
      const myComment = tree.find((c) => c.email === MOCK_USER_EMAIL)!;
      expect(myComment).toBeDefined();

      const res = await fetch(`http://localhost/comments/${myComment.commentid}/`, {
        method: "PUT",
        headers: { ...AUTH_HEADER, ...JSON_HEADERS },
        body: JSON.stringify({ text: "edited body" }),
      });
      expect(res.status).toBe(200);

      const tree2 = (await fetch(`http://localhost/comments/${COMMUNITY_POSTID}/`).then((r) =>
        r.json()
      )) as Comment[];
      const updated = tree2.find((c) => c.commentid === myComment.commentid)!;
      expect(updated.text).toBe("edited body");
    });

    it("returns 403 when non-author non-admin tries to edit", async () => {
      const tree = (await fetch(`http://localhost/comments/${COMMUNITY_POSTID}/`).then((r) =>
        r.json()
      )) as Comment[];
      const otherComment = tree.find((c) => c.email !== MOCK_USER_EMAIL)!;
      const res = await fetch(`http://localhost/comments/${otherComment.commentid}/`, {
        method: "PUT",
        headers: { ...AUTH_HEADER, ...JSON_HEADERS },
        body: JSON.stringify({ text: "hacked" }),
      });
      expect(res.status).toBe(403);
    });

    it("admin override: admin can edit anyone's comment", async () => {
      sessionStorage.setItem(ADMIN_KEY, "1");
      const tree = (await fetch(`http://localhost/comments/${COMMUNITY_POSTID}/`).then((r) =>
        r.json()
      )) as Comment[];
      const otherComment = tree.find((c) => c.email !== MOCK_USER_EMAIL)!;
      const res = await fetch(`http://localhost/comments/${otherComment.commentid}/`, {
        method: "PUT",
        headers: { ...AUTH_HEADER, ...JSON_HEADERS },
        body: JSON.stringify({ text: "moderated" }),
      });
      expect(res.status).toBe(200);
    });
  });

  describe("DELETE /comments/:commentid/", () => {
    it("returns 401 without Authorization", async () => {
      const tree = (await fetch(`http://localhost/comments/${COMMUNITY_POSTID}/`).then((r) =>
        r.json()
      )) as Comment[];
      const cid = tree[0].commentid;
      const res = await fetch(`http://localhost/comments/${cid}/`, { method: "DELETE" });
      expect(res.status).toBe(401);
    });

    it("author can delete their own comment; subsequent GET no longer includes it", async () => {
      const tree = (await fetch(`http://localhost/comments/${COMMUNITY_POSTID}/`).then((r) =>
        r.json()
      )) as Comment[];
      const myComment = tree.find((c) => c.email === MOCK_USER_EMAIL)!;
      const res = await fetch(`http://localhost/comments/${myComment.commentid}/`, {
        method: "DELETE",
        headers: AUTH_HEADER,
      });
      expect(res.status).toBe(204);

      const tree2 = (await fetch(`http://localhost/comments/${COMMUNITY_POSTID}/`).then((r) =>
        r.json()
      )) as Comment[];
      function findById(arr: Comment[], id: number): Comment | undefined {
        for (const c of arr) {
          if (c.commentid === id) return c;
          const inChild = findById(c.childComments ?? [], id);
          if (inChild) return inChild;
        }
        return undefined;
      }
      expect(findById(tree2, myComment.commentid)).toBeUndefined();
    });

    it("returns 403 when non-author non-admin tries to delete", async () => {
      const tree = (await fetch(`http://localhost/comments/${COMMUNITY_POSTID}/`).then((r) =>
        r.json()
      )) as Comment[];
      const otherComment = tree.find((c) => c.email !== MOCK_USER_EMAIL)!;
      const res = await fetch(`http://localhost/comments/${otherComment.commentid}/`, {
        method: "DELETE",
        headers: AUTH_HEADER,
      });
      expect(res.status).toBe(403);
    });
  });
});
