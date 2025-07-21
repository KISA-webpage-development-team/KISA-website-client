import React from "react";
import { Job } from "../../types/jobs";
import JobPostingCard from "./JobPostingCard";
import useFormattedJobs from "../../hooks/useFormattedJobs";

interface JobPostingGridProps {
  jobs: Job[];
}

export default function JobPostingGrid({ jobs }: JobPostingGridProps) {
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
