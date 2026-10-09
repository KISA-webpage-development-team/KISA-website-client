import type { AdminBoardYear } from "@/types/members";

/** 2026 -> "26-27". The backend derives the same label. */
export function boardYearLabel(startYear: number): string {
  const short = (year: number) => String(year % 100).padStart(2, "0");
  return `${short(startYear)}-${short(startYear + 1)}`;
}

const MIN_START_YEAR = 2000;

/**
 * Start years a new board year can take: next calendar year down to 2000,
 * newest first, skipping years that already have a board.
 */
export function availableStartYears(
  existing: number[],
  today: Date = new Date()
): number[] {
  const taken = new Set(existing);
  const years: number[] = [];
  for (let year = today.getFullYear() + 1; year >= MIN_START_YEAR; year--) {
    if (!taken.has(year)) years.push(year);
  }
  return years;
}

/**
 * Role labels to suggest while editing an entry in `startYear`: the distinct
 * labels used in that board year and the board year before it, sorted.
 */
export function roleSuggestions(
  years: AdminBoardYear[],
  startYear: number
): string[] {
  const labels = new Set<string>();
  years
    .filter((year) => year.startYear === startYear || year.startYear === startYear - 1)
    .forEach((year) =>
      year.entries.forEach((entry) => entry.roles.forEach((role) => labels.add(role)))
    );
  return [...labels].sort((a, b) => a.localeCompare(b));
}
