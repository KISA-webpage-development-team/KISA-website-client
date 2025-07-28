import { Job, JobListQueryParams } from "@/features/jobs-curator/types/jobs";
import client from "@/lib/axios/client";

// API response structure
export interface JobsResponse {
  jobs: Job[];
  next: string | null;
  total?: number;
  hasMore?: boolean;
}

// Query parameters for filtering jobs
export interface JobsQueryParams {
  category?: string;
  tags?: string[];
  startDate?: string;
  endDate?: string;
  offset?: number;
  limit?: number;
}

/**
 * @desc Fetch jobs internship data
 * @route GET /jobs/?category=developer
 *
 * NOTE: not completed yet
 */
export async function getInternshipJobs() {
  const url = `/jobs/?category=developer`;

  try {
    const response = await client.get(url);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching internship jobs");
  }
}

/**
 * @desc Mock function to fetch jobs data from local JSON
 * @route GET /api/v2/jobs/
 */
export async function getJobsMock(
  queryParams: JobListQueryParams
): Promise<JobsResponse> {
  try {
    const response = await fetch(
      `/mocks/jobs.json?${new URLSearchParams(
        queryParams as Record<string, string>
      ).toString()}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch mock jobs data");
    }

    const data = await response.json();
    const allJobs = data.jobs || [];

    // Handle pagination if offset and limit are provided
    if (queryParams.offset !== undefined && queryParams.limit !== undefined) {
      const startIndex = queryParams.offset;
      const endIndex = startIndex + queryParams.limit;
      const paginatedJobs = allJobs.slice(startIndex, endIndex);

      return {
        jobs: paginatedJobs,
        next:
          endIndex < allJobs.length
            ? `?offset=${endIndex}&limit=${queryParams.limit}`
            : null,
        total: allJobs.length,
        hasMore: endIndex < allJobs.length,
      };
    }

    // Return all jobs if no pagination parameters
    return {
      jobs: allJobs,
      next: null,
      total: allJobs.length,
      hasMore: false,
    };
  } catch (error) {
    throw new Error("Error fetching mock jobs data");
  }
}
