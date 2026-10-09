// /about/members board roster (backend: /api/v2/members)

type BoardTier = "president" | "member";

interface BoardEntry {
  boardMemberID: number;
  name: string;
  major: string;
  classYear: number; // graduation year
  roles: string[];
  isLead: boolean;
  tier: BoardTier;
}

// Published board year; entries are president tier first, then stored order.
interface BoardYear {
  startYear: number; // 2026 is the 26-27 board
  label: string; // "26-27"
  entries: BoardEntry[];
}

interface AdminBoardEntry extends BoardEntry {
  startYear: number;
  position: number;
  createdBy: string | null;
  updatedBy: string | null;
  created: string;
  updated: string;
}

interface AdminBoardYear {
  startYear: number;
  label: string;
  published: boolean;
  entries: AdminBoardEntry[];
}

type BoardEntryFields = Pick<
  BoardEntry,
  "name" | "major" | "classYear" | "roles" | "isLead" | "tier"
>;

interface CreateBoardYearBody {
  startYear: number;
  copyFrom?: number;
}

export type {
  BoardTier,
  BoardEntry,
  BoardYear,
  AdminBoardEntry,
  AdminBoardYear,
  BoardEntryFields,
  CreateBoardYearBody,
};
