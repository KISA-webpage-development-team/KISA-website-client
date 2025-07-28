import { useEffect, useState, useCallback } from "react";
import { HookStatus } from "@/types/hook";
import { getJobsMock } from "@/apis/jobs/queries";
import { Job, JobListQueryParams } from "../types/jobs";

const ITEMS_PER_PAGE = 18; // Number of jobs to load per page

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
  const [currentOffset, setCurrentOffset] = useState(0);

  // Reset pagination when query params change
  useEffect(() => {
    setJobs([]);
    setCurrentOffset(0);
    setHasMore(true);
    setError(undefined);
    setStatus("loading");
  }, [queryParams]);

  const fetchJobs = useCallback(
    async (offset: number, isLoadMore = false) => {
      try {
        const paramsWithPagination = {
          ...queryParams,
          offset,
          limit: ITEMS_PER_PAGE,
        };

        // Simulate loading delay for better UX
        if (isLoadMore) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        const res = await getJobsMock(paramsWithPagination);
        const newJobs = res?.jobs || [];

        if (isLoadMore) {
          setJobs((prev) => [...prev, ...newJobs]);
        } else {
          setJobs(newJobs);
        }

        // Check if we have more items to load
        setHasMore(newJobs.length === ITEMS_PER_PAGE);
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
    [queryParams]
  );

  // Initial load
  useEffect(() => {
    if (status === "loading") {
      fetchJobs(0);
    }
  }, [fetchJobs, status]);

  const loadMore = useCallback(() => {
    if (!hasMore || isLoadingMore) return;

    setIsLoadingMore(true);
    const nextOffset = currentOffset + ITEMS_PER_PAGE;

    fetchJobs(nextOffset, true).finally(() => {
      setIsLoadingMore(false);
      setCurrentOffset(nextOffset);
    });
  }, [hasMore, isLoadingMore, currentOffset, fetchJobs]);

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
