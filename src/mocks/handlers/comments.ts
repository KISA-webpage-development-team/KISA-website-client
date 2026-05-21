import { http, HttpResponse } from "msw";
import type { Comment, NewCommentBody, UpdateCommentBody } from "@/types/comment";
import {
  MOCK_USER_EMAIL,
  getCommentsStore,
  isEverykisaPost,
  nextCommentId,
  resetCommentsStore,
} from "../fixtures/comments";

const ADMIN_KEY = "kisa-mock-auth-isadmin";

function isAdmin(): boolean {
  try {
    return sessionStorage.getItem(ADMIN_KEY) === "1";
  } catch {
    return false;
  }
}

function requireAuth(authHeader: string | null): boolean {
  return Boolean(authHeader && authHeader.length > 0);
}

/**
 * Build a nested tree from the flat store for the given postid.
 * Each parent's `childComments` is populated recursively.
 */
function buildTreeForPost(postid: number): Comment[] {
  const flat = Array.from(getCommentsStore().values()).filter(
    (c) => c.postid === postid
  );
  const byId = new Map<number, Comment>();
  // Reset childComments to empty arrays so we don't leak previous tree state.
  for (const c of flat) {
    byId.set(c.commentid, { ...c, childComments: [] });
  }
  const roots: Comment[] = [];
  for (const c of byId.values()) {
    if (c.parentCommentid == null) {
      roots.push(c);
    } else {
      const parent = byId.get(c.parentCommentid);
      if (parent) {
        parent.childComments.push(c);
      } else {
        // Orphaned child (parent deleted) — surface as a root so it isn't lost.
        roots.push(c);
      }
    }
  }
  return roots;
}

export const commentsHandlers = [
  http.get("*/comments/:postid/", ({ params }) => {
    const postid = Number(params.postid);
    return HttpResponse.json(buildTreeForPost(postid));
  }),

  http.post("*/comments/:postid/", async ({ request, params }) => {
    if (!requireAuth(request.headers.get("Authorization"))) {
      return HttpResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const postid = Number(params.postid);
    const body = (await request.json()) as NewCommentBody;
    const id = nextCommentId();
    const anonymous = isEverykisaPost(postid) ? body.anonymous : false;
    const created: Comment = {
      commentid: id,
      postid,
      email: body.email,
      fullname: body.fullname,
      text: body.text,
      isCommentOfComment: body.isCommentOfComment,
      parentCommentid: body.parentCommentid,
      anonymous,
      secret: body.secret,
      created: new Date().toISOString(),
      likesCount: 0,
      childComments: [],
    };
    getCommentsStore().set(id, created);
    return HttpResponse.json({ commentid: id, message: "Comment posted successfully" });
  }),

  http.put("*/comments/:commentid/", async ({ request, params }) => {
    if (!requireAuth(request.headers.get("Authorization"))) {
      return HttpResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const id = Number(params.commentid);
    const store = getCommentsStore();
    const existing = store.get(id);
    if (!existing) {
      return HttpResponse.json({ error: "Not found" }, { status: 404 });
    }
    if (existing.email !== MOCK_USER_EMAIL && !isAdmin()) {
      return HttpResponse.json(
        { error: "Author or admin required" },
        { status: 403 }
      );
    }
    const body = (await request.json()) as UpdateCommentBody;
    store.set(id, { ...existing, text: body.text });
    return HttpResponse.json({ commentid: id, text: body.text });
  }),

  http.delete("*/comments/:commentid/", ({ request, params }) => {
    if (!requireAuth(request.headers.get("Authorization"))) {
      return HttpResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const id = Number(params.commentid);
    const store = getCommentsStore();
    const existing = store.get(id);
    if (!existing) {
      return HttpResponse.json({ error: "Not found" }, { status: 404 });
    }
    if (existing.email !== MOCK_USER_EMAIL && !isAdmin()) {
      return HttpResponse.json(
        { error: "Author or admin required" },
        { status: 403 }
      );
    }
    store.delete(id);
    return new HttpResponse(null, { status: 204 });
  }),
];

export { resetCommentsStore };
