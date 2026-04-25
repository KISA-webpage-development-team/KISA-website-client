# Jobs-Curator P1+P2 Cleanup Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Apply Toss Frontend Fundamentals fixes (P1 + P2) to `client/src/features/jobs-curator/` — domain predicate extraction, hook/util refactor, type honesty, label consolidation, magic-number elimination — without changing user-visible behavior.

**Architecture:** Six logical batches landed as commits on a single feature branch in a worktree off `dev`. Each batch is independently green (`npx tsc --noEmit` + `npm test`). No PRs — merge worktree branch back to `dev` at the end.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, Tailwind, `@umichkisa-ds/web` design system, `date-fns`, Vitest.

**Decisions baked in (push back here before starting):**
- D1: `useInfiniteJobs` stays hand-rolled. SWR/React Query migration is filed as a follow-up TODO inside the file, not done in this plan.
- D2: `loadMore` failure renders an inline "다시 불러오기" link below the grid (visible but non-blocking). Initial-load failure still escalates to ErrorBoundary as today.
- D3: All work is in the client repo. DS package is unchanged.

---

## Pre-flight (one-time, before Task 1)

**Step P.1: Verify clean dev**

Run from `KISA-website/client/`:
```bash
git checkout dev && git pull origin dev
git status   # must be clean
```
Expected: "nothing to commit, working tree clean".

**Step P.2: Create worktree**

From `KISA-website/client/`:
```bash
git worktree add .worktrees/jobs-curator-cleanup -b chore/jobs-curator-cleanup dev
cd .worktrees/jobs-curator-cleanup
npm install
```
Expected: worktree created, deps installed.

**Step P.3: Baseline verification**

```bash
npx tsc --noEmit
npm test -- features/jobs-curator
```
Expected: typecheck clean, existing tests (`utils-date.test.ts`, `useJobsQueryParams.test.ts`, `TagList.test.tsx`) all pass. **Record the test count** — every later task must keep this count ≥ baseline.

**Step P.4: Take a "no behavior change" screenshot**

Open `https://vnw20xbg-3000.asse.devtunnels.ms/jobs` (or the matching tunnel port for this worktree — `npm run dev` first). Capture: filter bar, infinite scroll trigger, USA fallback, error boundary. Used as visual regression reference at the end.

---

## Task 1 — Extract intern-type domain predicates (P1, finding 2.5)

**Why.** `"experiential = !fulltime && !convertible"` is currently spelled out twice (`useKisaJobs.ts:33-34`, `useFormattedJobs.ts:24-29`). Single source of truth.

**Files:**
- Create: `src/features/jobs-curator/utils/jobPredicates.ts`
- Create: `src/features/jobs-curator/__tests__/jobPredicates.test.ts`
- Modify: `src/features/jobs-curator/hooks/useKisaJobs.ts:25-40`
- Modify: `src/features/jobs-curator/hooks/useFormattedJobs.ts:24-34`

### Step 1.1 — Write the failing tests

Create `__tests__/jobPredicates.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import {
  isFulltime,
  isIntern,
  isConvertibleIntern,
  isExperientialIntern,
  isGlobalOnly,
} from "../utils/jobPredicates";
import type { Job } from "../types/jobs";

const base: Job = {
  jobID: 1, company: "C", position: "P", link: "x",
  isFulltimePosition: false,
  isFulltimeConvertible: false,
  isOnlyForInternationalUniversity: false,
  source: "wanted-api",
};

describe("jobPredicates", () => {
  it("isFulltime / isIntern are inverses", () => {
    expect(isFulltime({ ...base, isFulltimePosition: true })).toBe(true);
    expect(isIntern({ ...base, isFulltimePosition: true })).toBe(false);
    expect(isIntern({ ...base, isFulltimePosition: false })).toBe(true);
  });

  it("convertible intern requires intern + convertible flag", () => {
    expect(isConvertibleIntern({ ...base, isFulltimeConvertible: true })).toBe(true);
    expect(isConvertibleIntern({ ...base, isFulltimePosition: true, isFulltimeConvertible: true })).toBe(false);
  });

  it("experiential intern is intern AND not convertible", () => {
    expect(isExperientialIntern(base)).toBe(true);
    expect(isExperientialIntern({ ...base, isFulltimeConvertible: true })).toBe(false);
    expect(isExperientialIntern({ ...base, isFulltimePosition: true })).toBe(false);
  });

  it("isGlobalOnly reads the flag", () => {
    expect(isGlobalOnly({ ...base, isOnlyForInternationalUniversity: true })).toBe(true);
    expect(isGlobalOnly(base)).toBe(false);
  });
});
```

