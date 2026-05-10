import { BoardType } from "@/types/board";
import type { Post } from "@/types/post";

export const MOCK_USER_EMAIL = "tester@umich.edu";
const OTHER_USER_EMAIL = "someone-else@umich.edu";

/**
 * Posts fixture for /posts CRUD endpoints.
 *
 * Cross-lane contract — postid range:
 *   - 10000–10099 reserved for these full-body Post fixtures
 *   - 10000 is authored by MOCK_USER_EMAIL (tester) for author-update tests
 *   - 10001 is authored by OTHER_USER_EMAIL (admin-override tests)
 *   - Lanes 6.5c (comments) and 6.5d (likes) reference these postids
 *
 * Note: this fixture is independent from `mockBoardPosts` in
 * `fixtures/boards.ts` — Lane 6.5a's list-view fixture and this lane's
 * full-body fixture happen to overlap in id range but the GET endpoints
 * read from their own fixtures.
 */
const _posts: Post[] = [
  {
    postid: 10000,
    title: "오늘 학식 너무 짠데 저만 그래요?",
    created: "2026-04-01T12:00:00",
    type: BoardType.Community,
    fullname: "KISA Tester",
    email: MOCK_USER_EMAIL,
    readCount: 100,
    commentsCount: 4,
    anonymous: false,
    likesCount: 12,
    text: "이번 학기 학식이 유독 짜요. 저만 그런가요? 동의하시는 분 댓글 부탁드립니다.",
    isAnnouncement: false,
  },
  {
    postid: 10001,
    title: "MacBook Air M2 판매합니다",
    created: "2026-04-02T15:30:00",
    type: BoardType.BuyAndSell,
    fullname: "박서연",
    email: OTHER_USER_EMAIL,
    readCount: 250,
    commentsCount: 7,
    anonymous: false,
    likesCount: 5,
    text: "MacBook Air M2 256GB 판매합니다. 구매 1년 됐고 깨끗하게 사용했습니다. $850.",
    isAnnouncement: false,
  },
  {
    postid: 10002,
    title: "EECS 281 시험 후기",
    created: "2026-04-05T09:00:00",
    type: BoardType.Academic,
    fullname: "익명",
    email: "anon-poster@umich.edu",
    readCount: 320,
    commentsCount: 15,
    anonymous: true,
    likesCount: 22,
    text: "이번 281 시험 너무 빡셌어요... 평균 컷 어떻게 될지 궁금합니다.",
    isAnnouncement: false,
  },
  {
    postid: 10003,
    title: "[필독] 2026 학생회 임원 명단",
    created: "2026-01-15T09:00:00",
    type: BoardType.Announcement,
    fullname: "학생회",
    email: "kisa-admin@umich.edu",
    readCount: 850,
    commentsCount: 0,
    anonymous: false,
    likesCount: 50,
    text: "2026년 학생회 임원 명단을 공유드립니다. 회장: ..., 부회장: ...",
    isAnnouncement: true,
  },
  {
    postid: 10004,
    title: "Forest Hills 1bed 룸메이트 구함",
    created: "2026-04-10T14:00:00",
    type: BoardType.Housing,
    fullname: "이민준",
    email: "minjunl@umich.edu",
    readCount: 80,
    commentsCount: 3,
    anonymous: false,
    likesCount: 1,
    text: "Forest Hills 1bed 1bath 룸메이트 구합니다. 월 $700, 6월 입주.",
    isAnnouncement: false,
  },
];

export type PostsStore = Map<number, Post>;

let store: PostsStore = new Map(_posts.map((p) => [p.postid, p]));
let nextId = 20000;

export function getPostsStore(): PostsStore {
  return store;
}

export function nextPostId(): number {
  return nextId++;
}

export function resetPostsStore(): void {
  store = new Map(_posts.map((p) => [p.postid, { ...p }]));
  nextId = 20000;
}
