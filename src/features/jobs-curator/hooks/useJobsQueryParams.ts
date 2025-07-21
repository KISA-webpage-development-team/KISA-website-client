import { useMemo } from "react";
import { useJobsCurator } from "../contexts/JobsCuratorContext";
import { JobListQueryParams } from "../types/jobs";

export default function useJobsQueryParams() {
  const { category } = useJobsCurator();

  const queryParams: JobListQueryParams = useMemo(() => {
    return {
      category,
    };
  }, [category]);

  return queryParams;
}
