import { useMemo } from "react";
import { Job, JobListQueryParams } from "../types/jobs";
import kisaJobs from "../data/kisaJobs";

interface UseKisaJobsReturn {
  filteredJobs: Job[];
  hasKisaJobs: boolean;
}

const useKisaJobs = (queryParams: JobListQueryParams): UseKisaJobsReturn => {
  const filteredJobs = useMemo(() => {
    let filtered = [...kisaJobs];

    // Filter by category if specified
    if (queryParams.category) {
      // Note: KISA jobs don't have category field, so we'll include them all
      // In the future, you might want to add category to KISA jobs
    }

    // Filter by tags if specified
    if (queryParams.tags && queryParams.tags.length > 0) {
      filtered = filtered.filter((job) => {
        // Check if job matches any of the requested tags
        return queryParams.tags!.some((tag) => {
          switch (tag) {
            case "fulltime":
              return job.isFulltimePosition;
            case "intern":
              return !job.isFulltimePosition;
            case "convertible":
              return job.isFulltimeConvertible;
            case "experiential":
              // Experiential internships are typically non-convertible
              return !job.isFulltimePosition && !job.isFulltimeConvertible;
            case "global":
              return job.isOnlyForInternationalUniversity;
            default:
              return true;
          }
        });
      });
    }

    // Filter by date range if specified
    if (queryParams.startDate || queryParams.endDate) {
      filtered = filtered.filter((job) => {
        const jobStartDate = new Date(job.startDate);
        const jobEndDate = new Date(job.endDate);

        if (queryParams.startDate) {
          const queryStartDate = new Date(queryParams.startDate);
          if (jobEndDate < queryStartDate) return false;
        }

        if (queryParams.endDate) {
          const queryEndDate = new Date(queryParams.endDate);
          if (jobStartDate > queryEndDate) return false;
        }

        return true;
      });
    }

    return filtered;
  }, [queryParams]);

  return {
    filteredJobs,
    hasKisaJobs: filteredJobs.length > 0,
  };
};

export default useKisaJobs;
