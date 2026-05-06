import { http, HttpResponse } from "msw";
import { BoardType } from "@/types/board";
import type { NewPostBody, UpdatePostBody } from "@/types/post";
import {
  MOCK_USER_EMAIL,
  getPostsStore,
  nextPostId,
  resetPostsStore,
} from "../fixtures/posts";

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

export const postsHandlers = [
  http.get("*/posts/:postid/", ({ params }) => {
    const id = Number(params.postid);
    const store = getPostsStore();
    const post = store.get(id);
    if (!post) {
      return HttpResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return HttpResponse.json(post);
  }),

  http.post("*/posts/", async ({ request }) => {
    if (!requireAuth(request.headers.get("Authorization"))) {
      return HttpResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = (await request.json()) as NewPostBody;
    if (body.type === BoardType.Announcement && !isAdmin()) {
      return HttpResponse.json(
        { error: "Admin required for announcement creation" },
        { status: 403 }
      );
    }
    const id = nextPostId();
    const store = getPostsStore();
    store.set(id, {
      postid: id,
      title: body.title,
      created: new Date().toISOString(),
      type: body.type,
      fullname: body.fullname,
      email: body.email,
      readCount: body.readCount ?? 0,
      commentsCount: 0,
      anonymous: body.anonymous,
      likesCount: 0,
      text: body.text,
      isAnnouncement: body.isAnnouncement,
    });
    return HttpResponse.json({ postid: id, message: "Created" });
  }),

  http.patch("*/posts/readCount/:postid/", ({ params }) => {
    const id = Number(params.postid);
    const store = getPostsStore();
    const post = store.get(id);
    if (!post) {
      return HttpResponse.json({ error: "Post not found" }, { status: 404 });
    }
    store.set(id, { ...post, readCount: post.readCount + 1 });
    return HttpResponse.json({ message: "OK" });
  }),

  http.patch("*/posts/:postid/", async ({ request, params }) => {
    if (!requireAuth(request.headers.get("Authorization"))) {
      return HttpResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const id = Number(params.postid);
    const store = getPostsStore();
    const post = store.get(id);
    if (!post) {
      return HttpResponse.json({ error: "Post not found" }, { status: 404 });
    }
    if (post.email !== MOCK_USER_EMAIL && !isAdmin()) {
      return HttpResponse.json(
        { error: "Author or admin required" },
        { status: 403 }
      );
    }
    const body = (await request.json()) as UpdatePostBody;
    store.set(id, {
      ...post,
      type: body.type,
      title: body.title,
      text: body.text,
      isAnnouncement: body.isAnnouncement,
    });
    return HttpResponse.json({ message: "Updated" });
  }),

  http.delete("*/posts/:postid/", ({ request, params }) => {
    if (!requireAuth(request.headers.get("Authorization"))) {
      return HttpResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const id = Number(params.postid);
    const store = getPostsStore();
    const post = store.get(id);
    if (!post) {
      return HttpResponse.json({ error: "Post not found" }, { status: 404 });
    }
    if (post.email !== MOCK_USER_EMAIL && !isAdmin()) {
      return HttpResponse.json(
        { error: "Author or admin required" },
        { status: 403 }
      );
    }
    store.delete(id);
    return HttpResponse.json({ message: "Deleted" });
  }),
];

export { resetPostsStore };
