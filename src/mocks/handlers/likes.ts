import { http, HttpResponse } from "msw";
import {
  getSeedLikes,
  type LikeRecord,
  type LikeTarget,
} from "../fixtures/likes";

let likesStore: LikeRecord[] = getSeedLikes();

export function resetLikesStore(): void {
  likesStore = getSeedLikes();
}

function isTarget(value: string | null): value is LikeTarget {
  return value === "post" || value === "comment";
}

function findLike(
  id: number,
  email: string,
  target: LikeTarget
): LikeRecord | undefined {
  return likesStore.find(
    (l) => l.id === id && l.target === target && l.email === email
  );
}

function countLikes(id: number, target: LikeTarget): number {
  return likesStore.reduce(
    (n, l) => (l.id === id && l.target === target ? n + 1 : n),
    0
  );
}

function unauthorized() {
  return HttpResponse.json({ error: "Decode failed" }, { status: 401 });
}

export const likesHandlers = [
  // Specific count routes are registered before the wildcard /likes/:id/
  // GET handler — the wildcard would otherwise swallow /posts/likes/{id} and
  // /comments/likes/{id} because MSW matches the first registered handler.
  http.get("*/posts/likes/:postid/", ({ params }) => {
    const postid = Number(params.postid);
    return HttpResponse.json({ likesCount: countLikes(postid, "post") });
  }),

  http.get("*/comments/likes/:commentid/", ({ params }) => {
    const commentid = Number(params.commentid);
    return HttpResponse.json({ likesCount: countLikes(commentid, "comment") });
  }),

  /**
   * GET /likes/:id/?email&target — has the user liked this target?
   * 200 with the like record when found; 404 when not.
   * `getLikeByUser` ignores the body on errors and treats undefined as "not
   * liked", so a 404 surfaces as a clean falsy in calling code.
   */
  http.get("*/likes/:id/", ({ request, params }) => {
    if (!request.headers.get("Authorization")) return unauthorized();

    const url = new URL(request.url);
    const email = url.searchParams.get("email");
    const target = url.searchParams.get("target");
    if (!email || !isTarget(target)) {
      return HttpResponse.json(
        { error: "missing email or target" },
        { status: 400 }
      );
    }

    const id = Number(params.id);
    const record = findLike(id, email, target);
    if (!record) {
      return HttpResponse.json({ error: "not found" }, { status: 404 });
    }
    return HttpResponse.json(record);
  }),

  /**
   * POST /likes/:id/ — body { email, target }. Idempotent: a duplicate from
   * the same (id, target, email) tuple is a no-op so optimistic-UI double-fire
   * doesn't inflate the count.
   */
  http.post("*/likes/:id/", async ({ request, params }) => {
    if (!request.headers.get("Authorization")) return unauthorized();

    const id = Number(params.id);
    const body = (await request.json()) as { email?: string; target?: string };
    if (!body?.email || !isTarget(body.target ?? null)) {
      return HttpResponse.json(
        { error: "missing email or target" },
        { status: 400 }
      );
    }
    const target = body.target as LikeTarget;

    const existing = findLike(id, body.email, target);
    if (existing) {
      return HttpResponse.json(existing, { status: 201 });
    }
    const created: LikeRecord = { id, email: body.email, target };
    likesStore.push(created);
    return HttpResponse.json(created, { status: 201 });
  }),

  http.delete("*/likes/:id/", ({ request, params }) => {
    if (!request.headers.get("Authorization")) return unauthorized();

    const url = new URL(request.url);
    const email = url.searchParams.get("email");
    const target = url.searchParams.get("target");
    if (!email || !isTarget(target)) {
      return HttpResponse.json(
        { error: "missing email or target" },
        { status: 400 }
      );
    }

    const id = Number(params.id);
    const idx = likesStore.findIndex(
      (l) => l.id === id && l.target === target && l.email === email
    );
    if (idx >= 0) likesStore.splice(idx, 1);
    return new HttpResponse(null, { status: 204 });
  }),
];
