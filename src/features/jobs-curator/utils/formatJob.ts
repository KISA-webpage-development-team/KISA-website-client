import { Job, JobPosting, JobTagBadge } from "../types/jobs";
import {
  isConvertibleIntern,
  isExperientialIntern,
  isGlobalOnly,
} from "./jobPredicates";

export function formatJob(job: Job): {
  jobPosting: JobPosting;
  jobBadges: JobTagBadge[];
} {
  const jobBadges: JobTagBadge[] = [];
  if (isConvertibleIntern(job)) jobBadges.push("전환형");
  else if (isExperientialIntern(job)) jobBadges.push("체험형");
  if (isGlobalOnly(job)) jobBadges.push("해외대전형");

  const jobPosting: JobPosting = {
    jobID: job.jobID,
    company: job.company,
    position: job.position,
    dueDate: job.dueDate,
    link: job.link,
    source: job.source,
  };
  return { jobPosting, jobBadges };
}
