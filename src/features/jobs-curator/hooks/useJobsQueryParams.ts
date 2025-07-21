import { useMemo } from "react";
import { useJobsCurator } from "../contexts/JobsCuratorContext";
import { JobListQueryParams } from "../types/jobs";

// Helper to format date as YYYY-MM-DD in local time (no time zone shift)
function toAPIDateString(date: Date | undefined) {
  return date
    ? date.toLocaleDateString("sv-SE", { timeZone: "UTC" })
    : undefined;
}

export default function useJobsQueryParams() {
  const { category, employmentType, internshipTypes, startDate, endDate } =
    useJobsCurator();

  const queryParams: JobListQueryParams = useMemo(() => {
    let tags = [];

    // add tags if they exist
    if (employmentType) {
      tags.push(employmentType);
    }
    if (internshipTypes.length > 0) {
      tags.push(...internshipTypes);
    }

    return {
      category,
      tags,
      startDate: toAPIDateString(startDate),
      endDate: toAPIDateString(endDate),
    };
  }, [category, employmentType, internshipTypes, startDate, endDate]);

  return queryParams;
}
