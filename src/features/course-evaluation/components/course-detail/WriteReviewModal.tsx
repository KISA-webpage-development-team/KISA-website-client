"use client";

import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { createReview } from "@/apis/courses/mutations";
import type { NewReviewBody, Workload } from "@/types/course";

const WORKLOAD_OPTIONS: Workload[] = [
  "5시간 미만",
  "5~10시간",
  "10~15시간",
  "15시간 이상",
];

type WriteReviewModalProps = {
  courseCode: string;
  token: string | undefined;
  onSuccess: () => void;
};

type FormValues = Omit<NewReviewBody, "courseCode" | "email">;

export default function WriteReviewModal({
  courseCode,
  token,
  onSuccess,
}: WriteReviewModalProps) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      semester: "",
      lectureAttendance: false,
      lectureRecording: false,
      groupWork: false,
      labAttendance: false,
      exam: "",
      workload: "5~10시간",
      courseComment: "",
      professors: [{ name: "", rating: 5, comment: "" }],
    },
  });

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    setSubmitError(null);
    try {
      await createReview(
        courseCode,
        { ...values, courseCode, email: "" },
        token
      );
      reset();
      setOpen(false);
      onSuccess();
    } catch {
      setSubmitError("리뷰 등록에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="rounded-md bg-michigan-blue px-4 py-2 text-sm text-white hover:opacity-90">
          + 리뷰 작성
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
          <Dialog.Title className="mb-4 text-lg font-bold text-michigan-blue">
            리뷰 작성 — {courseCode}
          </Dialog.Title>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-gray-700">수강 학기</span>
              <input
                {...register("semester", { required: true })}
                placeholder="예: 2024 Winter"
                className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-michigan-blue focus:outline-none"
              />
            </label>

            <div className="grid grid-cols-2 gap-3 text-sm">
              {(
                [
                  ["lectureAttendance", "출석 필수"],
                  ["lectureRecording", "강의 녹화"],
                  ["groupWork", "팀플"],
                  ["labAttendance", "실험 출석 필수"],
                ] as const
              ).map(([field, label]) => (
                <label key={field} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register(field)}
                    className="h-4 w-4"
                  />
                  <span className="text-gray-700">{label}</span>
                </label>
              ))}
            </div>

            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-gray-700">시험 형태</span>
              <input
                {...register("exam", { required: true })}
                placeholder="예: 중간 1회, 기말 1회"
                className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-michigan-blue focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-gray-700">주간 Workload</span>
              <select
                {...register("workload")}
                className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-michigan-blue focus:outline-none"
              >
                {WORKLOAD_OPTIONS.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-gray-700">교수 평가</span>
              <div className="flex flex-col gap-2 rounded-md border border-gray-200 p-3">
                <input
                  {...register("professors.0.name", { required: true })}
                  placeholder="교수 이름"
                  className="rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-none"
                />
                <select
                  {...register("professors.0.rating", { valueAsNumber: true })}
                  className="rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-none"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {"★".repeat(n)} ({n}점)
                    </option>
                  ))}
                </select>
                <input
                  {...register("professors.0.comment")}
                  placeholder="교수 코멘트"
                  className="rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-none"
                />
              </div>
            </div>

            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-gray-700">강의 총평</span>
              <textarea
                {...register("courseComment", { required: true })}
                placeholder="수강 후기를 자유롭게 작성해주세요"
                rows={4}
                className="resize-none rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-michigan-blue focus:outline-none"
              />
            </label>

            {submitError && (
              <p className="text-sm text-red-500">{submitError}</p>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                >
                  취소
                </button>
              </Dialog.Close>
              <button
                type="submit"
                disabled={submitting}
                className="rounded-md bg-michigan-blue px-4 py-2 text-sm text-white hover:opacity-90 disabled:opacity-60"
              >
                {submitting ? "등록 중..." : "리뷰 등록"}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