### Step 1.2 — Run, verify it fails

```bash
npm test -- jobPredicates
```
Expected: FAIL — module not found.

### Step 1.3 — Implement

Create `utils/jobPredicates.ts`:
```ts
import { Job } from "../types/jobs";

export const isFulltime = (j: Job) => j.isFulltimePosition;
export const isIntern = (j: Job) => !j.isFulltimePosition;
export const isConvertibleIntern = (j: Job) =>
  isIntern(j) && j.isFulltimeConvertible;
export const isExperientialIntern = (j: Job) =>
  isIntern(j) && !j.isFulltimeConvertible;
export const isGlobalOnly = (j: Job) => j.isOnlyForInternationalUniversity;
```

### Step 1.4 — Run, verify pass

```bash
npm test -- jobPredicates
```
Expected: 4 tests pass.

### Step 1.5 — Wire into `useKisaJobs`

Replace the switch body in `hooks/useKisaJobs.ts:25-40` with:
```ts
import {
  isFulltime, isIntern, isConvertibleIntern,
  isExperientialIntern, isGlobalOnly,
} from "../utils/jobPredicates";
// ...
return queryParams.tags!.some((tag) => {
  switch (tag) {
    case "fulltime":     return isFulltime(job);
    case "intern":       return isIntern(job);
    case "convertible":  return isConvertibleIntern(job);
    case "experiential": return isExperientialIntern(job);
    case "global":       return isGlobalOnly(job);
    default:             return true;
  }
});
```

### Step 1.6 — Wire into `useFormattedJobs`

Replace `hooks/useFormattedJobs.ts:24-34` badge block with:
```ts
import { isConvertibleIntern, isExperientialIntern, isGlobalOnly } from "../utils/jobPredicates";
// ...
const jobBadges: JobTagBadge[] = [];
if (isConvertibleIntern(job))      jobBadges.push("전환형");
else if (isExperientialIntern(job)) jobBadges.push("체험형");
if (isGlobalOnly(job))              jobBadges.push("해외대전형");
```

### Step 1.7 — Verify everything still green

```bash
npx tsc --noEmit
npm test -- features/jobs-curator
```
Expected: typecheck clean, all jobs-curator tests pass (baseline + 4 new).

### Step 1.8 — Commit

```bash
git add src/features/jobs-curator/
git commit -m "refactor(jobs-curator): extract intern-type domain predicates

Single source of truth for 'experiential = !fulltime && !convertible'
rule. Replaces duplicated logic in useKisaJobs and useFormattedJobs."
```

---

## Task 2 — Replace `useFormattedJobs` with `formatJob` + make `JobPosting.dueDate` optional (P1, findings 2.1 + 2.2)

**Why.**
- `useFormattedJobs` calls no React API → mislabeling as a hook forced the `JobCardWrapper` indirection (`JobPostingGrid/index.tsx:12-15`).
- `JobPosting.dueDate: string` (required) is a lie — `Job.dueDate?: string` is optional and `JobPostingCard.tsx:66` already null-checks.

**Files:**
- Create: `src/features/jobs-curator/utils/formatJob.ts`
- Delete: `src/features/jobs-curator/hooks/useFormattedJobs.ts`
- Modify: `src/features/jobs-curator/types/jobs.ts:23` (dueDate optional)
- Modify: `src/features/jobs-curator/components/JobPostingGrid/index.tsx`
- Verify: `src/features/jobs-curator/components/JobPostingGrid/JobPostingCard.tsx` (no edit; already handles undefined)

