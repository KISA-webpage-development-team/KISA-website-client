import { BoardType } from "@/types/board";

/**
 * Per-board capability flags.
 *
 * Single source of truth for behavior that varies between boards. The
 * `BoardTemplate` only reads `adminPostOnly` (CTA gating); the other three
 * flags are passed through to detail / create flows in later lanes.
 *
 * Never branch on `boardType` directly — always read from this matrix.
 */
export type BoardCapability = {
  /** Anonymous users may submit a post (vs. signed-in only). */
  allowAnonymousPost: boolean;
  /** Anonymous users may submit a comment. */
  allowAnonymousComment: boolean;
  /** Comments are enabled at all on this board. */
  commentsEnabled: boolean;
  /** Only admins see the 글쓰기 (create-post) CTA. */
  adminPostOnly: boolean;
};

export const BOARD_CAPABILITIES: Record<BoardType, BoardCapability> = {
  [BoardType.Announcement]: {
    allowAnonymousPost: false,
    allowAnonymousComment: false,
    commentsEnabled: false,
    adminPostOnly: true,
  },
  [BoardType.BuyAndSell]: {
    allowAnonymousPost: false,
    allowAnonymousComment: false,
    commentsEnabled: true,
    adminPostOnly: false,
  },
  [BoardType.Housing]: {
    allowAnonymousPost: false,
    allowAnonymousComment: false,
    commentsEnabled: true,
    adminPostOnly: false,
  },
  [BoardType.JobAnnouncement]: {
    allowAnonymousPost: false,
    allowAnonymousComment: false,
    commentsEnabled: true,
    adminPostOnly: false,
  },
  [BoardType.Sponsor]: {
    allowAnonymousPost: false,
    allowAnonymousComment: false,
    commentsEnabled: true,
    adminPostOnly: false,
  },
  [BoardType.Academic]: {
    allowAnonymousPost: true,
    allowAnonymousComment: true,
    commentsEnabled: true,
    adminPostOnly: false,
  },
  [BoardType.Career]: {
    allowAnonymousPost: true,
    allowAnonymousComment: true,
    commentsEnabled: true,
    adminPostOnly: false,
  },
  [BoardType.Community]: {
    allowAnonymousPost: true,
    allowAnonymousComment: true,
    commentsEnabled: true,
    adminPostOnly: false,
  },
  [BoardType.Concern]: {
    allowAnonymousPost: true,
    allowAnonymousComment: true,
    commentsEnabled: true,
    adminPostOnly: false,
  },
};

export function getBoardCapability(boardType: BoardType): BoardCapability {
  return BOARD_CAPABILITIES[boardType];
}
