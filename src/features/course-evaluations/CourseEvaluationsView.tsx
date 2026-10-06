"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search, SlidersHorizontal, Star } from "lucide-react";
import {
  Alert,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@umichkisa-ds/web";
import {
  courseColleges,
  courseDepartments,
  courseEvaluations,
  workloadLabels,
  type CourseEvaluationCourse,
  type WorkloadBand,
} from "./courseEvaluationsData";

type FilterState = {
  department: string;
  college: string;
  workload: WorkloadBand | "all";
  recording: "all" | "available";
  attendance: "all" | "not-required" | "required";
};

type ViewMode = "v1" | "v2";

const defaultFilters: FilterState = {
  department: "all",
  college: "all",
  workload: "all",
  recording: "all",
  attendance: "all",
};

const workloadOptions: Array<WorkloadBand | "all"> = [
  "all",
  "under-5",
  "5-10",
  "10-15",
  "15-plus",
  "20-plus",
];

function displaySignal(value: string) {
  const lower = value.toLowerCase();
  if (lower.includes("not required")) return "자율";
  if (lower.includes("required")) return "필수";
  if (lower.includes("project")) return "프로젝트";
  if (lower.includes("available")) return "녹화 있음";
  if (lower.includes("unavailable")) return "녹화 없음";
  if (lower.includes("optional")) return "선택";
  if (lower.includes("none")) return "없음";
  if (lower.includes("midterm") || lower.includes("final") || lower.includes("exam")) {
    return value
      .replaceAll("Midterms", "Midterms")
      .replaceAll("Midterm", "Midterm")
      .replaceAll("Final", "Final");
  }
  return value;
}

function displayExamSummary(value: string) {
  return value
    .replaceAll("Midterms", "Midterms")
    .replaceAll("Midterm", "Midterm")
    .replaceAll("Final", "Final")
    .replaceAll("Quizzes", "Quizzes")
    .replaceAll("Quiz", "Quiz")
    .replaceAll("Curved", "커브 있음")
    .replaceAll("No Curve", "커브 없음")
    .replaceAll("Not Curved", "커브 없음");
}

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function includesSearch(course: CourseEvaluationCourse, query: string) {
  if (!query) return true;
  const searchable = [
    course.code,
    course.department,
    course.number,
    course.title,
    course.college,
    course.summaryKo,
    course.tags.join(" "),
    ...course.reviews.flatMap((review) => [
      review.professor,
      review.summaryKo,
      review.bulletsKo.join(" "),
      review.tags.join(" "),
      review.exams,
      review.workload,
    ]),
  ].join(" ");

  return normalize(searchable).includes(query);
}

function courseMatchesFilters(course: CourseEvaluationCourse, filters: FilterState) {
  if (filters.department !== "all" && course.department !== filters.department) {
    return false;
  }

  if (filters.college !== "all" && course.college !== filters.college) {
    return false;
  }

  if (
    filters.workload !== "all" &&
    !course.reviews.some((review) => review.workloadBand === filters.workload)
  ) {
    return false;
  }

  if (
    filters.recording === "available" &&
    !course.reviews.some((review) =>
      review.lectureRecording.toLowerCase().includes("available"),
    )
  ) {
    return false;
  }

  if (
    filters.attendance === "not-required" &&
    !course.reviews.some((review) =>
      review.lectureAttendance.toLowerCase().includes("not required"),
    )
  ) {
    return false;
  }

  if (
    filters.attendance === "required" &&
    !course.reviews.some(
      (review) =>
        review.lectureAttendance.toLowerCase().includes("required") &&
        !review.lectureAttendance.toLowerCase().includes("not required"),
    )
  ) {
    return false;
  }

  return true;
}

function averageRating(course: CourseEvaluationCourse) {
  const ratings = course.reviews
    .map((review) => review.rating)
    .filter((rating): rating is number => typeof rating === "number");

  if (!ratings.length) return null;
  return ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
}

function getPrimaryReview(course: CourseEvaluationCourse) {
  return course.reviews[0] ?? null;
}

function getCourseSignals(course: CourseEvaluationCourse) {
  const primaryReview = getPrimaryReview(course);
  if (!primaryReview) return [];

  return [
    ["출석", displaySignal(primaryReview.lectureAttendance)],
    ["녹화", displaySignal(primaryReview.lectureRecording)],
    ["시험", displayExamSummary(primaryReview.exams)],
    ["그룹", displaySignal(primaryReview.groupWork)],
  ];
}

function FilterButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={[
        "rounded-full border px-3 py-1.5 text-sm font-medium transition-[background-color,border-color,color,transform] duration-150 ease-out active:scale-[0.98]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
        active
          ? "border-brand-primary bg-surface text-brand-primary shadow-sm"
          : "border-border bg-surface text-muted-foreground hover:border-brand-primary/40 hover:bg-surface-muted hover:text-foreground",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="rounded-xl border border-border bg-surface p-3">
      <legend className="px-1 type-caption font-semibold text-muted-foreground">
        {label}
      </legend>
      <div className="mt-2 flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

function CourseListItem({
  course,
  selected,
  onSelect,
}: {
  course: CourseEvaluationCourse;
  selected: boolean;
  onSelect: () => void;
}) {
  const rating = averageRating(course);
  const reviewCount = course.reviews.length;
  const primaryReview = course.reviews[0];
  const summaryItems = getCourseSignals(course);

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={[
        "group w-full border-b border-border px-4 py-4 text-left transition-colors duration-150 last:border-b-0 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-focus-ring md:px-5",
        selected
          ? "bg-surface-muted"
          : "bg-surface hover:bg-surface-muted/60",
      ].join(" ")}
    >
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_112px] lg:items-start">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-michigan-blue px-2.5 py-1 text-sm font-semibold text-white">
              {course.code}
            </span>
            <span className="type-caption font-semibold text-muted-foreground">
              {course.college}
            </span>
            <span className="type-caption text-muted-foreground">
              후기 {reviewCount}개
            </span>
          </div>
          <h2 className="type-body font-semibold text-foreground md:type-h3">
            {course.title}
          </h2>
          <p className="type-body-sm mt-1 line-clamp-2 text-muted-foreground">
            {course.summaryKo}
          </p>
          <dl className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
            {summaryItems.map(([label, value]) => (
              <div key={label} className="flex items-baseline gap-1.5">
                <dt className="type-caption font-semibold text-muted-foreground">
                  {label}
                </dt>
                <dd className="type-caption font-medium text-foreground">
                  {value}
                </dd>
              </div>
            ))}
            {primaryReview ? (
              <div className="flex items-baseline gap-1.5">
                <dt className="type-caption font-semibold text-muted-foreground">
                  워크로드
                </dt>
                <dd className="type-caption font-medium text-foreground">
                  {workloadLabels[primaryReview.workloadBand]}
                </dd>
              </div>
            ) : null}
          </dl>
        </div>

        <div className="flex items-center justify-between gap-3 lg:flex-col lg:items-end">
          <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <Star
              aria-hidden="true"
              className="size-4 fill-michigan-maize text-michigan-dark-maize"
            />
            {rating ? `${rating.toFixed(1)} / 5` : "N/A"}
          </div>
          <span className="flex items-center gap-1 type-caption font-medium text-brand-primary">
            {selected ? "선택됨" : "보기"}
            <ChevronDown
              aria-hidden="true"
              className={[
                "size-4 -rotate-90 transition-transform duration-200 motion-reduce:transition-none",
                selected ? "translate-x-0.5" : "",
              ].join(" ")}
            />
          </span>
        </div>
      </div>
    </button>
  );
}

function CourseDetailPanel({ course }: { course: CourseEvaluationCourse | null }) {
  if (!course) {
    return (
      <Card className="rounded-[28px] p-6">
        <p className="type-body text-muted-foreground">
          왼쪽에서 강의를 선택하면 자세한 후기가 표시됩니다.
        </p>
      </Card>
    );
  }

  const rating = averageRating(course);
  const primaryReview = getPrimaryReview(course);

  return (
    <Card className="rounded-[28px] p-0 shadow-sm">
      <CardHeader className="border-b border-border p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-lg bg-michigan-blue px-2.5 py-1 text-sm font-semibold text-white">
            {course.code}
          </span>
          <Badge variant="outline" size="sm">
            {course.college}
          </Badge>
          <Badge variant="secondary" size="sm">
            후기 {course.reviews.length}개
          </Badge>
        </div>
        <div>
          <CardTitle as="h2" className="mt-3">
            {course.title}
          </CardTitle>
          <p className="type-body-sm mt-2 text-muted-foreground">
            {course.summaryKo}
          </p>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border pt-4">
          <div className="flex items-center gap-1.5 font-semibold text-foreground">
            <Star
              aria-hidden="true"
              className="size-4 fill-michigan-maize text-michigan-dark-maize"
            />
            {rating ? `${rating.toFixed(1)} / 5` : "N/A"}
          </div>
          {primaryReview ? (
            <span className="type-body-sm font-medium text-foreground">
              {workloadLabels[primaryReview.workloadBand]}
            </span>
          ) : null}
          <span className="type-caption text-muted-foreground">
            W25 KISA booklet pilot
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {course.reviews.map((review) => (
            <article key={review.id} className="p-5">
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="type-body font-semibold text-foreground">
                    {review.professor}
                  </h3>
                  <p className="type-body-sm mt-1 text-muted-foreground">
                    {review.summaryKo}
                  </p>
                </div>
                <Badge variant="secondary" className="w-fit">
                  {workloadLabels[review.workloadBand]}
                </Badge>
              </div>

              <dl className="mt-4 grid gap-x-4 gap-y-3 border-y border-border py-4 sm:grid-cols-2">
                {[
                  ["출석", displaySignal(review.lectureAttendance)],
                  ["녹화", displaySignal(review.lectureRecording)],
                  ["시험", displayExamSummary(review.exams)],
                  ["그룹워크", displaySignal(review.groupWork)],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="type-caption font-semibold text-muted-foreground">
                      {label}
                    </dt>
                    <dd className="type-body-sm text-foreground">{value}</dd>
                  </div>
                ))}
              </dl>

              <ul className="mt-4 flex flex-col gap-2">
                {review.bulletsKo.map((bullet) => (
                  <li key={bullet} className="type-body-sm flex gap-2 text-foreground">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 rounded-full bg-brand-primary"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 border-l-2 border-brand-primary/30 pl-3">
                <p className="type-caption font-semibold text-muted-foreground">
                  Office Hour
                </p>
                <p className="type-body-sm text-foreground">{review.officeHoursKo}</p>
              </div>
              <p className="mt-3 type-caption text-muted-foreground">
                Source: W25 KISA Course Evaluation Booklet pilot · 교수/섹션별 학생 후기
              </p>
            </article>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function CoursePanelCard({
  course,
  expanded,
  onToggle,
}: {
  course: CourseEvaluationCourse;
  expanded: boolean;
  onToggle: () => void;
}) {
  const rating = averageRating(course);
  const primaryReview = getPrimaryReview(course);
  const summaryItems = getCourseSignals(course);

  return (
    <Card className="overflow-hidden rounded-[30px] border-border bg-surface p-0 shadow-none">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="group w-full px-5 py-5 text-left transition-colors duration-150 hover:bg-surface-muted/40 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-focus-ring md:px-6"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-xl bg-michigan-blue px-2.5 py-1 text-sm font-semibold text-white">
                {course.code}
              </span>
              <span className="type-caption font-semibold text-muted-foreground">
                {course.college}
              </span>
              <span className="type-caption text-muted-foreground">
                후기 {course.reviews.length}개
              </span>
            </div>
            <h2 className="type-h3 text-foreground">{course.title}</h2>
            <p className="type-body-sm mt-2 max-w-3xl text-muted-foreground">
              {course.summaryKo}
            </p>
          </div>

          <div className="flex shrink-0 items-center justify-between gap-4 md:min-w-[150px] md:justify-end">
            <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
              <Star
                aria-hidden="true"
                className="size-4 fill-michigan-maize text-michigan-dark-maize"
              />
              {rating ? `${rating.toFixed(1)} / 5` : "N/A"}
            </div>
            <ChevronDown
              aria-hidden="true"
              className={[
                "size-5 text-muted-foreground transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none",
                expanded ? "rotate-180" : "",
              ].join(" ")}
            />
          </div>
        </div>

        <dl className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4">
          {summaryItems.map(([label, value]) => (
            <div key={label} className="flex items-baseline gap-1.5">
              <dt className="type-caption font-semibold text-muted-foreground">
                {label}
              </dt>
              <dd className="type-caption font-medium text-foreground">{value}</dd>
            </div>
          ))}
          {primaryReview ? (
            <div className="flex items-baseline gap-1.5">
              <dt className="type-caption font-semibold text-muted-foreground">
                워크로드
              </dt>
              <dd className="type-caption font-medium text-foreground">
                {workloadLabels[primaryReview.workloadBand]}
              </dd>
            </div>
          ) : null}
        </dl>
      </button>

      <div
        className={[
          "grid transition-[grid-template-rows,opacity] duration-[280ms] ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none",
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        ].join(" ")}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-border px-5 py-5 md:px-6">
            <div className="divide-y divide-border">
              {course.reviews.map((review) => (
                <article key={review.id} className="py-5 first:pt-0 last:pb-0">
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="type-body font-semibold text-foreground">
                        {review.professor}
                      </h3>
                      <p className="type-body-sm mt-1 text-muted-foreground">
                        {review.summaryKo}
                      </p>
                    </div>
                    <Badge variant="secondary" className="w-fit">
                      {workloadLabels[review.workloadBand]}
                    </Badge>
                  </div>

                  <dl className="mt-4 grid gap-x-4 gap-y-3 sm:grid-cols-2">
                    {[
                      ["출석", displaySignal(review.lectureAttendance)],
                      ["녹화", displaySignal(review.lectureRecording)],
                      ["시험", displayExamSummary(review.exams)],
                      ["그룹워크", displaySignal(review.groupWork)],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <dt className="type-caption font-semibold text-muted-foreground">
                          {label}
                        </dt>
                        <dd className="type-body-sm text-foreground">{value}</dd>
                      </div>
                    ))}
                  </dl>

                  <ul className="mt-4 flex flex-col gap-2">
                    {review.bulletsKo.map((bullet) => (
                      <li
                        key={bullet}
                        className="type-body-sm flex gap-2 text-foreground"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 size-1.5 rounded-full bg-brand-primary"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function CourseEvaluationsView() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [selectedId, setSelectedId] = useState(courseEvaluations[0]?.id ?? "");
  const [viewMode, setViewMode] = useState<ViewMode>("v2");
  const [expandedId, setExpandedId] = useState(courseEvaluations[0]?.id ?? "");

  const normalizedQuery = normalize(query);

  const filteredCourses = useMemo(
    () =>
      courseEvaluations.filter(
        (course) =>
          includesSearch(course, normalizedQuery) &&
          courseMatchesFilters(course, filters),
      ),
    [filters, normalizedQuery],
  );
  const selectedCourse =
    filteredCourses.find((course) => course.id === selectedId) ??
    filteredCourses[0] ??
    null;

  function updateFilter<K extends keyof FilterState>(key: K, value: FilterState[K]) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  function clearFilters() {
    setQuery("");
    setFilters(defaultFilters);
  }

  return (
    <section>
      <div className="flex flex-col gap-6">
        <header className="grid gap-5 rounded-[32px] border border-border bg-[linear-gradient(135deg,#071a33_0%,#0b2d52_48%,#101820_100%)] p-5 text-white shadow-sm md:p-7 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div className="flex max-w-3xl flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 type-caption font-semibold text-michigan-maize">
                Course Evaluations
              </span>
              <span className="type-caption font-medium text-white/70">
                W25 booklet pilot
              </span>
            </div>
            <h1 className="text-balance text-4xl font-semibold tracking-normal text-white md:text-5xl">
              KISA 수강 후기
            </h1>
            <p className="type-body max-w-2xl text-white/72">
              KISA가 수집한 학생 경험 기반 코스 후기입니다. 강의 코드, 교수님,
              워크로드, 출석, 녹화 여부를 빠르게 비교해보세요.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/15 bg-white/[0.08] p-4 backdrop-blur">
            <div className="mb-4 rounded-2xl border border-white/15 bg-white/10 p-1">
              <div className="grid grid-cols-2 gap-1" aria-label="보기 방식 선택">
                {[
                  ["v1", "V1 패널"],
                  ["v2", "V2 브라우저"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={viewMode === value}
                    onClick={() => setViewMode(value as ViewMode)}
                    className={[
                      "rounded-xl px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                      viewMode === value
                        ? "bg-white text-michigan-blue shadow-sm"
                        : "text-white/72 hover:bg-white/10 hover:text-white",
                    ].join(" ")}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-x-5 gap-y-3">
              <div>
                <dt className="type-caption font-semibold text-white/60">
                  정리된 강의
                </dt>
                <dd className="mt-1 text-2xl font-semibold text-white">
                  {courseEvaluations.length}
                </dd>
              </div>
              <div>
                <dt className="type-caption font-semibold text-white/60">
                  포함 학과
                </dt>
                <dd className="mt-1 text-2xl font-semibold text-white">
                  {courseDepartments.length}
                </dd>
              </div>
            </dl>
            <div className="mt-3 border-t border-white/15 pt-3">
              <p className="type-body-sm text-white/64">
                EECS, ECON, MATH, STATS, IOE, COMM, PSYCH, ASIAN 중심의 첫 번째
                파일럿입니다.
              </p>
            </div>
          </div>
        </header>

        <Alert variant="warning" title="비공식 KISA 참고 자료">
          본 페이지는 KISA에서 수집한 학생 후기 기반 참고 자료입니다. 정확한
          학점, prerequisite, 수강 가능 여부, 졸업 요건은 반드시{" "}
          <a
            href="https://guide.ro.umich.edu/"
            target="_blank"
            rel="noreferrer"
            aria-label="UM Course Guide 새 탭에서 열기"
            className="font-semibold underline underline-offset-2"
          >
            UM Course Guide<span className="sr-only"> 새 탭에서 열기</span>
          </a>
          와{" "}
          <a
            href="https://atlas.ai.umich.edu/"
            target="_blank"
            rel="noreferrer"
            aria-label="Atlas 새 탭에서 열기"
            className="font-semibold underline underline-offset-2"
          >
            Atlas<span className="sr-only"> 새 탭에서 열기</span>
          </a>
          에서 다시 확인해주세요.
        </Alert>

        <Card className="gap-4 rounded-[28px] border-border bg-surface p-4 shadow-sm">
          <label className="flex flex-col gap-2">
            <span className="flex items-center gap-2 type-caption font-semibold text-muted-foreground">
              <Search aria-hidden="true" className="size-4" />
              강의 코드, 학과, 교수님, 키워드 검색
            </span>
            <div className="relative">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="EECS 280, ECON, 워크로드 낮음, 녹화 있음..."
                className="w-full rounded-2xl border border-border bg-surface py-4 pl-10 pr-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-brand-primary"
              />
            </div>
          </label>

          <div className="flex flex-wrap gap-2" aria-label="빠른 필터">
            <FilterButton
              active={filters.workload === "under-5"}
              onClick={() => updateFilter("workload", "under-5")}
            >
              워크로드 낮음
            </FilterButton>
            <FilterButton
              active={filters.recording === "available"}
              onClick={() => updateFilter("recording", "available")}
            >
              녹화 있음
            </FilterButton>
            <FilterButton
              active={filters.attendance === "not-required"}
              onClick={() => updateFilter("attendance", "not-required")}
            >
              출석 자유
            </FilterButton>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal
                aria-hidden="true"
                className="size-4 text-muted-foreground"
              />
              <p className="type-caption font-semibold text-muted-foreground">
                필터
              </p>
            </div>
            <div className="grid gap-3 lg:grid-cols-2">
              <FilterGroup label="학과">
                <FilterButton
                  active={filters.department === "all"}
                  onClick={() => updateFilter("department", "all")}
                >
                  전체 학과
                </FilterButton>
                {courseDepartments.map((department) => (
                  <FilterButton
                    key={department}
                    active={filters.department === department}
                    onClick={() => updateFilter("department", department)}
                  >
                    {department}
                  </FilterButton>
                ))}
              </FilterGroup>

              <FilterGroup label="단과대">
                <FilterButton
                  active={filters.college === "all"}
                  onClick={() => updateFilter("college", "all")}
                >
                  전체 단과대
                </FilterButton>
                {courseColleges.map((college) => (
                  <FilterButton
                    key={college}
                    active={filters.college === college}
                    onClick={() => updateFilter("college", college)}
                  >
                    {college}
                  </FilterButton>
                ))}
              </FilterGroup>

              <FilterGroup label="워크로드">
                {workloadOptions.map((workload) => (
                  <FilterButton
                    key={workload}
                    active={filters.workload === workload}
                    onClick={() => updateFilter("workload", workload)}
                  >
                    {workload === "all" ? "전체 워크로드" : workloadLabels[workload]}
                  </FilterButton>
                ))}
              </FilterGroup>

              <FilterGroup label="수업 운영">
                <FilterButton
                  active={filters.recording === "available"}
                  onClick={() =>
                    updateFilter(
                      "recording",
                      filters.recording === "available" ? "all" : "available",
                    )
                  }
                >
                  녹화 있음
                </FilterButton>
                <FilterButton
                  active={filters.attendance === "not-required"}
                  onClick={() =>
                    updateFilter(
                      "attendance",
                      filters.attendance === "not-required" ? "all" : "not-required",
                    )
                  }
                >
                  출석 자유
                </FilterButton>
                <FilterButton
                  active={filters.attendance === "required"}
                  onClick={() =>
                    updateFilter(
                      "attendance",
                      filters.attendance === "required" ? "all" : "required",
                    )
                  }
                >
                  출석 필수
                </FilterButton>
              </FilterGroup>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
            <p className="type-body-sm text-muted-foreground">
              {filteredCourses.length}개 강의 표시 중
            </p>
            <Button variant="secondary" onClick={clearFilters}>
              필터 초기화
            </Button>
          </div>
        </Card>

        {viewMode === "v1" ? (
          <section className="flex flex-col gap-4" aria-label="V1 panel course cards">
            {filteredCourses.length ? (
              filteredCourses.map((course) => (
                <CoursePanelCard
                  key={course.id}
                  course={course}
                  expanded={expandedId === course.id}
                  onToggle={() =>
                    setExpandedId((current) => (current === course.id ? "" : course.id))
                  }
                />
              ))
            ) : (
              <Card className="rounded-[28px] p-8 text-center shadow-none">
                <CardHeader>
                  <CardTitle as="h2">검색 결과가 없습니다</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="type-body text-muted-foreground">
                    다른 department나 workload 필터로 다시 찾아보세요.
                  </p>
                </CardContent>
              </Card>
            )}
          </section>
        ) : (
          <section
            className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start"
            aria-label="V2 course browser"
          >
            <Card className="overflow-hidden rounded-[28px] p-0 shadow-none">
              <div className="border-b border-border bg-surface-muted/40 px-4 py-3 md:px-5">
                <p className="type-caption font-semibold text-muted-foreground">
                  강의 목록
                </p>
              </div>
              {filteredCourses.length ? (
                <div>
                  {filteredCourses.map((course) => (
                    <CourseListItem
                      key={course.id}
                      course={course}
                      selected={selectedCourse?.id === course.id}
                      onSelect={() => setSelectedId(course.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <CardHeader>
                    <CardTitle as="h2">검색 결과가 없습니다</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="type-body text-muted-foreground">
                      다른 department나 workload 필터로 다시 찾아보세요.
                    </p>
                  </CardContent>
                </div>
              )}
            </Card>

            <aside className="lg:sticky lg:top-24">
              <CourseDetailPanel course={selectedCourse} />
            </aside>
          </section>
        )}
      </div>
    </section>
  );
}