### Step 2.1 — Write the new util test

Create `__tests__/formatJob.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { formatJob } from "../utils/formatJob";
import type { Job } from "../types/jobs";

const base: Job = {
  jobID: 1, company: "C", position: "P", link: "x",
  isFulltimePosition: false, isFulltimeConvertible: false,
  isOnlyForInternationalUniversity: false, source: "wanted-api",
};

describe("formatJob", () => {
  it("emits 체험형 for non-convertible intern", () => {
    expect(formatJob(base).jobBadges).toEqual(["체험형"]);
  });
  it("emits 전환형 for convertible intern", () => {
    expect(formatJob({ ...base, isFulltimeConvertible: true }).jobBadges).toEqual(["전환형"]);
  });
  it("emits no intern badge for fulltime, but global if flagged", () => {
    expect(formatJob({ ...base, isFulltimePosition: true, isOnlyForInternationalUniversity: true }).jobBadges)
      .toEqual(["해외대전형"]);
  });
  it("preserves undefined dueDate", () => {
    expect(formatJob(base).jobPosting.dueDate).toBeUndefined();
  });
});
```

### Step 2.2 — Run, verify fail

```bash
npm test -- formatJob
```
Expected: FAIL — module not found.

### Step 2.3 — Implement `formatJob`

Create `utils/formatJob.ts`:
```ts
import { Job, JobPosting, JobTagBadge } from "../types/jobs";
import { isConvertibleIntern, isExperientialIntern, isGlobalOnly } from "./jobPredicates";

export function formatJob(job: Job): {
  jobPosting: JobPosting;
  jobBadges: JobTagBadge[];
} {
  const jobBadges: JobTagBadge[] = [];
  if (isConvertibleIntern(job))       jobBadges.push("전환형");
  else if (isExperientialIntern(job)) jobBadges.push("체험형");
  if (isGlobalOnly(job))              jobBadges.push("해외대전형");

  const jobPosting: JobPosting = {
    jobID: job.jobID,
    company: job.company,
    position: job.position,
    dueDate: job.dueDate,
    link: job.link,
    source: job.source,
  };
  return { jobPosting, jobBadges };
}
```

### Step 2.4 — Make `JobPosting.dueDate` optional

In `types/jobs.ts:23`, change `dueDate: string;` → `dueDate?: string;`.

### Step 2.5 — Run typecheck

```bash
npx tsc --noEmit
```
Expected: clean. (`JobPostingCard.tsx:66` already does `dueDate ? ... : <span/>` so no edit needed.)

### Step 2.6 — Run util test, verify pass

```bash
npm test -- formatJob
```
Expected: 4 tests pass.

### Step 2.7 — Replace `JobCardWrapper` in `JobPostingGrid/index.tsx`

Remove the `JobCardWrapper` (lines 12-15) and the `useFormattedJobs` import. Update the map at line 36-38:
```tsx
import { formatJob } from "../../utils/formatJob";
// ...
{jobs.map((job, index) => {
  const { jobPosting, jobBadges } = formatJob(job);
  return (
    <JobPostingCard
      key={`${job.jobID}-${index}`}
      jobPosting={jobPosting}
      jobBadges={jobBadges}
    />
  );
})}
```

### Step 2.8 — Delete the old hook

```bash
git rm src/features/jobs-curator/hooks/useFormattedJobs.ts
```

### Step 2.9 — Verify all green

```bash
npx tsc --noEmit
npm test -- features/jobs-curator
npm run lint
```
Expected: all clean.

### Step 2.10 — Commit

```bash
git add -A
git commit -m "refactor(jobs-curator): replace useFormattedJobs hook with formatJob util

useFormattedJobs called no React API, so the use* prefix was misleading
and forced the JobCardWrapper indirection. Also makes JobPosting.dueDate
optional to match Job.dueDate (the card already null-checks)."
```

---

## Task 3 — Split `useInfiniteJobs` responsibilities (P1, findings 1.1 + 1.2 + 3.3)

