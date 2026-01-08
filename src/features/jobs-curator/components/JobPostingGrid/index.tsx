import React from "react";

import JobPostingCard from "./JobPostingCard";
import USAFallbackContent from "./USAFallbackContent";
import InfiniteScroll from "../InfiniteScroll";

import { useJobsCurator } from "../../contexts/JobsCuratorContext";
import useFormattedJobs from "../../hooks/useFormattedJobs";
import { Job } from "../../types/jobs";
import NotificationText from "../NotificationText";

// Wrapper component to call hook at component level (required by rules-of-hooks)
function JobCardWrapper({ job }: { job: Job }) {
  const { jobPosting, jobBadges } = useFormattedJobs(job);
  return <JobPostingCard jobPosting={jobPosting} jobBadges={jobBadges} />;
}

interface JobPostingGridProps {
  jobs: Job[];
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
}

export default function JobPostingGrid({
  jobs,
  onLoadMore,
  hasMore = false,
  isLoadingMore = false,
}: JobPostingGridProps) {
  const { selectedCountry } = useJobsCurator();
  const isUSAFallback = selectedCountry === "미국";

  // TODO: implement USA fallback view
  if (isUSAFallback) {
    return <USAFallbackContent />;
  }

  if (jobs.length === 0) {
    return <NotificationText text="조건에 맞는 포지션이 없습니다." />;
  }

  const jobCards = (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {jobs.map((job, index) => (
        <JobCardWrapper key={`${job.jobID}-${index}`} job={job} />
      ))}
    </div>
  );

  // If infinite scroll is enabled, wrap with InfiniteScroll component
  if (onLoadMore && hasMore !== undefined) {
    return (
      <InfiniteScroll
        onLoadMore={onLoadMore}
        hasMore={hasMore}
        isLoading={isLoadingMore}
        endMessage={
          <NotificationText
            text="더 이상 포지션이 없습니다."
            className="text-center text-gray-500"
          />
        }
      >
        {jobCards}
      </InfiniteScroll>
    );
  }

  // Otherwise, return just the grid
  return jobCards;
}
