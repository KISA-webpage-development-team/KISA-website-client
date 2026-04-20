import axios from "axios";
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
 * Build URLSearchParams, skipping undefined/null/empty values so the backend
 * never receives literal "undefined" strings. Arrays are comma-joined to match
 * the server's existing parsing (see MSW jobs handler `parseTags`).
 */
function buildSearchParams(params: JobListQueryParams): URLSearchParams {
  const sp = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      if (value.length === 0) continue;
      sp.append(key, value.join(","));
      continue;
    }
    const str = String(value);
    if (str === "") continue;
    sp.append(key, str);
  }
  return sp;
}

/**
 * Axios wrapper with retry-on-Network-Error. "Network Error" = no HTTP
 * response (cold TLS, preflight race, CF challenge). Retry up to N times
 * with exponential backoff; non-network errors (4xx/5xx) surface immediately.
 */
async function getWithRetry<T>(
  url: string,
  retries = 2,
  delayMs = 300
): Promise<T> {
  try {
    const response = await client.get<T>(url);
    return response.data;
  } catch (error) {
    const isNetworkError =
      axios.isAxiosError(error) &&
      (error.code === "ERR_NETWORK" || !error.response);
    if (isNetworkError && retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      return getWithRetry<T>(url, retries - 1, delayMs * 2.5);
    }
    throw error;
  }
}

/**
 * @desc Fetch jobs internship data
 * @route GET /jobs/?category=developer
 */
export async function getJobs(
  queryParams: JobListQueryParams
): Promise<JobsResponse> {
  const url = `/jobs/?${buildSearchParams(queryParams).toString()}`;

  try {
    return await getWithRetry<JobsResponse>(url);
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
    return await getWithRetry<JobsResponse>(cleanUrl);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Error fetching jobs by next URL: ${message}`);
  }
}
