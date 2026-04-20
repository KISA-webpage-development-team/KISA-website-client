// Tests for useJobsQueryParams — Lane 1.8 (partial; see PR for spec drift notes).
//
// These cover the three "cascade" assertions from the plan that align with the
// actual hook implementation. The plan's additional util/hook test cases are
// bailed out in the PR body because the specified functions / filters do not
// exist on the current hook surface.

import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";

import type {
  EmploymentType,
  InternshipType,
  JobCategory,
} from "../types/jobs";

const ctxState = vi.hoisted(() => ({
  category: undefined as JobCategory | undefined,
  employmentType: undefined as EmploymentType | undefined,
  internshipTypes: [] as InternshipType[],
  startDate: undefined as Date | undefined,
  endDate: undefined as Date | undefined,
}));

vi.mock("../contexts/JobsCuratorContext", () => ({
  useJobsCurator: () => ({
    category: ctxState.category,
    setCategory: vi.fn(),
    selectedCountry: "한국",
    setSelectedCountry: vi.fn(),
    employmentType: ctxState.employmentType,
    setEmploymentType: vi.fn(),
    internshipTypes: ctxState.internshipTypes,
    setInternshipTypes: vi.fn(),
    startDate: ctxState.startDate,
    setStartDate: vi.fn(),
    endDate: ctxState.endDate,
    setEndDate: vi.fn(),
  }),
}));

import useJobsQueryParams from "../hooks/useJobsQueryParams";

beforeEach(() => {
  ctxState.category = undefined;
  ctxState.employmentType = undefined;
  ctxState.internshipTypes = [];
  ctxState.startDate = undefined;
  ctxState.endDate = undefined;
});

describe("useJobsQueryParams — tag cascade", () => {
  it("employment='intern' assembles tags with both 'intern' and the active internshipTypes", () => {
    ctxState.employmentType = "intern";
    ctxState.internshipTypes = ["experiential", "convertible"];

    const { result } = renderHook(() => useJobsQueryParams());

    expect(result.current.tags).toEqual(
      expect.arrayContaining(["intern", "experiential", "convertible"])
    );
    expect(result.current.tags).toHaveLength(3);
  });

  it("employment='fulltime' emits only the 'fulltime' tag — internshipTypes are excluded", () => {
    ctxState.employmentType = "fulltime";
    // Even if stale internshipTypes are present in context, hook must not emit them.
    ctxState.internshipTypes = ["experiential", "convertible"];

    const { result } = renderHook(() => useJobsQueryParams());

    expect(result.current.tags).toEqual(["fulltime"]);
  });

  it("emits no tags when employmentType is undefined", () => {
    ctxState.employmentType = undefined;
    ctxState.internshipTypes = ["experiential"];

    const { result } = renderHook(() => useJobsQueryParams());

    expect(result.current.tags).toEqual([]);
  });
});
