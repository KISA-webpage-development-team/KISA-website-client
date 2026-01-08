import { useEffect, useState, useCallback } from "react";
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

  // Get filtered KISA jobs based on query params
  const { filteredJobs: kisaJobs, hasKisaJobs } = useKisaJobs(queryParams);

  // Reset pagination when query params change
  useEffect(() => {
    setJobs([]);
    setNextUrl(null);
    setHasMore(true);
    setError(undefined);
    setStatus("loading");
  }, [queryParams]);

  const fetchJobs = useCallback(
    async (isLoadMore = false) => {
      try {
        const paramsWithPagination = {
          ...queryParams,
          limit: LIMIT,
        };

        // Simulate loading delay for better UX
        if (isLoadMore) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        const res: JobsResponse = await getJobs(paramsWithPagination);
        // const res: JobsResponse = await getJobsMock(paramsWithPagination);
        const newJobs = res?.jobs || [];

        if (isLoadMore) {
          setJobs((prev) => [...prev, ...newJobs]);
        } else {
          // For initial load, combine KISA jobs with API jobs
          const allJobs = hasKisaJobs ? [...kisaJobs, ...newJobs] : newJobs;
          setJobs(allJobs);
        }

        // Use the next field from API response for pagination
        setNextUrl(res?.next || null);
        setHasMore(!!res?.next);
        setStatus("success");
      } catch (error) {
        setStatus("error");
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred.");
        }
      }
    },
    [queryParams, kisaJobs, hasKisaJobs]
  );

  // Initial load
  useEffect(() => {
    if (status === "loading") {
      fetchJobs(false);
    }
  }, [fetchJobs, status]);

  const loadMore = useCallback(() => {
    if (!hasMore || isLoadingMore || !nextUrl) return;

    setIsLoadingMore(true);

    // Use the next URL directly from the API response
    const fetchNextPage = async () => {
      try {
        const res: JobsResponse = await getJobsByNextUrl(nextUrl);
        // const res: JobsResponse = await getJobsByNextUrlMock(nextUrl);
        const newJobs = res?.jobs || [];

        setJobs((prev) => [...prev, ...newJobs]);
        setNextUrl(res?.next || null);
        setHasMore(!!res?.next);
      } catch (error) {
        setStatus("error");
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setIsLoadingMore(false);
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
