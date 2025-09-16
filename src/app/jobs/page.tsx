"use client";

import React from "react";

// ui components
import { LoadingSpinner } from "@/components/ui/feedback";
import JobApplicationInfoContents from "@/features/jobs-curator/components/JobApplicationInfoContents";
import JobCategoryDropdown from "@/features/jobs-curator/components/JobCategoryDropdown";
import TagList from "@/features/jobs-curator/components/TagList";
import JobPostingGrid from "@/features/jobs-curator/components/JobPostingGrid";

// hooks
import useInfiniteJobs from "@/features/jobs-curator/hooks/useInfiniteJobs";
import useJobsQueryParams from "@/features/jobs-curator/hooks/useJobsQueryParams";
import { JobsCuratorProvider } from "@/features/jobs-curator/contexts/JobsCuratorContext";

export default function JobsCuratorPage() {
  return (
    <JobsCuratorProvider>
      <JobsCuratorPageContent />
    </JobsCuratorProvider>
  );
}

function JobsCuratorPageContent() {
  const queryParams = useJobsQueryParams();
  const { jobs, status, error, hasMore, loadMore, isLoadingMore } =
    useInfiniteJobs(queryParams);

  if (status === "error") {
    throw new Error(error || "Unexpected error occurred");
  }

  return (
    <section>
      {/* Job Application Info Contents (비성수기 콘텐츠) */}
      <div className="mt-12">
        <JobApplicationInfoContents />
      </div>

      {/* Job Category Dropdown - Heading */}
      {/* <div className="mt-2 sm:mt-0">
        <JobCategoryDropdown />
      </div> */}

      {/* Tag List */}
      {/* <div className="sm:mt-2">
        <TagList />
      </div> */}

      {/* Job Posting Cards with Infinite Scroll */}
      {/* <div className="sm:mt-2">
        {status === "loading" ? (
          <LoadingSpinner fullScreen={false} />
        ) : (
          <JobPostingGrid
            jobs={jobs}
            onLoadMore={loadMore}
            hasMore={hasMore}
            isLoadingMore={isLoadingMore}
          />
        )}
      </div> */}
    </section>
  );
}
