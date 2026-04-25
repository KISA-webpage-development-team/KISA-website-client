import { useMemo } from "react";
import { useJobsCurator } from "../contexts/JobsCuratorContext";
import { JobListQueryParams, JobTag } from "../types/jobs";
import { toApiDateString } from "../utils/date";

export default function useJobsQueryParams() {
  const { category, employmentType, internshipTypes, startDate, endDate } =
    useJobsCurator();

  const queryParams: JobListQueryParams = useMemo(() => {
    const tags: JobTag[] = [];

    // add tags if they exist
    if (employmentType) {
      tags.push(employmentType);
    }
    if (employmentType === "intern" && internshipTypes.length > 0) {
      tags.push(...internshipTypes);
    }

    return {
      category,
      tags,
      startDate: toApiDateString(startDate),
      endDate: toApiDateString(endDate),
    };
  }, [category, employmentType, internshipTypes, startDate, endDate]);

  return queryParams;
}
