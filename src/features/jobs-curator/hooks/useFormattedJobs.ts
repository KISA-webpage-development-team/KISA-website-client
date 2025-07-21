import { Job, JobPosting, JobTagBadge } from "../types/jobs";

// hook to format raw job data into favorable format on the posting card
// return job posting with necessary fields and intern type badges if applicable
const useFormattedJobs = (
  job: Job
): {
  jobPosting: JobPosting;
  jobBadges: JobTagBadge[];
  source: string;
} => {
  const jobPosting = {
    jobID: job.jobID,
    company: job.company,
    position: job.position,
    dueDate: job.dueDate,
    link: job.link,
  };

  let jobBadges: JobTagBadge[] = [];

  // if intern, add badge
  if (!job.isFulltimePosition) {
    if (job.isFulltimeConvertible) {
      jobBadges.push("전환형");
    } else {
      jobBadges.push("체험형");
    }
  }

  if (job.isOnlyForInternationalUniversity) {
    jobBadges.push("해외대전형");
  }

  return {
    jobPosting,
    jobBadges,
    source: job.source,
  };
};

export default useFormattedJobs;
