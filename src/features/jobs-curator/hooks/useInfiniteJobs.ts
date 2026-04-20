import { useEffect, useState, useCallback, useRef } from "react";
import { HookStatus } from "@/types/hook";
import { Job, JobListQueryParams } from "../types/jobs";
import { getJobs, getJobsByNextUrl, JobsResponse } from "@/apis/jobs/queries";
import useKisaJobs from "./useKisaJobs";

const LIMIT = 500;

interface UseInfiniteJobsReturn {
  jobs: Job[];
  status: HookStatus;
  error: string | undefined;
  hasMore: boolean;
  loadMore: () => void;
  isLoadingMore: boolean;
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

  // Monotonic request id — only the latest in-flight fetch gets to write
  // state. Prevents superseded responses (e.g. from filter churn or a
  // StrictMode double-mount) from clobbering fresh results.
  const requestIdRef = useRef(0);

  // Get filtered KISA jobs based on query params
  const { filteredJobs: kisaJobs, hasKisaJobs } = useKisaJobs(queryParams);

  // Unified fetch-on-queryParams effect. Keeps previous `jobs` + `status`
  // visible during refetch so the grid doesn't flicker to a spinner on
  // every filter click; results swap in atomically when the new response
  // lands. The initial mount still shows a spinner because `status` inits
  // to "loading" and `jobs` inits to [].
  useEffect(() => {
    let cancelled = false;
    const myRequestId = ++requestIdRef.current;

    const run = async () => {
      try {
        const res: JobsResponse = await getJobs({
          ...queryParams,
          limit: LIMIT,
        });
        if (cancelled || myRequestId !== requestIdRef.current) return;

        const newJobs = res?.jobs ?? [];
        const allJobs = hasKisaJobs ? [...kisaJobs, ...newJobs] : newJobs;

        setJobs(allJobs);
        setNextUrl(res?.next ?? null);
        setHasMore(!!res?.next);
        setError(undefined);
        setStatus("success");
      } catch (error) {
        if (cancelled || myRequestId !== requestIdRef.current) return;
        setStatus("error");
        setError(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred."
        );
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [queryParams, kisaJobs, hasKisaJobs]);

  const loadMore = useCallback(() => {
    if (!hasMore || isLoadingMore || !nextUrl) return;

    setIsLoadingMore(true);

    const myRequestId = ++requestIdRef.current;
    // Use the next URL directly from the API response
    const fetchNextPage = async () => {
      try {
        const res: JobsResponse = await getJobsByNextUrl(nextUrl);
        if (myRequestId !== requestIdRef.current) return;
        const newJobs = res?.jobs || [];

        setJobs((prev) => [...prev, ...newJobs]);
        setNextUrl(res?.next || null);
        setHasMore(!!res?.next);
      } catch (error) {
        if (myRequestId !== requestIdRef.current) return;
        setStatus("error");
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        if (myRequestId === requestIdRef.current) {
          setIsLoadingMore(false);
        }
      }
    };

    fetchNextPage();
  }, [hasMore, isLoadingMore, nextUrl]);

  return {
    jobs,
    status,
    error,
    hasMore,
    loadMore,
    isLoadingMore,
  };
};

export default useInfiniteJobs;
