import { Job } from "@/features/jobs-curator/types/jobs";
import client from "@/lib/axios/client";

// API response structure
export interface JobsResponse {
  jobs: Job[];
  next: string | null;
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
export async function getJobsMock(): Promise<JobsResponse> {
  try {
    const response = await fetch("/mocks/jobs.json");
    if (!response.ok) {
      throw new Error("Failed to fetch mock jobs data");
    }
    return await response.json();
  } catch (error) {
    throw new Error("Error fetching mock jobs data");
  }
}
