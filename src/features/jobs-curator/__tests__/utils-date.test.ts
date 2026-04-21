// Tests for utils/date.ts API-string helpers (Lane 1.8, decision 2-A).
//
// The hook previously kept a private `toAPIDateString` helper; lane 1.8 promotes
// it into `utils/date.ts` as `toApiDateString` and adds the inverse
// `parseFromApi`. These tests pin the round-trip + year-boundary contract so a
// future TZ-sensitive refactor can't silently drift.

import { describe, it, expect } from "vitest";
import { toApiDateString, parseFromApi } from "../utils/date";

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
