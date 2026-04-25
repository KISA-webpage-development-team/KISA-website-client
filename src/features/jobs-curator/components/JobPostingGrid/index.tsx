import React from "react";
import { Grid } from "@umichkisa-ds/web";

import JobPostingCard from "./JobPostingCard";
import InfiniteScroll from "../InfiniteScroll";

import { formatJob } from "../../utils/formatJob";
import { Job } from "../../types/jobs";
import NotificationText from "../NotificationText";

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
  if (jobs.length === 0) {
    return <NotificationText text="조건에 맞는 포지션이 없습니다." />;
  }

  const jobCards = (
    <Grid columns={{ base: 1, md: 2, lg: 3 }} gap="component">
      {jobs.map((job, index) => {
        const { jobPosting, jobBadges } = formatJob(job);
        return (
          <JobPostingCard
            key={`${job.jobID}-${index}`}
            jobPosting={jobPosting}
            jobBadges={jobBadges}
          />
        );
      })}
    </Grid>
  );

  if (onLoadMore && hasMore !== undefined) {
    return (
      <InfiniteScroll
        onLoadMore={onLoadMore}
        hasMore={hasMore}
        isLoading={isLoadingMore}
        endMessage={<NotificationText text="더 이상 포지션이 없습니다." />}
      >
        {jobCards}
      </InfiniteScroll>
    );
  }

  return jobCards;
}
