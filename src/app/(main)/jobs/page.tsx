"use client";

import React from "react";

// ui components
import { Button, LoadingSpinner, StatusView } from "@umichkisa-ds/web";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import JobApplicationInfoContents from "@/features/jobs-curator/components/JobApplicationInfoContents";
import JobCategoryDropdown from "@/features/jobs-curator/components/JobCategoryDropdown";
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
      {/* Info contents (static guide) — keeps its own local Tabs state; decoupled
          from the jobs-list country filter by business decision. */}
      <div className="mt-12 mb-12">
        <JobApplicationInfoContents />
      </div>

      {/* Dynamic job section — errors isolated here; context scope is local. */}
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
      {/* Category heading */}
      <div className="mt-2 md:mt-0">
        <JobCategoryDropdown />
      </div>

      {/* Tag List — owns country (지역), 고용 형태, 인턴십 유형 axes */}
      <div className="md:mt-2">
        <TagList />
      </div>

      {/* Job Posting Cards with Infinite Scroll / US Fallback */}
      <div className="md:mt-2">
        {!isKorea ? (
          <USAFallbackContent />
        ) : status === "loading" ? (
          <LoadingSpinner size="md" />
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
    <StatusView
      variant="error"
      className="mt-4"
      action={<Button onClick={reset}>다시 시도하기</Button>}
    />
  );
}
