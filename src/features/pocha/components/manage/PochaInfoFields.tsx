"use client";

import { useEffect, useRef } from "react";
import { Form, useFormContext } from "@umichkisa-ds/form";

interface PochaInfoFieldsProps {}

function startOfDay(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

// All rule objects hoisted to module scope so every field has a stable
// `rules` reference across renders. DS `Form.*` fields wire `rules` into
// `useController({ rules })`; if the prop changes identity each render,
// useController re-registers the field and surfaces validation errors
// before `mode: "onTouched"` would otherwise gate them. Start fields
// happened to "work" only because `{ required: "<string>" }` is shallowly
// equal across renders; end fields had inline `validate` functions whose
// refs differed each render, breaking that equality. Hoisting fixes the
// asymmetry — every field is now stable.

const titleRules = { required: "포차 제목을 입력해주세요." };
const descriptionRules = { required: "포차 설명을 입력해주세요." };

const startDateRules = { required: "유효한 시작 날짜를 입력해주세요." };
const startTimeRules = { required: "유효한 시작 시간을 입력해주세요." };

const endDateRules = {
  required: "유효한 종료 날짜를 입력해주세요.",
  validate: (value: Date | undefined, values: Record<string, unknown>) => {
    const start = values.startDate as Date | undefined;
    if (!value || !start) return true;
    return startOfDay(value) < startOfDay(start)
      ? "종료 날짜는 시작 날짜보다 빠를 수 없습니다."
      : true;
  },
};

const endTimeRules = {
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
};

export default function PochaInfoFields(_props: PochaInfoFieldsProps) {
  const { watch, trigger } = useFormContext();
  const watchedStartDate = watch("startDate");
  const watchedStartTime = watch("startTime");

  // Re-validate end fields when start fields change (cross-field ordering).
  // Skip the mount run so untouched end fields don't flash "required".
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
      <Form.Input name="title" label="포차 이름" type="text" rules={titleRules} />
      <Form.Input
        name="description"
        label="포차 설명"
        type="text"
        rules={descriptionRules}
      />
      <Form.DatePicker
        name="startDate"
        label="시작 날짜"
        rules={startDateRules}
      />
      <Form.Input
        name="startTime"
        label="시작 시간"
        type="time"
        rules={startTimeRules}
      />
      <Form.DatePicker name="endDate" label="종료 날짜" rules={endDateRules} />
      <Form.Input
        name="endTime"
        label="종료 시간"
        type="time"
        rules={endTimeRules}
      />
    </div>
  );
}
