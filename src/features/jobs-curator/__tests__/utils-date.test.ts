// Tests for utils/date.ts API-string helpers (Lane 1.8, decision 2-A).
//
// The hook previously kept a private `toAPIDateString` helper; lane 1.8 promotes
// it into `utils/date.ts` as `toApiDateString` and adds the inverse
// `parseFromApi`. These tests pin the round-trip + year-boundary contract so a
// future TZ-sensitive refactor can't silently drift.

import { describe, it, expect } from "vitest";
import { toApiDateString, parseFromApi, isPastLocal } from "../utils/date";
import { getDefaultInternshipDateRange } from "../utils/getDefaultDateRange";

describe("utils/date — toApiDateString / parseFromApi round-trip", () => {
  it.each(["2026-04-20", "2026-12-31", "2027-01-01"])(
    "round-trips %s without drift",
    (s) => {
      expect(toApiDateString(parseFromApi(s))).toBe(s);
    }
  );

  it("parses year-boundary '2026-12-31' and formats back to the same string", () => {
    const d = parseFromApi("2026-12-31");
    expect(toApiDateString(d)).toBe("2026-12-31");
  });

  it("parses '2027-01-01' (just past year boundary) without off-by-one", () => {
    const d = parseFromApi("2027-01-01");
    expect(toApiDateString(d)).toBe("2027-01-01");
  });

  it("toApiDateString returns undefined for undefined input", () => {
    expect(toApiDateString(undefined)).toBeUndefined();
  });
});

describe("utils/date — isPastLocal", () => {
  it("returns false for today", () => {
    const today = new Date();
    expect(isPastLocal(today)).toBe(false);
  });
  it("returns true for yesterday", () => {
    const y = new Date();
    y.setDate(y.getDate() - 1);
    expect(isPastLocal(y)).toBe(true);
  });
  it("returns false for tomorrow", () => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    expect(isPastLocal(t)).toBe(false);
  });
  it("returns true across year boundary (Dec 31 prev year vs Jan 1 current)", () => {
    // Dec 31 of last year is always before today (today is in current year or later).
    const lastDec31 = new Date(new Date().getFullYear() - 1, 11, 31);
    expect(isPastLocal(lastDec31)).toBe(true);
  });
  it("future date in next year is not past (year-boundary)", () => {
    // Guards against buggy impls that compare month/date without year, e.g.
    // `date.getMonth() < now.getMonth() && date.getDate() < now.getDate()` —
    // such an impl would wrongly say "Jan 1 next year" is in the past when
    // today is in Dec.
    const now = new Date();
    const nextYearJan1 = new Date(now.getFullYear() + 1, 0, 1);
    expect(isPastLocal(nextYearJan1)).toBe(false);
  });
});

describe("getDefaultInternshipDateRange — branch coverage", () => {
  it("during summer: today + 3 months", () => {
    const r = getDefaultInternshipDateRange(new Date(2026, 5, 15)); // Jun 15
    expect(r.start).toEqual(new Date(2026, 5, 15));
    expect(r.end).toEqual(new Date(2026, 8, 15));
  });
  it("fall semester: next month + 3 months", () => {
    const r = getDefaultInternshipDateRange(new Date(2026, 9, 1)); // Oct 1
    expect(r.start).toEqual(new Date(2026, 10, 1));
    expect(r.end).toEqual(new Date(2027, 1, 1));
  });
  it("pre-summer (Jan–Apr): this year's summer window", () => {
    // NOTE: Originally labeled "post-Feb", but the `isAfterFebruary` branch in
    // getDefaultInternshipDateRange is unreachable as written (year is derived
    // from today.getFullYear(), so today >= Feb 1 of year+1 can never hold).
    // This case actually exercises the final pre-summer `else` branch.
    const r = getDefaultInternshipDateRange(new Date(2026, 2, 15)); // Mar 15
    expect(r.start).toEqual(new Date(2026, 4, 1));
    expect(r.end).toEqual(new Date(2026, 7, 31));
  });
});
