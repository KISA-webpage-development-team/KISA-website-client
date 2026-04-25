import { describe, it, expect } from "vitest";
import {
  isFulltime,
  isIntern,
  isConvertibleIntern,
  isExperientialIntern,
  isGlobalOnly,
} from "../utils/jobPredicates";
import type { Job } from "../types/jobs";

const base: Job = {
  jobID: 1,
  company: "C",
  position: "P",
  link: "x",
  isFulltimePosition: false,
  isFulltimeConvertible: false,
  isOnlyForInternationalUniversity: false,
  source: "wanted-api",
};

describe("jobPredicates", () => {
  it("isFulltime / isIntern are inverses", () => {
    expect(isFulltime({ ...base, isFulltimePosition: true })).toBe(true);
    expect(isIntern({ ...base, isFulltimePosition: true })).toBe(false);
    expect(isIntern({ ...base, isFulltimePosition: false })).toBe(true);
  });

  it("convertible intern requires intern + convertible flag", () => {
    expect(isConvertibleIntern({ ...base, isFulltimeConvertible: true })).toBe(
      true
    );
    expect(
      isConvertibleIntern({
        ...base,
        isFulltimePosition: true,
        isFulltimeConvertible: true,
      })
    ).toBe(false);
  });

  it("experiential intern is intern AND not convertible", () => {
    expect(isExperientialIntern(base)).toBe(true);
    expect(
      isExperientialIntern({ ...base, isFulltimeConvertible: true })
    ).toBe(false);
    expect(
      isExperientialIntern({ ...base, isFulltimePosition: true })
    ).toBe(false);
  });

  it("isGlobalOnly reads the flag", () => {
    expect(
      isGlobalOnly({ ...base, isOnlyForInternationalUniversity: true })
    ).toBe(true);
    expect(isGlobalOnly(base)).toBe(false);
  });
});
