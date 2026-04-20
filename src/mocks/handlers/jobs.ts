import { http, HttpResponse } from "msw";
import type { Job, JobTag } from "@/features/jobs-curator/types/jobs";
import { mockJobs, stripMetadata, type MockJob } from "../fixtures/jobs";

/**
 * Mock-only page size. Overrides the client's `limit=500` so ~30 fixtures
 * exercise ~3 pages and InfiniteScroll terminates cleanly.
 */
const MOCK_PAGE_SIZE = 10;

/**
 * Tag → boolean predicate. Semantics confirmed by audit.
 */
const tagPredicates: Record<JobTag, (job: MockJob) => boolean> = {
  fulltime: (job) => job.isFulltimePosition,
  intern: (job) => !job.isFulltimePosition,
  convertible: (job) => !job.isFulltimePosition && job.isFulltimeConvertible,
  experiential: (job) =>
    !job.isFulltimePosition &&
    !job.isFulltimeConvertible &&
    !job.isOnlyForInternationalUniversity,
  global: (job) => !job.isFulltimePosition && job.isOnlyForInternationalUniversity,
};

const KNOWN_TAGS = new Set<JobTag>([
  "fulltime",
  "intern",
  "convertible",
  "experiential",
  "global",
]);

function applyFilters(
  jobs: MockJob[],
  params: {
    category: string | null;
    tags: JobTag[];
    startDate: string | null;
    endDate: string | null;
  }
): MockJob[] {
  return jobs.filter((job) => {
    if (params.category && job._category !== params.category) return false;

    for (const tag of params.tags) {
      const pred = tagPredicates[tag];
      if (pred && !pred(job)) return false;
    }

    if (params.startDate && job.startDate && job.startDate < params.startDate) {
      return false;
    }
    if (params.endDate && job.endDate && job.endDate > params.endDate) {
      return false;
    }

    return true;
  });
}

function parseTags(searchParams: URLSearchParams): JobTag[] {
  const raw = [
    ...searchParams.getAll("tags"),
    ...searchParams.getAll("tags[]"),
  ];
  return raw.filter((t): t is JobTag => KNOWN_TAGS.has(t as JobTag));
}

function buildJobsResponse(
  searchParams: URLSearchParams,
  origin: string
): {
  jobs: Job[];
  next: string | null;
  total: number;
  hasMore: boolean;
} {
  const offset = Number(searchParams.get("offset") ?? 0) || 0;

  const filtered = applyFilters(mockJobs, {
    category: searchParams.get("category"),
    tags: parseTags(searchParams),
    startDate: searchParams.get("startDate"),
    endDate: searchParams.get("endDate"),
  });

  const total = filtered.length;
  const page = filtered.slice(offset, offset + MOCK_PAGE_SIZE);
  const nextOffset = offset + MOCK_PAGE_SIZE;
  const hasMore = nextOffset < total;

  const nextSearch = new URLSearchParams(searchParams);
  nextSearch.set("offset", String(nextOffset));
  nextSearch.set("limit", String(MOCK_PAGE_SIZE));

  const next = hasMore ? `${origin}/api/v2/jobs/?${nextSearch.toString()}` : null;

  return {
    jobs: page.map(stripMetadata),
    next,
    total,
    hasMore,
  };
}

/**
 * Handles the jobs list endpoint for both the initial call (axios baseURL
 * appended with `/jobs/?...`) and the `next`-url pagination passthrough.
 *
 * Supports three states:
 *   - happy:  default
 *   - empty:  filter yields no matches → `{ jobs: [], next: null, ... }`
 *   - error:  `?_mockState=error` → 500
 */
export const jobsHandlers = [
  http.get(/\/jobs\/?(\?.*)?$/, ({ request }) => {
    const url = new URL(request.url);

    if (url.searchParams.get("_mockState") === "error") {
      return HttpResponse.json(null, { status: 500 });
    }

    return HttpResponse.json(buildJobsResponse(url.searchParams, url.origin));
  }),
];
