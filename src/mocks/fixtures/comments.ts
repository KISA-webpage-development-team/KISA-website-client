import type { Comment } from "@/types/comment";
import { BoardType } from "@/types/board";

export const MOCK_USER_EMAIL = "tester@umich.edu";

const EVERYKISA_BOARDS: ReadonlySet<BoardType> = new Set([
  BoardType.Community,
  BoardType.Concern,
  BoardType.Academic,
  BoardType.Career,
  BoardType.LivingQA,
]);

/**
 * Cross-lane postid → board-type contract. Each Comment fixture postid maps
 * to a board so the handler can apply the everykisa anonymous-flag rule.
 * Postids 10000–10004 mirror the 6.5b posts fixture exactly.
 */
export const POST_BOARD_TYPE: ReadonlyMap<number, BoardType> = new Map([
  [10000, BoardType.Community], // everykisa
  [10001, BoardType.BuyAndSell], // non-everykisa
  [10002, BoardType.Academic], // everykisa
  [10003, BoardType.Announcement], // non-everykisa
  [10004, BoardType.Housing], // non-everykisa
]);

export function isEverykisaPost(postid: number): boolean {
  const board = POST_BOARD_TYPE.get(postid);
  return board != null && EVERYKISA_BOARDS.has(board);
}

/**
 * Seed comments. The community post (10000) gets a 3-level nested tree
 * required by the lane spec; other posts get smaller fixtures so endpoint
 * coverage is exercised across the matrix.
 *
 * Tester user (`MOCK_USER_EMAIL`) authors at least one comment per post so
 * author-edit and author-delete tests can find a target.
 */
const _comments: Comment[] = [
  // Post 10000 — Community (everykisa). 3-level depth.
  {
    commentid: 1,
    postid: 10000,
    email: MOCK_USER_EMAIL,
    fullname: "KISA Tester",
    text: "이용 방법이 안 올라왔는데요",
    isCommentOfComment: false,
    parentCommentid: null,
    created: "2026-04-01T13:00:00Z",
    anonymous: true,
    secret: false,
    likesCount: 3,
    childComments: [],
  },
  {
    commentid: 2,
    postid: 10000,
    email: "dongsubk@umich.edu",
    fullname: "김동섭",
    text: "착한 사람 눈에만 보입니다",
    isCommentOfComment: true,
    parentCommentid: 1,
    created: "2026-04-01T13:30:00Z",
    anonymous: false,
    secret: false,
    likesCount: 1,
    childComments: [],
  },
  {
    commentid: 3,
    postid: 10000,
    email: "ianpark@umich.edu",
    fullname: "박이안",
    text: "개노잼 글이네요",
    isCommentOfComment: false,
    parentCommentid: null,
    created: "2026-04-01T14:00:00Z",
    anonymous: true,
    secret: false,
    likesCount: 0,
    childComments: [],
  },
  {
    commentid: 4,
    postid: 10000,
    email: "kinn@umich.edu",
    fullname: "인경민",
    text: "예의 좀 지키시죠",
    isCommentOfComment: true,
    parentCommentid: 3,
    created: "2026-04-01T14:15:00Z",
    anonymous: true,
    secret: false,
    likesCount: 2,
    childComments: [],
  },
  {
    commentid: 5,
    postid: 10000,
    email: "ianpark@umich.edu",
    fullname: "박이안",
    text: "정숙해주세요",
    isCommentOfComment: true,
    parentCommentid: 4,
    created: "2026-04-01T14:30:00Z",
    anonymous: false,
    secret: false,
    likesCount: 0,
    childComments: [],
  },

  // Post 10001 — BuyAndSell (non-everykisa). Tester comment for author tests.
  {
    commentid: 6,
    postid: 10001,
    email: MOCK_USER_EMAIL,
    fullname: "KISA Tester",
    text: "혹시 가격 협의 가능할까요?",
    isCommentOfComment: false,
    parentCommentid: null,
    created: "2026-04-02T16:00:00Z",
    anonymous: false,
    secret: false,
    likesCount: 0,
    childComments: [],
  },
  {
    commentid: 7,
    postid: 10001,
    email: "seoyeonp@umich.edu",
    fullname: "박서연",
    text: "DM 보내드렸습니다",
    isCommentOfComment: true,
    parentCommentid: 6,
    created: "2026-04-02T17:00:00Z",
    anonymous: false,
    secret: false,
    likesCount: 1,
    childComments: [],
  },

  // Post 10002 — Academic (everykisa).
  {
    commentid: 8,
    postid: 10002,
    email: MOCK_USER_EMAIL,
    fullname: "KISA Tester",
    text: "저도 똑같이 느꼈어요",
    isCommentOfComment: false,
    parentCommentid: null,
    created: "2026-04-05T10:00:00Z",
    anonymous: true,
    secret: false,
    likesCount: 5,
    childComments: [],
  },
];

export type CommentsStore = Map<number, Comment>;

let store: CommentsStore = new Map(_comments.map((c) => [c.commentid, c]));
let nextId = 10000;

export function getCommentsStore(): CommentsStore {
  return store;
}

export function nextCommentId(): number {
  return nextId++;
}

export function resetCommentsStore(): void {
  store = new Map(_comments.map((c) => [c.commentid, { ...c, childComments: [] }]));
  nextId = 10000;
}
