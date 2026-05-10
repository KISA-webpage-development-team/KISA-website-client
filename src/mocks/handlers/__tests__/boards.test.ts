import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { setupServer } from "msw/node";
import { boardsHandlers } from "../boards";
import { BoardType } from "@/types/board";

const server = setupServer(...boardsHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const ALL_BOARDS: BoardType[] = [
  BoardType.JobAnnouncement,
  BoardType.Announcement,
  BoardType.BuyAndSell,
  BoardType.Housing,
  BoardType.Sponsor,
  BoardType.Community,
  BoardType.Concern,
  BoardType.Academic,
  BoardType.Career,
];

const EVERYKISA_BOARDS: BoardType[] = [
  BoardType.Community,
  BoardType.Concern,
  BoardType.Academic,
  BoardType.Career,
];

const NON_EVERYKISA_BOARDS: BoardType[] = [
  BoardType.JobAnnouncement,
  BoardType.Announcement,
  BoardType.BuyAndSell,
  BoardType.Housing,
  BoardType.Sponsor,
];

describe("MSW boards handlers", () => {
  describe("GET /boards/:boardType/posts/", () => {
    it.each(ALL_BOARDS)(
      "%s: returns 200 with { results: SimplePost[] } and respects size+page",
      async (boardType) => {
        const res = await fetch(
          `http://localhost/boards/${boardType}/posts/?size=10&page=0`
        );
        expect(res.status).toBe(200);
        const body = await res.json();
        expect(Array.isArray(body.results)).toBe(true);
        expect(body.results.length).toBeGreaterThan(0);
        expect(body.results.length).toBeLessThanOrEqual(10);
        for (const post of body.results) {
          expect(typeof post.postid).toBe("number");
          expect(typeof post.title).toBe("string");
          expect(typeof post.created).toBe("string");
          expect(post.type).toBe(boardType);
          expect(typeof post.fullname).toBe("string");
          expect(typeof post.email).toBe("string");
          expect(typeof post.readCount).toBe("number");
          expect(typeof post.commentsCount).toBe("number");
          expect(typeof post.anonymous).toBe("boolean");
          expect(typeof post.likesCount).toBe("number");
        }
      }
    );

    it.each(ALL_BOARDS)(
      "%s: paginates — page 0 size=20 yields up to 20; page 1 yields the next slice",
      async (boardType) => {
        const page0 = await fetch(
          `http://localhost/boards/${boardType}/posts/?size=20&page=0`
        ).then((r) => r.json());
        const page1 = await fetch(
          `http://localhost/boards/${boardType}/posts/?size=20&page=1`
        ).then((r) => r.json());
        expect(page0.results.length).toBeGreaterThan(0);
        expect(page0.results.length).toBeLessThanOrEqual(20);
        // Results across pages do not overlap by postid.
        const ids0 = new Set(page0.results.map((p: { postid: number }) => p.postid));
        for (const p of page1.results) {
          expect(ids0.has(p.postid)).toBe(false);
        }
      }
    );

    it("returns empty results for page beyond fixture range", async () => {
      const res = await fetch(
        `http://localhost/boards/${BoardType.Sponsor}/posts/?size=10&page=999`
      );
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.results).toEqual([]);
    });
  });

  describe("GET /boards/:boardType/announcements/", () => {
    it.each(ALL_BOARDS)(
      "%s: returns 200 with { results: SimplePost[] } and at least 2 records",
      async (boardType) => {
        const res = await fetch(
          `http://localhost/boards/${boardType}/announcements/`
        );
        expect(res.status).toBe(200);
        const body = await res.json();
        expect(Array.isArray(body.results)).toBe(true);
        expect(body.results.length).toBeGreaterThanOrEqual(2);
        for (const post of body.results) {
          expect(post.type).toBe(boardType);
          expect(typeof post.likesCount).toBe("number");
          expect(typeof post.anonymous).toBe("boolean");
        }
      }
    );
  });

  describe("GET /boards/:boardType/count/", () => {
    it.each(ALL_BOARDS)(
      "%s: returns 200 with { postCount: number } matching fixture size",
      async (boardType) => {
        const res = await fetch(
          `http://localhost/boards/${boardType}/count/`
        );
        expect(res.status).toBe(200);
        const body = await res.json();
        expect(typeof body.postCount).toBe("number");
        expect(body.postCount).toBeGreaterThanOrEqual(20);
      }
    );
  });

  describe("Anonymous-flag invariants", () => {
    it.each(EVERYKISA_BOARDS)(
      "%s (everykisa): fixture has BOTH anonymous: true AND anonymous: false posts",
      async (boardType) => {
        const res = await fetch(
          `http://localhost/boards/${boardType}/posts/?size=30&page=0`
        );
        const body = await res.json();
        const anonTrue = body.results.some(
          (p: { anonymous: boolean }) => p.anonymous === true
        );
        const anonFalse = body.results.some(
          (p: { anonymous: boolean }) => p.anonymous === false
        );
        expect(anonTrue).toBe(true);
        expect(anonFalse).toBe(true);
      }
    );

    it.each(NON_EVERYKISA_BOARDS)(
      "%s (board): no fixture record has anonymous: true",
      async (boardType) => {
        const postsRes = await fetch(
          `http://localhost/boards/${boardType}/posts/?size=30&page=0`
        );
        const posts = await postsRes.json();
        for (const p of posts.results) {
          expect(p.anonymous).toBe(false);
        }
        const annRes = await fetch(
          `http://localhost/boards/${boardType}/announcements/`
        );
        const ann = await annRes.json();
        for (const a of ann.results) {
          expect(a.anonymous).toBe(false);
        }
      }
    );
  });
});