**Why.** Current hook does 7 things at once (initial fetch, paging, KISA merge, race guard, double-mount guard, error handling, ErrorBoundary escalation on paging failure). Pagination failure currently wipes the visible grid by flipping `status` to `"error"` (line 97) — bad UX.

**Files:**
- Modify: `src/features/jobs-curator/hooks/useInfiniteJobs.ts` (full rewrite)
- Modify: `src/app/(main)/jobs/page.tsx` (move KISA merge out)
- Modify: `src/features/jobs-curator/components/InfiniteScroll.tsx` (add inline retry)
- Create: `src/features/jobs-curator/__tests__/useInfiniteJobs.test.ts`

### Step 3.1 — Write the failing hook test

Create `__tests__/useInfiniteJobs.test.ts` covering three scenarios:
1. Successful initial load → `status='success'`, `jobs` populated.
2. Pagination failure → `loadMoreError` set, `jobs` preserved, `status` still `'success'`.
3. Stale request → second `getJobs` resolves first; first one's late resolve must NOT overwrite.

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import useInfiniteJobs from "../hooks/useInfiniteJobs";
import * as queries from "@/apis/jobs/queries";
import type { Job } from "../types/jobs";

const j = (id: number): Job => ({
  jobID: id, company: "C", position: "P", link: "x",
  isFulltimePosition: false, isFulltimeConvertible: false,
  isOnlyForInternationalUniversity: false, source: "wanted-api",
});

const params = { category: undefined, tags: [], startDate: undefined, endDate: undefined };

beforeEach(() => vi.restoreAllMocks());

describe("useInfiniteJobs", () => {
  it("loads initial page", async () => {
    vi.spyOn(queries, "getJobs").mockResolvedValue({ jobs: [j(1), j(2)], next: null });
    const { result } = renderHook(() => useInfiniteJobs(params));
    await waitFor(() => expect(result.current.status).toBe("success"));
    expect(result.current.jobs.map((x) => x.jobID)).toEqual([1, 2]);
  });

  it("preserves jobs when loadMore fails", async () => {
    vi.spyOn(queries, "getJobs").mockResolvedValue({ jobs: [j(1)], next: "/n" });
    vi.spyOn(queries, "getJobsByNextUrl").mockRejectedValue(new Error("net"));
    const { result } = renderHook(() => useInfiniteJobs(params));
    await waitFor(() => expect(result.current.hasMore).toBe(true));
    act(() => result.current.loadMore());
    await waitFor(() => expect(result.current.loadMoreError).toBeDefined());
    expect(result.current.status).toBe("success");
    expect(result.current.jobs).toHaveLength(1);
  });

  it("ignores stale initial response", async () => {
    let resolveFirst!: (v: any) => void;
    const first = new Promise((r) => (resolveFirst = r));
    const spy = vi.spyOn(queries, "getJobs")
      .mockImplementationOnce(() => first as any)
      .mockResolvedValueOnce({ jobs: [j(99)], next: null });
    const { result, rerender } = renderHook(({ p }) => useInfiniteJobs(p), { initialProps: { p: params } });
    rerender({ p: { ...params, category: "developer" } });
    await waitFor(() => expect(spy).toHaveBeenCalledTimes(2));
    resolveFirst({ jobs: [j(1)], next: null });
    await waitFor(() => expect(result.current.status).toBe("success"));
    expect(result.current.jobs.map((x) => x.jobID)).toEqual([99]);
  });
});
```

### Step 3.2 — Run, verify (should fail on `loadMoreError` field)

```bash
npm test -- useInfiniteJobs
```
Expected: 2 of 3 fail (no `loadMoreError` field exists yet).

### Step 3.3 — Rewrite `useInfiniteJobs.ts`

```ts
import { useEffect, useState, useCallback, useRef } from "react";
import { HookStatus } from "@/types/hook";
import { Job, JobListQueryParams } from "../types/jobs";
import { getJobs, getJobsByNextUrl, JobsResponse } from "@/apis/jobs/queries";

