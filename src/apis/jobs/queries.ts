import { Job, JobListQueryParams } from "@/features/jobs-curator/types/jobs";
import client from "@/lib/axios/client";

// API response structure
export interface JobsResponse {
  jobs: Job[];
  next: string | null;
  total?: number;
  hasMore?: boolean;
}

/**
 * @desc Fetch jobs internship data
 * @route GET /jobs/?category=developer
 *
 * NOTE: not completed yet
 */
export async function getJobs(queryParams: JobListQueryParams) {
  const url = `/jobs/?${new URLSearchParams(
    queryParams as Record<string, string>
  ).toString()}`;

  try {
    const response = await client.get(url);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching jobs: ", error.message);
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
    throw new Error("Error fetching jobs: ", error.message);
  }
}
