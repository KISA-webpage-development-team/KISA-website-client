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
 * Filter logic: employment group and subtype group combine with AND;
 * tags within each group combine with OR. See `applyFilters`.
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

const EMPLOYMENT_TAGS: ReadonlySet<JobTag> = new Set(["fulltime", "intern"]);
const SUBTYPE_TAGS: ReadonlySet<JobTag> = new Set([
  "convertible",
  "experiential",
  "global",
]);

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
  const employmentTags = params.tags.filter((t) => EMPLOYMENT_TAGS.has(t));
  const subtypeTags = params.tags.filter((t) => SUBTYPE_TAGS.has(t));

  return jobs.filter((job) => {
    if (params.category && job._category !== params.category) return false;

    // Within each tag group, match if ANY tag predicate passes (OR).
    // Across groups, all selected groups must pass (AND).
    if (
      employmentTags.length > 0 &&
      !employmentTags.some((t) => tagPredicates[t](job))
    ) {
      return false;
    }
    if (
      subtypeTags.length > 0 &&
      !subtypeTags.some((t) => tagPredicates[t](job))
    ) {
      return false;
    }

    // Date range: include if the job's application window overlaps the
    // query window. Missing bounds on either side are treated as open.
    if (params.endDate && job.startDate && job.startDate > params.endDate) {
      return false;
    }
    if (params.startDate && job.endDate && job.endDate < params.startDate) {
      return false;
    }

    return true;
  });
}

/**
 * The client's `getJobs` serializes query params via
 * `new URLSearchParams(queryParams as Record<string, string>)`, which
 * stringifies missing values to the literal string "undefined". Treat
 * "undefined" and "" as absent so filters don't drop every row.
 */
function readParam(searchParams: URLSearchParams, key: string): string | null {
  const v = searchParams.get(key);
  if (v === null || v === "" || v === "undefined") return null;
  return v;
}

function parseTags(searchParams: URLSearchParams): JobTag[] {
  const raw = [
    ...searchParams.getAll("tags"),
    ...searchParams.getAll("tags[]"),
  ];
  // Also split comma-joined form ("fulltime,intern") produced by URLSearchParams
  // when the client passes an array via the Record<string,string> cast.
  const flat = raw.flatMap((v) => v.split(","));
  return flat.filter((t): t is JobTag => KNOWN_TAGS.has(t as JobTag));
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
  const offset = Number(readParam(searchParams, "offset") ?? 0) || 0;

  const filtered = applyFilters(mockJobs, {
    category: readParam(searchParams, "category"),
    tags: parseTags(searchParams),
    startDate: readParam(searchParams, "startDate"),
    endDate: readParam(searchParams, "endDate"),
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
