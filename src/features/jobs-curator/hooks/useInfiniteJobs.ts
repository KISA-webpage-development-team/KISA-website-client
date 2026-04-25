import { useEffect, useState, useCallback, useRef } from "react";
import { HookStatus } from "@/types/hook";
import { Job, JobListQueryParams } from "../types/jobs";
import { getJobs, getJobsByNextUrl, JobsResponse } from "@/apis/jobs/queries";

const LIMIT = 500;

export interface UseInfiniteJobsReturn {
  jobs: Job[]; // API-only; KISA merging happens at the call site
  status: HookStatus; // tracks INITIAL load only
  error: string | undefined; // initial-load error
  hasMore: boolean;
  loadMore: () => void;
  isLoadingMore: boolean;
  loadMoreError: string | undefined;
  retryLoadMore: () => void;
}

const useInfiniteJobs = (
  queryParams: JobListQueryParams
): UseInfiniteJobsReturn => {
  const [status, setStatus] = useState<HookStatus>("loading");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string>();
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [loadMoreError, setLoadMoreError] = useState<string>();

  // Monotonic id shared across initial-load AND pagination. Any superseded
  // fetch (in either lane) bails on the equality check; the new fetch wins.
  const requestIdRef = useRef(0);

  // Unified fetch-on-queryParams effect. Keeps previous `jobs` visible
  // during refetch so the grid doesn't flicker to a spinner on every
  // filter click; results swap in atomically when the new response lands.
  // The initial mount still shows a spinner because `status` inits to
  // "loading" and `jobs` inits to [].
  useEffect(() => {
    const myId = ++requestIdRef.current;
    // Hard reset: a new query supersedes any in-flight pagination.
    setIsLoadingMore(false);
    setLoadMoreError(undefined);
    (async () => {
      try {
        const res: JobsResponse = await getJobs({
          ...queryParams,
          limit: LIMIT,
        });
        if (myId !== requestIdRef.current) return;
        setJobs(res?.jobs ?? []);
        setNextUrl(res?.next ?? null);
        setHasMore(!!res?.next);
        setError(undefined);
        setLoadMoreError(undefined);
        setStatus("success");
      } catch (e) {
        if (myId !== requestIdRef.current) return;
        setStatus("error");
        setError(
          e instanceof Error ? e.message : "An unexpected error occurred."
        );
      }
    })();
  }, [queryParams]);

  const fetchNext = useCallback(async (url: string) => {
    const myId = ++requestIdRef.current;
    setIsLoadingMore(true);
    setLoadMoreError(undefined);
    try {
      const res: JobsResponse = await getJobsByNextUrl(url);
      if (myId !== requestIdRef.current) return;
      setJobs((prev) => [...prev, ...(res?.jobs ?? [])]);
      setNextUrl(res?.next ?? null);
      setHasMore(!!res?.next);
    } catch (e) {
      if (myId !== requestIdRef.current) return;
      setLoadMoreError(
        e instanceof Error ? e.message : "An unexpected error occurred."
      );
    } finally {
      if (myId === requestIdRef.current) setIsLoadingMore(false);
    }
  }, []);

  const loadMore = useCallback(() => {
    if (!hasMore || isLoadingMore || !nextUrl) return;
    fetchNext(nextUrl);
  }, [hasMore, isLoadingMore, nextUrl, fetchNext]);

  const retryLoadMore = useCallback(() => {
    if (!nextUrl || isLoadingMore) return;
    fetchNext(nextUrl);
  }, [nextUrl, isLoadingMore, fetchNext]);

  // TODO: consider migrating to SWR or @tanstack/react-query useInfiniteQuery.
  // See docs/plans/2026-04-25-jobs-curator-cleanup.md decision D1.
  return {
    jobs,
    status,
    error,
    hasMore,
    loadMore,
    isLoadingMore,
    loadMoreError,
    retryLoadMore,
  };
};

export default useInfiniteJobs;
