import React from "react";

import JobPostingCard from "./JobPostingCard";
import USAFallbackContent from "./USAFallbackContent";

import { useJobsCurator } from "../../contexts/JobsCuratorContext";
import useFormattedJobs from "../../hooks/useFormattedJobs";
import { Job } from "../../types/jobs";

interface JobPostingGridProps {
  jobs: Job[];
}

export default function JobPostingGrid({ jobs }: JobPostingGridProps) {
  const { selectedCountry } = useJobsCurator();
  const isUSAFallback = selectedCountry === "미국";

  // TODO: implement USA fallback view
  if (isUSAFallback) {
    return <USAFallbackContent />;
  }

  if (jobs.length === 0) {
    return <div>No job postings found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {jobs.map((job) => {
        const { jobPosting, jobBadges } = useFormattedJobs(job);
        return (
          <JobPostingCard
            key={job.jobID}
            jobPosting={jobPosting}
            jobBadges={jobBadges}
          />
        );
      })}
    </div>
  );
}
