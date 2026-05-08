"use client";

import React, { useMemo } from "react";

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
import useKisaJobs from "@/features/jobs-curator/hooks/useKisaJobs";
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
      <JobApplicationInfoContents />

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
  const {
    jobs: apiJobs,
    status,
    error,
    hasMore,
    loadMore,
    isLoadingMore,
    loadMoreError,
    retryLoadMore,
  } = useInfiniteJobs(queryParams);
  const { filteredJobs: kisaJobs, hasKisaJobs } = useKisaJobs(queryParams);
  const jobs = useMemo(
    () => (hasKisaJobs ? [...kisaJobs, ...apiJobs] : apiJobs),
    [kisaJobs, hasKisaJobs, apiJobs],
  );

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
          <div className="flex justify-center py-12">
            <LoadingSpinner
              size="lg"
              label="새로운 공고를 가져오는 중..."
              showLabel
            />
          </div>
        ) : (
          <JobPostingGrid
            jobs={jobs}
            onLoadMore={loadMore}
            hasMore={hasMore}
            isLoadingMore={isLoadingMore}
            loadMoreError={loadMoreError}
            onRetry={retryLoadMore}
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
