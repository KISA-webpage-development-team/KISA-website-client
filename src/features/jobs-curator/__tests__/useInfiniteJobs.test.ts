import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import useInfiniteJobs from "../hooks/useInfiniteJobs";
import * as queries from "@/apis/jobs/queries";
import type { Job } from "../types/jobs";

const j = (id: number): Job => ({
  jobID: id,
  company: "C",
  position: "P",
  link: "x",
  isFulltimePosition: false,
  isFulltimeConvertible: false,
  isOnlyForInternationalUniversity: false,
  source: "wanted-api",
});

const params = {
  category: undefined,
  tags: [],
  startDate: undefined,
  endDate: undefined,
};

beforeEach(() => vi.restoreAllMocks());

describe("useInfiniteJobs", () => {
  it("loads initial page", async () => {
    vi.spyOn(queries, "getJobs").mockResolvedValue({
      jobs: [j(1), j(2)],
      next: null,
    });
    const { result } = renderHook(() => useInfiniteJobs(params));
    await waitFor(() => expect(result.current.status).toBe("success"));
    expect(result.current.jobs.map((x) => x.jobID)).toEqual([1, 2]);
  });

  it("preserves jobs when loadMore fails", async () => {
    vi.spyOn(queries, "getJobs").mockResolvedValue({
      jobs: [j(1)],
      next: "/n",
    });
    vi.spyOn(queries, "getJobsByNextUrl").mockRejectedValue(new Error("net"));
    const { result } = renderHook(() => useInfiniteJobs(params));
    await waitFor(() => expect(result.current.hasMore).toBe(true));
    act(() => result.current.loadMore());
    await waitFor(() => expect(result.current.loadMoreError).toBeDefined());
    expect(result.current.status).toBe("success");
    expect(result.current.jobs).toHaveLength(1);
  });

  it("ignores stale initial response", async () => {
    let resolveFirst!: (v: any) => void;
    const first = new Promise((r) => (resolveFirst = r));
    const spy = vi
      .spyOn(queries, "getJobs")
      .mockImplementationOnce(() => first as any)
      .mockResolvedValueOnce({ jobs: [j(99)], next: null });
    const { result, rerender } = renderHook(
      ({ p }) => useInfiniteJobs(p),
      { initialProps: { p: params } }
    );
    rerender({ p: { ...params, category: "developer" } });
    await waitFor(() => expect(spy).toHaveBeenCalledTimes(2));
    resolveFirst({ jobs: [j(1)], next: null });
    await waitFor(() => expect(result.current.status).toBe("success"));
    expect(result.current.jobs.map((x) => x.jobID)).toEqual([99]);
  });

  it("resets isLoadingMore when params change mid-loadMore", async () => {
    let resolveNext!: (v: any) => void;
    const nextPromise = new Promise((r) => (resolveNext = r));

    vi.spyOn(queries, "getJobs")
      .mockResolvedValueOnce({ jobs: [j(1)], next: "/n" })
      .mockResolvedValueOnce({ jobs: [j(2)], next: null });
    vi.spyOn(queries, "getJobsByNextUrl").mockImplementationOnce(() => nextPromise as any);

    const { result, rerender } = renderHook(({ p }) => useInfiniteJobs(p), { initialProps: { p: params } });
    await waitFor(() => expect(result.current.hasMore).toBe(true));

    act(() => result.current.loadMore());
    await waitFor(() => expect(result.current.isLoadingMore).toBe(true));

    // Filter changes mid-flight
    rerender({ p: { ...params, category: "developer" } });

    // Initial fetch for the new params completes
    await waitFor(() => expect(result.current.jobs.map((x) => x.jobID)).toEqual([2]));

    // Now resolve the stale loadMore — it should bail and NOT touch state
    resolveNext({ jobs: [j(99)], next: "/x" });

    // Verify isLoadingMore was reset by the params-change effect
    expect(result.current.isLoadingMore).toBe(false);
    expect(result.current.loadMoreError).toBeUndefined();
  });
});