const LIMIT = 500;

export interface UseInfiniteJobsReturn {
  jobs: Job[];                      // API-only; KISA merging happens at the call site
  status: HookStatus;               // tracks INITIAL load only
  error: string | undefined;        // initial-load error
  hasMore: boolean;
  loadMore: () => void;
  isLoadingMore: boolean;
  loadMoreError: string | undefined;
  retryLoadMore: () => void;
}

const useInfiniteJobs = (queryParams: JobListQueryParams): UseInfiniteJobsReturn => {
  const [status, setStatus] = useState<HookStatus>("loading");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string>();
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [loadMoreError, setLoadMoreError] = useState<string>();

  const requestIdRef = useRef(0);

  useEffect(() => {
    const myId = ++requestIdRef.current;
    (async () => {
      try {
        const res: JobsResponse = await getJobs({ ...queryParams, limit: LIMIT });
        if (myId !== requestIdRef.current) return;
        setJobs(res?.jobs ?? []);
        setNextUrl(res?.next ?? null);
        setHasMore(!!res?.next);
        setError(undefined);
        setLoadMoreError(undefined);
        setStatus("success");
      } catch (e) {
        if (myId !== requestIdRef.current) return;
        setStatus("error");
        setError(e instanceof Error ? e.message : "An unexpected error occurred.");
      }
    })();
  }, [queryParams]);

  const fetchNext = useCallback(async (url: string) => {
    const myId = ++requestIdRef.current;
    setIsLoadingMore(true);
    setLoadMoreError(undefined);
    try {
      const res: JobsResponse = await getJobsByNextUrl(url);
      if (myId !== requestIdRef.current) return;
      setJobs((prev) => [...prev, ...(res?.jobs ?? [])]);
      setNextUrl(res?.next ?? null);
      setHasMore(!!res?.next);
    } catch (e) {
      if (myId !== requestIdRef.current) return;
      setLoadMoreError(e instanceof Error ? e.message : "An unexpected error occurred.");
    } finally {
      if (myId === requestIdRef.current) setIsLoadingMore(false);
    }
  }, []);

  const loadMore = useCallback(() => {
    if (!hasMore || isLoadingMore || !nextUrl) return;
    fetchNext(nextUrl);
  }, [hasMore, isLoadingMore, nextUrl, fetchNext]);

  const retryLoadMore = useCallback(() => {
    if (!nextUrl || isLoadingMore) return;
    fetchNext(nextUrl);
  }, [nextUrl, isLoadingMore, fetchNext]);

  // TODO: consider migrating to SWR or @tanstack/react-query useInfiniteQuery.
  // See docs/plans/2026-04-25-jobs-curator-cleanup.md decision D1.
  return { jobs, status, error, hasMore, loadMore, isLoadingMore, loadMoreError, retryLoadMore };
};

export default useInfiniteJobs;
```

### Step 3.4 — Move KISA merge to the page

In `src/app/(main)/jobs/page.tsx` `JobsCuratorDynamicContent`:
```tsx
import { useMemo } from "react";
import useKisaJobs from "@/features/jobs-curator/hooks/useKisaJobs";
// ...
const queryParams = useJobsQueryParams();
const { jobs: apiJobs, status, error, hasMore, loadMore, isLoadingMore, loadMoreError, retryLoadMore } =
  useInfiniteJobs(queryParams);
