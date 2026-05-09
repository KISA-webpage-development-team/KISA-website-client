import { http, HttpResponse } from "msw";

import { BoardType } from "@/types/board";
import type { User, UserEditableFields } from "@/types/user";

import type { UserBoardPost } from "@/types/post";
import type { Comment } from "@/types/comment";

/**
 * Mock-mode user directory.
 *
 * Endpoints exercised by the /users/[email] view + edit pages:
 *   - GET   /users/:email/           → full User shape
 *   - GET   /users/:email/posts/     → { posts: UserBoardPost[] }
 *   - GET   /users/:email/comments/  → { comments: Comment[] }
 *   - PATCH /users/:email/           → echo updated user
 *
 * The store is per-process (resets on dev-server restart). Edits via PATCH
 * persist for subsequent GETs in the same session, which is what the form
 * success flow needs to verify the cache invalidation path.
 */

interface MockUser extends User {
  // pretend Google OAuth profile picture for self
  profileImage?: string;
}

const baseUsers: Record<string, MockUser> = {
  "tester@umich.edu": {
    email: "tester@umich.edu",
    fullname: "김민준",
    major: "Computer Science",
    gradYear: 2027,
    linkedin: "https://www.linkedin.com/in/kisa-tester/",
    created: "2024-09-01T00:00:00",
    bornYear: 2003,
    bornMonth: 6,
    bornDate: 15,
  },
  "umichkisa@gmail.com": {
    email: "umichkisa@gmail.com",
    fullname: "KISA 운영진",
    major: "Korean International Student Association",
    gradYear: 2026,
    linkedin: "https://www.linkedin.com/in/umichkisa/",
    created: "2020-09-01T00:00:00",
    bornYear: 2002,
    bornMonth: 1,
    bornDate: 1,
  },
};

const userStore = new Map<string, MockUser>(Object.entries(baseUsers));

function getOrSeedUser(email: string): MockUser {
  const existing = userStore.get(email);
  if (existing) return existing;
  // Synthesise a deterministic stranger so peer-profile flows render.
  const seeded: MockUser = {
    email,
    fullname: email.split("@")[0],
    major: "Undeclared",
    gradYear: 2026,
    linkedin: "",
    created: "2024-09-01T00:00:00",
    bornYear: 2003,
    bornMonth: 1,
    bornDate: 1,
  };
  userStore.set(email, seeded);
  return seeded;
}

// Posts authored by users — varied dates, board mix, varied readCount.
const userPosts: Record<string, UserBoardPost[]> = {
  "tester@umich.edu": [
    {
      postid: 20001,
      title: "졸업 전에 꼭 들어야 할 EECS 수업 추천",
      created: "2026-04-12T10:30:00",
      type: BoardType.Academic,
      fullname: "김민준",
      email: "tester@umich.edu",
      readCount: 248,
      anonymous: false,
      likesCount: 18,
      text: "",
      isAnnouncement: false,
    },
    {
      postid: 20002,
      title: "디트로이트 공항 픽업 같이 하실 분",
      created: "2026-03-28T18:05:00",
      type: BoardType.LivingQA,
      fullname: "김민준",
      email: "tester@umich.edu",
      readCount: 92,
      anonymous: false,
      likesCount: 4,
      text: "",
      isAnnouncement: false,
    },
    {
      postid: 20003,
      title: "한인 학생회 신입 환영회 후기",
      created: "2026-02-14T21:40:00",
      type: BoardType.Community,
      fullname: "김민준",
      email: "tester@umich.edu",
      readCount: 410,
      anonymous: false,
      likesCount: 31,
      text: "",
      isAnnouncement: false,
    },
    {
      postid: 20004,
      title: "여름방학 인턴십 합격 후기 (SWE)",
      created: "2025-12-03T09:12:00",
      type: BoardType.Career,
      fullname: "김민준",
      email: "tester@umich.edu",
      readCount: 1342,
      anonymous: false,
      likesCount: 87,
      text: "",
      isAnnouncement: false,
    },
  ],
  "umichkisa@gmail.com": [
    {
      postid: 20100,
      title: "[공지] 2026년 봄학기 환영회 안내",
      created: "2026-01-10T09:00:00",
      type: BoardType.Announcement,
      fullname: "KISA 운영진",
      email: "umichkisa@gmail.com",
      readCount: 1820,
      anonymous: false,
      likesCount: 64,
      text: "",
      isAnnouncement: true,
    },
  ],
};

const userComments: Record<string, Comment[]> = {
  "tester@umich.edu": [
    {
      commentid: 30001,
      postid: 10000,
      email: "tester@umich.edu",
      fullname: "김민준",
      text: "저도 짜다고 느꼈어요. 특히 South Quad 쪽이 심한 것 같습니다.",
      isCommentOfComment: false,
      parentCommentid: null,
      anonymous: false,
      secret: false,
      created: "2026-04-02T11:20:00",
      childComments: [],
      likesCount: 3,
    },
    {
      commentid: 30002,
      postid: 10001,
      email: "tester@umich.edu",
      fullname: "김민준",
      text: "아직 판매 중이신가요? 가격 협의 가능하신지 궁금합니다.",
      isCommentOfComment: false,
      parentCommentid: null,
      anonymous: false,
      secret: false,
      created: "2026-03-30T14:48:00",
      childComments: [],
      likesCount: 0,
    },
    {
      commentid: 30003,
      postid: 10000,
      email: "tester@umich.edu",
      fullname: "김민준",
      text: "관련해서 학식 담당 부서에 메일 보내봤습니다. 답변 오면 공유드릴게요.",
      isCommentOfComment: false,
      parentCommentid: null,
      anonymous: false,
      secret: false,
      created: "2026-02-21T19:02:00",
      childComments: [],
      likesCount: 7,
    },
  ],
  "umichkisa@gmail.com": [],
};

function unauthorized() {
  return HttpResponse.json({ error: "Decode failed" }, { status: 401 });
}

export const usersHandlers = [
  // GET /users/:email/
  http.get("*/users/:email/", ({ request, params }) => {
    const auth = request.headers.get("Authorization");
    if (!auth) return unauthorized();
    const email = decodeURIComponent(params.email as string);
    const user = getOrSeedUser(email);
    return HttpResponse.json(user);
  }),

  // GET /users/:email/posts/
  http.get("*/users/:email/posts/", ({ request, params }) => {
    const auth = request.headers.get("Authorization");
    if (!auth) return unauthorized();
    const email = decodeURIComponent(params.email as string);
    const posts = userPosts[email] ?? [];
    return HttpResponse.json({ posts });
  }),

  // GET /users/:email/comments/
  http.get("*/users/:email/comments/", ({ request, params }) => {
    const auth = request.headers.get("Authorization");
    if (!auth) return unauthorized();
    const email = decodeURIComponent(params.email as string);
    const comments = userComments[email] ?? [];
    return HttpResponse.json({ comments });
  }),

  // PATCH /users/:email/
  http.patch("*/users/:email/", async ({ request, params }) => {
    const auth = request.headers.get("Authorization");
    if (!auth) return unauthorized();
    const email = decodeURIComponent(params.email as string);
    const body = (await request.json()) as Partial<UserEditableFields>;
    const current = getOrSeedUser(email);
    const updated: MockUser = {
      ...current,
      major: body.major ?? current.major,
      gradYear:
        typeof body.gradYear === "number" ? body.gradYear : current.gradYear,
      linkedin: body.linkedin ?? current.linkedin,
    };
    userStore.set(email, updated);
    return HttpResponse.json(updated);
  }),
];
