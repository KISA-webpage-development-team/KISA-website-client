"use client";

import { useEffect, useRef } from "react";
import { Form, useFormContext } from "@umichkisa-ds/form";

interface PochaInfoFieldsProps {}

function startOfDay(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

export default function PochaInfoFields(_props: PochaInfoFieldsProps) {
  // Cross-field validation: re-trigger end-field rules whenever start fields
  // change. Colocated here so the rules and the re-validation glue live in
  // one file (Toss `cohesion-form-structure`). `useFormContext` is imported
  // from `@umichkisa-ds/form` (not `react-hook-form`) so it reads from the
  // same RHF instance the DS `<FormProvider>` writes to.
  const { watch, trigger } = useFormContext();
  const watchedStartDate = watch("startDate");
  const watchedStartTime = watch("startTime");

  // Skip the mount run: with `mode: "onTouched"`, programmatic `trigger()`
  // still surfaces "required" errors on untouched fields, so re-validating
  // empty end fields on initial render flashes errors before the user has
  // typed anything. Only re-trigger when start fields actually change.
  const didMount = useRef(false);
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    trigger(["endDate", "endTime"]);
  }, [watchedStartDate, watchedStartTime, trigger]);

  return (
    <div className="flex w-full flex-col gap-6">
      <Form.Input
        name="title"
        label="포차 이름"
        type="text"
        rules={{ required: "포차 제목을 입력해주세요." }}
      />
      <Form.Input
        name="description"
        label="포차 설명"
        type="text"
        rules={{ required: "포차 설명을 입력해주세요." }}
      />
      <Form.DatePicker
        name="startDate"
        label="시작 날짜"
        rules={{ required: "유효한 시작 날짜를 입력해주세요." }}
      />
      <Form.Input
        name="startTime"
        label="시작 시간"
        type="time"
        rules={{ required: "유효한 시작 시간을 입력해주세요." }}
      />
      <Form.DatePicker
        name="endDate"
        label="종료 날짜"
        rules={{
          required: "유효한 종료 날짜를 입력해주세요.",
          validate: (value: Date | undefined, values: Record<string, unknown>) => {
            const start = values.startDate as Date | undefined;
            if (!value || !start) return true;
            return startOfDay(value) < startOfDay(start)
              ? "종료 날짜는 시작 날짜보다 빠를 수 없습니다."
              : true;
          },
        }}
      />
      <Form.Input
        name="endTime"
        label="종료 시간"
        type="time"
        rules={{
          required: "유효한 종료 시간을 입력해주세요.",
          validate: (value: string, values: Record<string, unknown>) => {
            const startDate = values.startDate as Date | undefined;
            const endDate = values.endDate as Date | undefined;
            const startTime = values.startTime as string | undefined;
            if (!value || !startTime || !startDate || !endDate) return true;
            // Only enforce time ordering when start and end fall on the same day;
            // when end is on a later day, any time is fine.
            if (startOfDay(endDate) > startOfDay(startDate)) return true;
            return value <= startTime
              ? "종료 시간은 시작 시간보다 늦어야 합니다."
              : true;
          },
        }}
      />
    </div>
  );
}
