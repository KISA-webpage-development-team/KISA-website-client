"use client";

import { useState } from "react";
import { Form, useForm } from "@umichkisa-ds/form";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  LoadingSpinner,
  SelectContent,
  SelectItem,
  SelectTrigger,
  toast,
} from "@umichkisa-ds/web";

import { createBoardYear } from "@/apis/members/mutations";
import type { CustomAxiosError } from "@/lib/axios/types";
import type { AdminBoardYear } from "@/types/members";
import { availableStartYears, boardYearLabel } from "../utils/boardYear";

const NO_COPY = "none";

type NewBoardYearFormValues = {
  startYear: string;
  copyFrom: string;
};

type NewBoardYearDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Every board year, newest first. */
  years: AdminBoardYear[];
  token: string | undefined;
  /** Revalidates, then selects the created year. */
  onCreated: (startYear: number) => Promise<unknown>;
};

const startYearRules = { required: "시작 연도를 선택하세요." };

/**
 * Creates an unpublished board year, empty or copied from an existing one.
 */
export default function NewBoardYearDialog({
  open,
  onOpenChange,
  years,
  token,
  onCreated,
}: NewBoardYearDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="sm">
        <DialogTitle>새 연도 추가</DialogTitle>
        <DialogDescription>
          게시 전 상태로 만들어집니다. 임원을 등록한 뒤 게시하세요.
        </DialogDescription>
        {open ? (
          <NewBoardYearForm
            years={years}
            token={token}
            onCancel={() => onOpenChange(false)}
            onCreated={onCreated}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

type NewBoardYearFormProps = {
  years: AdminBoardYear[];
  token: string | undefined;
  onCancel: () => void;
  onCreated: (startYear: number) => Promise<unknown>;
};

function NewBoardYearForm({
  years,
  token,
  onCancel,
  onCreated,
}: NewBoardYearFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  const methods = useForm<NewBoardYearFormValues>({
    mode: "onTouched",
    defaultValues: { startYear: "", copyFrom: NO_COPY },
  });
  const startYears = availableStartYears(years.map((year) => year.startYear));

  const onSubmit = async (values: NewBoardYearFormValues) => {
    if (!token || isSaving || !values.startYear) return;
    setIsSaving(true);
    const startYear = Number(values.startYear);
    try {
      await createBoardYear(
        values.copyFrom === NO_COPY
          ? { startYear }
          : { startYear, copyFrom: Number(values.copyFrom) },
        token,
      );
    } catch (createError) {
      const isTaken = (createError as CustomAxiosError).response?.status === 409;
      toast.error(
        isTaken ? "이미 있는 연도입니다." : "연도 추가에 실패했습니다.",
      );
      setIsSaving(false);
      return;
    }
    toast.success("추가되었습니다.");
    await onCreated(startYear);
    onCancel();
  };

  return (
    <Form form={methods} onSubmit={onSubmit} className="flex flex-col gap-4">
      <Form.Select name="startYear" label="연도" rules={startYearRules}>
        <SelectTrigger placeholder="연도 선택" />
        <SelectContent>
          {startYears.map((year) => (
            <SelectItem key={year} value={String(year)}>
              {boardYearLabel(year)}
            </SelectItem>
          ))}
        </SelectContent>
      </Form.Select>

      <Form.Select
        name="copyFrom"
        label="복사할 연도 (선택)"
        description="선택한 연도의 임원을 그대로 복사해 시작합니다. 복사한 뒤 수정할 수 있습니다."
      >
        <SelectTrigger />
        <SelectContent>
          <SelectItem value={NO_COPY}>복사하지 않음</SelectItem>
          {years.map((year) => (
            <SelectItem key={year.startYear} value={String(year.startYear)}>
              {year.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Form.Select>

      <DialogFooter>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSaving}
        >
          취소
        </Button>
        <Form.Button
          type="submit"
          variant="primary"
          disableWhenInvalid
          disabled={isSaving}
          className="gap-2"
        >
          {isSaving ? <LoadingSpinner size="sm" /> : null}
          {isSaving ? "추가 중..." : "추가"}
        </Form.Button>
      </DialogFooter>
    </Form>
  );
}