const { filteredJobs: kisaJobs, hasKisaJobs } = useKisaJobs(queryParams);
const jobs = useMemo(
  () => (hasKisaJobs ? [...kisaJobs, ...apiJobs] : apiJobs),
  [kisaJobs, hasKisaJobs, apiJobs],
);
```
Pass `loadMoreError` and `retryLoadMore` down to `JobPostingGrid` (next step).

### Step 3.5 — Update `JobPostingGrid` + `InfiniteScroll` for inline retry

`JobPostingGrid/index.tsx` adds `loadMoreError?: string` and `onRetry?: () => void` props, forwards to `InfiniteScroll`.

`InfiniteScroll.tsx` adds same props. When `loadMoreError` is set: render the existing footer slot but with text `"공고를 더 불러오지 못했습니다."` and a button:
```tsx
{loadMoreError && !isLoading && (
  <div className="flex flex-col items-center gap-2 py-4">
    <span className="type-body-sm text-muted-foreground">공고를 더 불러오지 못했습니다.</span>
    <button
      type="button"
      onClick={onRetry}
      className="type-body-sm text-brand-primary underline underline-offset-4"
    >
      다시 불러오기
    </button>
  </div>
)}
```
Keep existing `isLoading` and `!hasMore` branches.

### Step 3.6 — Run hook tests

```bash
npm test -- useInfiniteJobs
```
Expected: all 3 pass.

### Step 3.7 — Run full feature tests + typecheck + lint

```bash
npx tsc --noEmit
npm test -- features/jobs-curator
npm run lint
```
Expected: clean.

### Step 3.8 — Manual smoke

```bash
npm run dev
```
Visit the devtunnels URL `https://vnw20xbg-3000.asse.devtunnels.ms/jobs`. Verify:
- Initial grid loads.
- Filter changes do not flicker to spinner (in-place swap).
- Scroll to trigger `loadMore`; if you can throttle the network in DevTools and induce a fail on the next page, the inline "다시 불러오기" appears and the existing grid stays visible.

### Step 3.9 — Commit

```bash
git add -A
git commit -m "refactor(jobs-curator): split useInfiniteJobs concerns; inline pagination retry

- Move KISA static-data merge out of the hook to the page (it's not a fetch concern).
- Separate loadMoreError from initial-load error; pagination failures no longer wipe the grid via ErrorBoundary.
- Drop redundant 'cancelled' flag — requestIdRef already prevents stale writes.
- Add InfiniteScroll inline retry affordance."
```

---

## Task 4 — Consolidate label maps + dedupe `Tag` union (P2, findings 3.1 + 3.2)

**Files:**
- Modify: `src/features/jobs-curator/constant.ts` (add `jobCategoryLabels`)
- Modify: `src/features/jobs-curator/components/JobCategoryDropdown.tsx` (remove inline map)
- Modify: `src/features/jobs-curator/types/jobs.ts` (drop local `Tag`)
- Modify: `src/features/jobs-curator/hooks/useJobsQueryParams.ts` (use `JobTag`)

### Step 4.1 — Add `jobCategoryLabels`

In `constant.ts` append:
```ts
import { JobCategory } from "./types/jobs";

export const jobCategoryLabels: Record<JobCategory, string> = {
  developer: "개발",
  engineering: "엔지니어링·설계",
  finance: "금융",
  business: "경영·비즈니스",
  marketing: "마케팅·광고",
  design: "디자인",
  hr: "HR",
  medical: "의료·제약·바이오",
  sales: "영업",
  customer_service: "고객서비스·리테일",
  media: "미디어",
  manufacturing: "제조·생산",
  logistics: "물류·무역",
  game: "게임 제작",
  security: "정보보호",
  education: "교육",
  legal: "법률·법집행기관",
  food: "식·음료",
  construction: "건설·시설",
  public: "공공·복지",
};
```
Verify the keys/labels match `JobCategoryDropdown.tsx:19-40` exactly.

### Step 4.2 — Wire the dropdown

In `JobCategoryDropdown.tsx` delete the inline `positionLabels` (lines 19-40) and `import { jobCategoryLabels } from "../constant"`. Replace `positionLabels[...]` with `jobCategoryLabels[...]` (2 sites).

### Step 4.3 — Drop the duplicate `Tag` union

In `types/jobs.ts:74` delete the local `type Tag = ...` and change `JobListQueryParams.tags?: Tag[]` → `JobListQueryParams.tags?: JobTag[]`.

### Step 4.4 — Type the local `tags` array in `useJobsQueryParams`

In `hooks/useJobsQueryParams.ts:11` change `let tags = [];` → `const tags: JobTag[] = [];`. Add `import { JobTag } from "../types/jobs";`.

