"use client";

import { useMemo, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Container,
} from "@umichkisa-ds/web";
import {
  courseEvaluations,
  workloadLabels,
  type CourseEvaluationCourse,
  type CourseEvaluationReview,
  type WorkloadBand,
} from "@/features/course-evaluations/courseEvaluationsData";

const workloadBands = Object.keys(workloadLabels) as WorkloadBand[];

const emptyReview: CourseEvaluationReview = {
  id: "new_review",
  professor: "General",
  rating: null,
  lectureAttendance: "",
  lectureRecording: "",
  groupWork: "",
  labAttendance: "",
  exams: "",
  workload: "",
  workloadBand: "5-10",
  summaryKo: "",
  bulletsKo: [],
  officeHoursKo: "",
  tags: [],
};

const emptyCourse: CourseEvaluationCourse = {
  id: "new_course",
  code: "NEW 101",
  department: "NEW",
  number: "101",
  title: "New Course",
  college: "LSA",
  summaryKo: "",
  tags: [],
  reviews: [{ ...emptyReview }],
};

function toList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function toLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeId(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function courseIdFromCode(code: string) {
  return normalizeId(code.replace(/\s+/g, "-"));
}

export default function CourseEvaluationsAdminView() {
  const [drafts, setDrafts] = useState<CourseEvaluationCourse[]>(courseEvaluations);
  const [selectedId, setSelectedId] = useState(courseEvaluations[0]?.id ?? emptyCourse.id);
  const [selectedReviewId, setSelectedReviewId] = useState(
    courseEvaluations[0]?.reviews[0]?.id ?? emptyReview.id,
  );
  const [copied, setCopied] = useState(false);

  const selected =
    drafts.find((course) => course.id === selectedId) ?? drafts[0] ?? emptyCourse;
  const selectedReview =
    selected.reviews.find((review) => review.id === selectedReviewId) ??
    selected.reviews[0] ??
    emptyReview;

  const stats = useMemo(() => {
    const byDepartment = new Map<string, number>();
    drafts.forEach((course) => {
      byDepartment.set(course.department, (byDepartment.get(course.department) ?? 0) + 1);
    });
    return byDepartment;
  }, [drafts]);

  function updateSelected(next: CourseEvaluationCourse) {
    setDrafts((current) =>
      current.map((course) => (course.id === selected.id ? next : course)),
    );
    setSelectedId(next.id);
    if (!next.reviews.some((review) => review.id === selectedReviewId)) {
      setSelectedReviewId(next.reviews[0]?.id ?? emptyReview.id);
    }
    setCopied(false);
  }

  function updateCourseField<K extends keyof CourseEvaluationCourse>(
    key: K,
    value: CourseEvaluationCourse[K],
  ) {
    updateSelected({ ...selected, [key]: value });
  }

  function updateReviewField<K extends keyof CourseEvaluationReview>(
    key: K,
    value: CourseEvaluationReview[K],
  ) {
    const nextReviews = selected.reviews.map((review) =>
      review.id === selectedReview.id ? { ...review, [key]: value } : review,
    );
    updateSelected({ ...selected, reviews: nextReviews });
  }

  function addCourse() {
    const index = drafts.length + 1;
    const next = {
      ...emptyCourse,
      id: `new_course_${index}`,
      code: `NEW ${100 + index}`,
      title: `New Course ${index}`,
      reviews: [{ ...emptyReview, id: `new_review_${index}` }],
    };
    setDrafts((current) => [next, ...current]);
    setSelectedId(next.id);
    setSelectedReviewId(next.reviews[0].id);
    setCopied(false);
  }

  function duplicateCourse() {
    const next = {
      ...selected,
      id: normalizeId(`${selected.id}_copy`),
      code: `${selected.code} Copy`,
      title: `${selected.title} Copy`,
      reviews: selected.reviews.map((review) => ({
        ...review,
        id: normalizeId(`${review.id}_copy`),
      })),
    };
    setDrafts((current) => [next, ...current]);
    setSelectedId(next.id);
    setSelectedReviewId(next.reviews[0]?.id ?? emptyReview.id);
    setCopied(false);
  }

  function removeCourse() {
    const nextDrafts = drafts.filter((course) => course.id !== selected.id);
    setDrafts(nextDrafts);
    setSelectedId(nextDrafts[0]?.id ?? emptyCourse.id);
    setSelectedReviewId(nextDrafts[0]?.reviews[0]?.id ?? emptyReview.id);
    setCopied(false);
  }

  function addReview() {
    const id = `review_${selected.reviews.length + 1}`;
    updateSelected({
      ...selected,
      reviews: [...selected.reviews, { ...emptyReview, id }],
    });
    setSelectedReviewId(id);
  }

  function removeReview() {
    if (selected.reviews.length <= 1) return;
    const nextReviews = selected.reviews.filter(
      (review) => review.id !== selectedReview.id,
    );
    updateSelected({ ...selected, reviews: nextReviews });
    setSelectedReviewId(nextReviews[0]?.id ?? emptyReview.id);
  }

  async function copyDraftJson() {
    await navigator.clipboard.writeText(JSON.stringify(drafts, null, 2));
    setCopied(true);
  }

  return (
    <Container as="section" size="xl">
      <div className="flex flex-col gap-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-3xl flex-col gap-2">
            <Badge variant="info" className="w-fit">
              Course Evaluations
            </Badge>
            <h1 className="type-h1 text-foreground">Course Evaluations 관리</h1>
            <p className="type-body text-muted-foreground">
              Course cards and review entries are edited as local drafts first. This
              mirrors the public page model before we wire persistence.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={addCourse}>
              Add course
            </Button>
            <Button variant="secondary" onClick={duplicateCourse}>
              Duplicate
            </Button>
            <Button onClick={copyDraftJson}>
              {copied ? "Copied JSON" : "Copy JSON"}
            </Button>
          </div>
        </header>

        <Alert variant="warning" title="Draft-only admin v0">
          이 페이지는 관리자 입력 흐름과 데이터 구조를 검증하기 위한 로컬 draft
          editor입니다. 아직 public page에 저장/게시되지는 않습니다.
        </Alert>

        <div className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              {Array.from(stats.entries()).map(([department, count]) => (
                <Badge key={department} variant="outline" size="sm">
                  {department} {count}
                </Badge>
              ))}
            </div>

            <div className="flex max-h-[70dvh] flex-col gap-2 overflow-y-auto pr-1">
              {drafts.map((course) => {
                const isSelected = course.id === selected.id;
                return (
                  <button
                    key={course.id}
                    type="button"
                    onClick={() => {
                      setSelectedId(course.id);
                      setSelectedReviewId(course.reviews[0]?.id ?? emptyReview.id);
                    }}
                    className={[
                      "rounded-md border p-3 text-left transition-colors",
                      "focus-visible:outline-2 focus-visible:outline-focus-ring",
                      isSelected
                        ? "border-brand-primary bg-info-subtle"
                        : "border-border bg-surface hover:bg-surface-muted",
                    ].join(" ")}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="type-body-sm font-semibold text-foreground">
                        {course.code}
                      </span>
                      <Badge variant="secondary" size="sm">
                        {course.department}
                      </Badge>
                    </div>
                    <p className="type-caption mt-1 text-muted-foreground">
                      {course.title}
                    </p>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
            <Card className="gap-5 p-4">
              <CardHeader>
                <CardTitle as="h2">Course fields</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 overflow-visible md:grid-cols-2">
                <label className="flex flex-col gap-1">
                  <span className="type-caption font-semibold text-muted-foreground">
                    Course code
                  </span>
                  <input
                    value={selected.code}
                    onChange={(event) => {
                      const code = event.target.value.toUpperCase();
                      updateSelected({
                        ...selected,
                        code,
                        id: courseIdFromCode(code),
                        department: code.split(/\s+/)[0] ?? selected.department,
                        number: code.split(/\s+/)[1] ?? selected.number,
                      });
                    }}
                    className="rounded-md border border-border bg-surface px-3 py-2"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="type-caption font-semibold text-muted-foreground">
                    Title
                  </span>
                  <input
                    value={selected.title}
                    onChange={(event) => updateCourseField("title", event.target.value)}
                    className="rounded-md border border-border bg-surface px-3 py-2"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="type-caption font-semibold text-muted-foreground">
                    Department
                  </span>
                  <input
                    value={selected.department}
                    onChange={(event) =>
                      updateCourseField("department", event.target.value.toUpperCase())
                    }
                    className="rounded-md border border-border bg-surface px-3 py-2"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="type-caption font-semibold text-muted-foreground">
                    College
                  </span>
                  <input
                    value={selected.college}
                    onChange={(event) =>
                      updateCourseField("college", event.target.value.toUpperCase())
                    }
                    className="rounded-md border border-border bg-surface px-3 py-2"
                  />
                </label>

                <label className="flex flex-col gap-1 md:col-span-2">
                  <span className="type-caption font-semibold text-muted-foreground">
                    Korean summary
                  </span>
                  <textarea
                    value={selected.summaryKo}
                    onChange={(event) =>
                      updateCourseField("summaryKo", event.target.value)
                    }
                    rows={3}
                    className="rounded-md border border-border bg-surface px-3 py-2"
                  />
                </label>

                <label className="flex flex-col gap-1 md:col-span-2">
                  <span className="type-caption font-semibold text-muted-foreground">
                    Tags (comma-separated)
                  </span>
                  <input
                    value={selected.tags.join(", ")}
                    onChange={(event) => updateCourseField("tags", toList(event.target.value))}
                    className="rounded-md border border-border bg-surface px-3 py-2"
                  />
                </label>

                <div className="md:col-span-2">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <span className="type-caption font-semibold text-muted-foreground">
                      Reviews
                    </span>
                    <div className="flex gap-2">
                      <Button variant="secondary" onClick={addReview}>
                        Add review
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={removeReview}
                        disabled={selected.reviews.length <= 1}
                      >
                        Remove review
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selected.reviews.map((review, index) => (
                      <button
                        key={review.id}
                        type="button"
                        onClick={() => setSelectedReviewId(review.id)}
                        className={[
                          "rounded-full border px-3 py-1.5 text-sm transition-colors",
                          selectedReview.id === review.id
                            ? "border-brand-primary bg-info-subtle text-foreground"
                            : "border-border bg-surface text-muted-foreground hover:bg-surface-muted",
                        ].join(" ")}
                      >
                        Review {index + 1}: {review.professor}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="flex flex-col gap-1">
                  <span className="type-caption font-semibold text-muted-foreground">
                    Professor
                  </span>
                  <input
                    value={selectedReview.professor}
                    onChange={(event) =>
                      updateReviewField("professor", event.target.value)
                    }
                    className="rounded-md border border-border bg-surface px-3 py-2"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="type-caption font-semibold text-muted-foreground">
                    Rating
                  </span>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={selectedReview.rating ?? ""}
                    onChange={(event) =>
                      updateReviewField(
                        "rating",
                        event.target.value ? Number(event.target.value) : null,
                      )
                    }
                    className="rounded-md border border-border bg-surface px-3 py-2"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="type-caption font-semibold text-muted-foreground">
                    Lecture attendance
                  </span>
                  <input
                    value={selectedReview.lectureAttendance}
                    onChange={(event) =>
                      updateReviewField("lectureAttendance", event.target.value)
                    }
                    className="rounded-md border border-border bg-surface px-3 py-2"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="type-caption font-semibold text-muted-foreground">
                    Lecture recording
                  </span>
                  <input
                    value={selectedReview.lectureRecording}
                    onChange={(event) =>
                      updateReviewField("lectureRecording", event.target.value)
                    }
                    className="rounded-md border border-border bg-surface px-3 py-2"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="type-caption font-semibold text-muted-foreground">
                    Group work
                  </span>
                  <input
                    value={selectedReview.groupWork}
                    onChange={(event) => updateReviewField("groupWork", event.target.value)}
                    className="rounded-md border border-border bg-surface px-3 py-2"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="type-caption font-semibold text-muted-foreground">
                    Lab/discussion
                  </span>
                  <input
                    value={selectedReview.labAttendance}
                    onChange={(event) =>
                      updateReviewField("labAttendance", event.target.value)
                    }
                    className="rounded-md border border-border bg-surface px-3 py-2"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="type-caption font-semibold text-muted-foreground">
                    Exams
                  </span>
                  <input
                    value={selectedReview.exams}
                    onChange={(event) => updateReviewField("exams", event.target.value)}
                    className="rounded-md border border-border bg-surface px-3 py-2"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="type-caption font-semibold text-muted-foreground">
                    Workload band
                  </span>
                  <select
                    value={selectedReview.workloadBand}
                    onChange={(event) =>
                      updateReviewField("workloadBand", event.target.value as WorkloadBand)
                    }
                    className="rounded-md border border-border bg-surface px-3 py-2"
                  >
                    {workloadBands.map((band) => (
                      <option key={band} value={band}>
                        {workloadLabels[band]}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-1 md:col-span-2">
                  <span className="type-caption font-semibold text-muted-foreground">
                    Review summary
                  </span>
                  <textarea
                    value={selectedReview.summaryKo}
                    onChange={(event) =>
                      updateReviewField("summaryKo", event.target.value)
                    }
                    rows={3}
                    className="rounded-md border border-border bg-surface px-3 py-2"
                  />
                </label>

                <label className="flex flex-col gap-1 md:col-span-2">
                  <span className="type-caption font-semibold text-muted-foreground">
                    Bullets (one per line)
                  </span>
                  <textarea
                    value={selectedReview.bulletsKo.join("\n")}
                    onChange={(event) =>
                      updateReviewField("bulletsKo", toLines(event.target.value))
                    }
                    rows={4}
                    className="rounded-md border border-border bg-surface px-3 py-2"
                  />
                </label>

                <label className="flex flex-col gap-1 md:col-span-2">
                  <span className="type-caption font-semibold text-muted-foreground">
                    Office hour note
                  </span>
                  <textarea
                    value={selectedReview.officeHoursKo}
                    onChange={(event) =>
                      updateReviewField("officeHoursKo", event.target.value)
                    }
                    rows={2}
                    className="rounded-md border border-border bg-surface px-3 py-2"
                  />
                </label>

                <label className="flex flex-col gap-1 md:col-span-2">
                  <span className="type-caption font-semibold text-muted-foreground">
                    Review tags (comma-separated)
                  </span>
                  <input
                    value={selectedReview.tags.join(", ")}
                    onChange={(event) =>
                      updateReviewField("tags", toList(event.target.value))
                    }
                    className="rounded-md border border-border bg-surface px-3 py-2"
                  />
                </label>

                <div className="flex justify-end md:col-span-2">
                  <Button
                    variant="secondary"
                    onClick={removeCourse}
                    disabled={drafts.length <= 1}
                  >
                    Remove selected course
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="gap-4 p-4">
              <CardHeader>
                <CardTitle as="h2">Public preview</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 overflow-visible">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="info">{selected.code}</Badge>
                  <Badge variant="outline">{selected.college}</Badge>
                </div>
                <div>
                  <h3 className="type-h3 text-foreground">{selected.title}</h3>
                  <p className="type-body-sm text-muted-foreground">
                    {selected.summaryKo || "No Korean summary yet."}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selected.tags.map((tag) => (
                    <Badge key={tag} variant="outline" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="rounded-md border border-border bg-surface-muted p-3">
                  <p className="type-caption font-semibold text-muted-foreground">
                    Selected review
                  </p>
                  <p className="type-body-sm mt-1 font-semibold text-foreground">
                    {selectedReview.professor}
                  </p>
                  <p className="type-body-sm mt-1 text-muted-foreground">
                    {selectedReview.summaryKo || "No review summary yet."}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <Badge variant="secondary" size="sm">
                      {workloadLabels[selectedReview.workloadBand]}
                    </Badge>
                    {selectedReview.tags.map((tag) => (
                      <Badge key={tag} variant="outline" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  );
}
