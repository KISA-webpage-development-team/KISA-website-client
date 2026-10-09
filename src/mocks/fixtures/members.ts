import type { AdminBoardEntry, BoardTier } from "@/types/members";

/**
 * Members fixtures — seed data for the MSW members handlers.
 *
 * 25-26 and 24-25 are published; 26-27 is an unpublished draft.
 */
const ADMIN = "admin@umich.edu";

export const mockBoardYears: { startYear: number; published: boolean }[] = [
  { startYear: 2026, published: false },
  { startYear: 2025, published: true },
  { startYear: 2024, published: true },
];

let nextID = 1;

const entry = (
  startYear: number,
  tier: BoardTier,
  position: number,
  name: string,
  major: string,
  classYear: number,
  roles: string[],
  isLead = false
): AdminBoardEntry => ({
  boardMemberID: nextID++,
  startYear,
  name,
  major,
  classYear,
  roles,
  isLead,
  tier,
  position,
  createdBy: ADMIN,
  updatedBy: ADMIN,
  created: "2026-09-01T12:00:00",
  updated: "2026-09-01T12:00:00",
});

export const mockBoardEntries: AdminBoardEntry[] = [
  entry(2026, "president", 0, "Minji Kim", "Economics", 2027, ["President"]),
  entry(2026, "member", 0, "Seoyeon Choi", "Psychology", 2029, ["Design Lead"], true),

  entry(2025, "president", 0, "Jin Wook Shin", "Computer Engineering", 2027, ["President Lead"]),
  entry(2025, "president", 1, "Jisang Um", "IOE", 2026, ["Vice President Lead"]),
  entry(2025, "member", 0, "Jessica Moon", "Information Analysis", 2027, ["Event Planning Lead/Finance"], true),
  entry(2025, "member", 1, "Seungmin Shin", "Statistics", 2025, ["Event Planning"]),
  entry(2025, "member", 2, "Junhee Han", "Mechanical Engineering", 2028, ["Finance"]),
  entry(2025, "member", 3, "Junho Lee", "Education", 2028, ["Outreach Lead"], true),
  entry(2025, "member", 4, "Haeun Lee", "BHS", 2028, ["Web Development", "Design"]),

  entry(2024, "president", 0, "Daniel Park", "Economics", 2025, ["President"]),
  entry(2024, "president", 1, "Jisang Um", "IOE", 2026, ["Vice President - OP"]),
  entry(2024, "member", 0, "Seungmin Shin", "Statistics", 2025, ["Social Media/Marketing"]),
];
