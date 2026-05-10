/**
 * Likes fixtures — seed data for MSW likes handlers.
 *
 * Cross-lane invariant (per phase-6 plan.md Lane 6.5d):
 *   - postids referenced here must exist in 6.5b's posts fixture (range 10000-10004).
 *   - commentids referenced here must exist in 6.5c's comments fixture (range 1-8).
 *
 * A like is keyed by the (target, id, email) tuple. The handler stores them
 * as a flat array so toggling, count derivation, and per-user lookup are all
 * trivial scans.
 */

export type LikeTarget = "post" | "comment";

export interface LikeRecord {
  id: number;
  email: string;
  target: LikeTarget;
}

export const MOCK_USER_EMAIL = "tester@umich.edu";

const SEED_LIKES: LikeRecord[] = [
  // Post 10000: liked by tester + one other user (count=2 baseline).
  { id: 10000, email: MOCK_USER_EMAIL, target: "post" },
  { id: 10000, email: "alice@umich.edu", target: "post" },
  // Post 10002: liked by one other user only.
  { id: 10002, email: "bob@umich.edu", target: "post" },
  // Comment 1: liked by tester + one other (count=2 baseline).
  { id: 1, email: MOCK_USER_EMAIL, target: "comment" },
  { id: 1, email: "alice@umich.edu", target: "comment" },
  // Comment 3: liked by one other user only.
  { id: 3, email: "bob@umich.edu", target: "comment" },
];

export function getSeedLikes(): LikeRecord[] {
  return SEED_LIKES.map((l) => ({ ...l }));
}
