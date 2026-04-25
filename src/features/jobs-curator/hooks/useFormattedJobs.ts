import { Job, JobPosting, JobTagBadge } from "../types/jobs";
import {
  isConvertibleIntern,
  isExperientialIntern,
  isGlobalOnly,
} from "../utils/jobPredicates";

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
    source: job.source,
  };

  const jobBadges: JobTagBadge[] = [];

  if (isConvertibleIntern(job)) jobBadges.push("전환형");
  else if (isExperientialIntern(job)) jobBadges.push("체험형");

  if (isGlobalOnly(job)) jobBadges.push("해외대전형");

  return {
    jobPosting,
    jobBadges,
    source: job.source,
  };
};

export default useFormattedJobs;
