import { describe, expect, it } from "vitest";
import {
  availableStartYears,
  boardYearLabel,
  roleSuggestions,
} from "@/features/members-admin/utils/boardYear";
import type { AdminBoardYear } from "@/types/members";

const year = (startYear: number, roles: string[][]): AdminBoardYear => ({
  startYear,
  label: boardYearLabel(startYear),
  published: true,
  entries: roles.map((entryRoles, i) => ({
    boardMemberID: startYear * 100 + i,
    startYear,
    name: `Person ${i}`,
    major: "CS",
    classYear: 2027,
    roles: entryRoles,
    isLead: false,
    tier: "member",
    position: i,
    createdBy: null,
    updatedBy: null,
    created: "2026-01-01T00:00:00",
    updated: "2026-01-01T00:00:00",
  })),
});

describe("boardYearLabel", () => {
  it("derives the two-year label", () => {
    expect(boardYearLabel(2026)).toBe("26-27");
    expect(boardYearLabel(2009)).toBe("09-10");
    expect(boardYearLabel(2099)).toBe("99-00");
  });
});

describe("availableStartYears", () => {
  it("lists next year down to 2000, newest first, skipping taken years", () => {
    const years = availableStartYears([2026, 2025], new Date(2026, 9, 9));
    expect(years.slice(0, 3)).toEqual([2027, 2024, 2023]);
    expect(years[years.length - 1]).toBe(2000);
  });
});

describe("roleSuggestions", () => {
  it("collects distinct labels from the year and the year before, sorted", () => {
    const years = [
      year(2026, [["Finance"], ["Design", "Web Development"]]),
      year(2025, [["Event Planning"], ["Finance"]]),
      year(2024, [["Outreach"]]),
    ];
    expect(roleSuggestions(years, 2026)).toEqual([
      "Design", "Event Planning", "Finance", "Web Development",
    ]);
  });
});
