import { describe, it, expect } from "vitest";
import { formatJob } from "../utils/formatJob";
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

describe("formatJob", () => {
  it("emits 체험형 for non-convertible intern", () => {
    expect(formatJob(base).jobBadges).toEqual(["체험형"]);
  });
  it("emits 전환형 for convertible intern", () => {
    expect(formatJob({ ...base, isFulltimeConvertible: true }).jobBadges).toEqual(["전환형"]);
  });
  it("emits no intern badge for fulltime, but global if flagged", () => {
    expect(
      formatJob({ ...base, isFulltimePosition: true, isOnlyForInternationalUniversity: true })
        .jobBadges
    ).toEqual(["해외대전형"]);
  });
  it("preserves undefined dueDate", () => {
    expect(formatJob(base).jobPosting.dueDate).toBeUndefined();
  });
});