### Step 4.5 — Verify

```bash
npx tsc --noEmit
npm test -- features/jobs-curator
npm run lint
```
Expected: clean.

### Step 4.6 — Commit

```bash
git add -A
git commit -m "refactor(jobs-curator): consolidate label maps; dedupe JobTag/Tag union

Move positionLabels to constant.ts as jobCategoryLabels. Drop the
duplicate Tag union; use JobTag everywhere. Type the tags accumulator
in useJobsQueryParams as const JobTag[]."
```

---

## Task 5 — `getDefaultDateRange` named constants + named branches (P2, finding 1.5)

**Files:**
- Modify: `src/features/jobs-curator/utils/getDefaultDateRange.ts` (full rewrite)
- Modify (maybe): `src/features/jobs-curator/__tests__/utils-date.test.ts` (add coverage if missing)

### Step 5.1 — Inspect current test coverage

```bash
cat src/features/jobs-curator/__tests__/utils-date.test.ts
```
If `getDefaultInternshipDateRange` already has cases for: a date in summer, fall semester, post-Feb, and pre-summer — keep them. Otherwise add them in this step using fixed dates: `2026-06-15`, `2026-10-01`, `2027-03-01`, `2026-03-01`.

### Step 5.2 — Add a "behavior-preserving" snapshot test (if not already covered)

```ts
import { describe, it, expect } from "vitest";
import { getDefaultInternshipDateRange } from "../utils/getDefaultDateRange";

describe("getDefaultInternshipDateRange — branch coverage", () => {
  it("during summer: today + 3 months", () => {
    const r = getDefaultInternshipDateRange(new Date(2026, 5, 15)); // Jun 15
    expect(r.start).toEqual(new Date(2026, 5, 15));
    expect(r.end).toEqual(new Date(2026, 8, 15));
  });
  it("fall semester: next month + 3 months", () => {
    const r = getDefaultInternshipDateRange(new Date(2026, 9, 1)); // Oct 1
    expect(r.start).toEqual(new Date(2026, 10, 1));
    expect(r.end).toEqual(new Date(2027, 1, 1));
  });
  it("post-Feb: next year's summer window", () => {
    const r = getDefaultInternshipDateRange(new Date(2026, 2, 15)); // Mar 15
    expect(r.start).toEqual(new Date(2026, 4, 1));
    expect(r.end).toEqual(new Date(2026, 7, 31));
  });
});
```

Run: `npm test -- utils-date` → must pass on the **current** implementation. This locks behavior before rewrite.

### Step 5.3 — Rewrite the util

Replace `utils/getDefaultDateRange.ts` body:
```ts
import { addMonths } from "date-fns";

const MAY = 4;
const AUGUST = 7;
const SEPTEMBER = 8;
const FEBRUARY = 1;
const SUMMER_INTERNSHIP_LENGTH_MONTHS = 3;

export function getDefaultInternshipDateRange(today: Date = new Date()) {
  const year = today.getFullYear();
  const summerStart   = new Date(year, MAY, 1);
  const summerEnd     = new Date(year, AUGUST, 31);
  const fallStart     = new Date(year, SEPTEMBER, 1);
  const nextSpringEnd = new Date(year + 1, FEBRUARY, 1);

  const isDuringSummer  = today >= summerStart && today <= summerEnd;
  const isFallSemester  = today >= fallStart   && today <  nextSpringEnd;
  const isAfterFebruary = today >= nextSpringEnd;

  if (isDuringSummer) {
    return { start: today, end: addMonths(today, SUMMER_INTERNSHIP_LENGTH_MONTHS) };
  }
  if (isFallSemester) {
    const start = addMonths(today, 1);
    return { start, end: addMonths(start, SUMMER_INTERNSHIP_LENGTH_MONTHS) };
  }
  if (isAfterFebruary) {
    return {
      start: new Date(year + 1, MAY, 1),
      end:   new Date(year + 1, AUGUST, 31),
    };
  }
  return { start: summerStart, end: summerEnd };
}
```

