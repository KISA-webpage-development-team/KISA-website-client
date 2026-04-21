"use client";

import React from "react";

// ui components
import { LoadingSpinner, UnexpectedError } from "@/components/ui/feedback";
import { CustomButton } from "@/components/ui/button";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import JobApplicationInfoContents from "@/features/jobs-curator/components/JobApplicationInfoContents";
import JobCategoryDropdown from "@/features/jobs-curator/components/JobCategoryDropdown";
import CountryToggle from "@/features/jobs-curator/components/CountryToggle";
import TagList from "@/features/jobs-curator/components/TagList";
import JobPostingGrid from "@/features/jobs-curator/components/JobPostingGrid";
import USAFallbackContent from "@/features/jobs-curator/components/USAFallbackContent";

// hooks
import useInfiniteJobs from "@/features/jobs-curator/hooks/useInfiniteJobs";
import useJobsQueryParams from "@/features/jobs-curator/hooks/useJobsQueryParams";
import {
  JobsCuratorProvider,
  useJobsCurator,
} from "@/features/jobs-curator/contexts/JobsCuratorContext";

export default function JobsCuratorPage() {
  return (
    <section>
      {/* Job Application Info Contents (비성수기 콘텐츠) — static, always visible even on API error */}
      <div className="mt-12 mb-12">
        <JobApplicationInfoContents />
      </div>

      {/* Dynamic job section — errors are isolated here and do not affect the info content above */}
      <JobsCuratorProvider>
        <ErrorBoundary
          fallback={({ reset }) => <JobGridErrorFallback reset={reset} />}
        >
          <JobsCuratorDynamicContent />
        </ErrorBoundary>
      </JobsCuratorProvider>
    </section>
  );
}

function JobsCuratorDynamicContent() {
  const { country } = useJobsCurator();
  const queryParams = useJobsQueryParams();
  const { jobs, status, error, hasMore, loadMore, isLoadingMore } =
    useInfiniteJobs(queryParams);

  if (status === "error") {
    throw new Error(error || "Unexpected error occurred");
  }

  const isKorea = country === "KR";

  return (
    <>
      {/* Header row: category on the left, country scope on the right */}
      <div className="mt-2 sm:mt-0 flex flex-row items-center justify-between gap-4">
        <JobCategoryDropdown />
        <CountryToggle />
      </div>

      {/* Tag List (KR-only; US shows a fallback card) */}
      {isKorea && (
        <div className="sm:mt-2">
          <TagList />
        </div>
      )}

      {/* Job Posting Cards with Infinite Scroll / US Fallback */}
      <div className="sm:mt-2">
        {!isKorea ? (
          <USAFallbackContent />
        ) : status === "loading" ? (
          <LoadingSpinner fullScreen={false} />
        ) : (
          <JobPostingGrid
            jobs={jobs}
            onLoadMore={loadMore}
            hasMore={hasMore}
            isLoadingMore={isLoadingMore}
          />
        )}
      </div>
    </>
  );
}

function JobGridErrorFallback({ reset }: { reset: () => void }) {
  return (
    <div className="h-full flex flex-col items-center justify-center mt-4">
      <UnexpectedError />
      <CustomButton onClick={reset} text="다시 시도하기" />
    </div>
  );
}
