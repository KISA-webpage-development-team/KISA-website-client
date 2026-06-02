import { Job, JobListQueryParams } from "@/features/jobs-curator/types/jobs";
import client from "@/lib/axios/client";

// API response structure
export interface JobsResponse {
  jobs: Job[];
  next: string | null;
  total?: number;
  hasMore?: boolean;
}

function buildJobSearchParams(queryParams: JobListQueryParams) {
  const searchParams = new URLSearchParams();

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      if (value.length > 0) {
        searchParams.set(key, value.join(","));
      }
      return;
    }

    searchParams.set(key, String(value));
  });

  return searchParams.toString();
}

/**
 * @desc Fetch jobs internship data
 * @route GET /jobs/?category=developer
 *
 * NOTE: not completed yet
 */
export async function getJobs(queryParams: JobListQueryParams) {
  const queryString = buildJobSearchParams(queryParams);
  const url = queryString ? `/jobs/?${queryString}` : "/jobs/";

  try {
    const response = await client.get(url);
    return response.data;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Error fetching jobs: ${message}`);
  }
}

/**
 * @desc Fetch jobs using the next URL from API response
 * @route GET {nextUrl}
 */
export async function getJobsByNextUrl(nextUrl: string): Promise<JobsResponse> {
  try {
    // Remove "/api/v2" prefix from nextUrl since axios client handles base URL
    const cleanUrl = nextUrl.replace("/api/v2", "");
    const response = await client.get(cleanUrl);
    return response.data;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Error fetching jobs by next URL: ${message}`);
  }
}