> **Behavior note for reviewer.** Original code uses `setMonth` mutation; new code uses `date-fns/addMonths` which returns a new Date. Both compute the same calendar month addition. The locked test from Step 5.2 proves equivalence on the four representative dates. If your repo has a stricter date library convention, override here.

### Step 5.4 — Verify

```bash
npx tsc --noEmit
npm test -- utils-date
npm run lint
```
Expected: clean, all branch tests pass.

### Step 5.5 — Commit

```bash
git add -A
git commit -m "refactor(jobs-curator): name month constants and branches in getDefaultInternshipDateRange

Replace raw integer months (4, 7, 8, 1) with named constants. Replace
inline today-comparisons with named booleans (isDuringSummer, etc).
Use date-fns addMonths instead of setMonth mutation."
```

---

## Task 6 — Simplify `isPastLocal` (P2, finding 1.4)

**Files:**
- Modify: `src/features/jobs-curator/utils/date.ts:7-18`
- Verify/extend: `src/features/jobs-curator/__tests__/utils-date.test.ts`

### Step 6.1 — Confirm test coverage

The existing test must cover: today (false), yesterday (true), tomorrow (false), and a year-boundary case. If any are missing, add them now and ensure they pass on the **current** implementation before rewriting.

### Step 6.2 — Rewrite

In `utils/date.ts`:
```ts
import { startOfDay } from "date-fns";

export function isPastLocal(date: Date) {
  return startOfDay(date) < startOfDay(new Date());
}
```
Remove the multi-line OR comparison.

### Step 6.3 — Verify

```bash
npx tsc --noEmit
npm test -- utils-date
npm run lint
```

### Step 6.4 — Commit

```bash
git add -A
git commit -m "refactor(jobs-curator): simplify isPastLocal with startOfDay comparison"
```

---

## Final verification

### Step F.1 — Run the full suite

```bash
npx tsc --noEmit
npm test
npm run lint
npm run build
```
Expected: all clean. Build proves Next.js compiles in production mode.

### Step F.2 — Manual visual regression

Re-take the screenshots from Pre-flight Step P.4. Compare against the baseline. Diffs to tolerate: none. Diffs that mean a bug: any.

Specifically click through:
- Switch country KR ↔ US.
- Select each `JobCategory` from the dropdown.
- Toggle 인턴/정규직, 인턴십 유형 multi-select.
- Trigger infinite scroll past the first page.
- Force a 500 from `getJobs` (DevTools Network → Block) → confirm the existing `ErrorBoundary` still catches initial-load failure.
- Force a 500 from `getJobsByNextUrl` → confirm new inline "다시 불러오기" link appears, grid stays.

### Step F.3 — Merge to dev (no PR)

From the worktree:
```bash
git log --oneline dev..HEAD   # confirm 6 commits
```

From the main client clone (NOT the worktree):
```bash
cd /Users/jiohin/Desktop/KISA/DevTeam/dev/KISA-website/client
git checkout dev && git pull origin dev
git merge --no-ff chore/jobs-curator-cleanup -m "merge: jobs-curator P1+P2 cleanup"
git push origin dev
```

### Step F.4 — Worktree cleanup

```bash
cd /Users/jiohin/Desktop/KISA/DevTeam/dev/KISA-website/client
git worktree remove .worktrees/jobs-curator-cleanup
git branch -d chore/jobs-curator-cleanup
```

---

## Out of scope (file separately if needed)

- React Query / SWR migration of `useInfiniteJobs` (decision D1).
- P0 items from the review: `country` / `selectedCountry` consolidation (own PR — touches context contract). `useFormattedJobs → formatJob` + `JobPosting.dueDate` optional ARE in this plan (Task 2).
- P3 items: `TagList` dead-JSX cleanup, `InfiniteScroll` `endMessage` double-wrapping cleanup, `JobPostingCard.getSourceLogo` default behavior — defer until next round.
- `JobsCuratorContext` reducer split (P1, finding 4.1) — touches the public hook surface; needs its own brainstorm.
