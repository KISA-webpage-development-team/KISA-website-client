"use client";

import { useEffect, useState } from "react";
import { Form, useForm } from "@umichkisa-ds/form";
import {
  Button,
  Checkbox,
  DialogFooter,
  FormItem,
  LoadingSpinner,
  RadioItem,
  toast,
} from "@umichkisa-ds/web";

import { createBoardEntry, updateBoardEntry } from "@/apis/members/mutations";
import type {
  AdminBoardEntry,
  BoardEntryFields,
  BoardTier,
} from "@/types/members";
import RoleTagInput from "./RoleTagInput";

const ROLES_ID = "board-entry-roles";
const IS_LEAD_ID = "board-entry-is-lead";

type BoardEntryFormValues = {
  name: string;
  major: string;
  classYear: string;
  roles: string[];
  isLead: boolean;
  tier: BoardTier;
};

type BoardEntryFormProps = {
  /** The edited entry; undefined adds a new one to `startYear`. */
  entry: AdminBoardEntry | undefined;
  startYear: number;
  roleSuggestions: string[];
  token: string | undefined;
  /** The cancel button. The dialog confirms when there are changes. */
  onCancel: () => void;
  onSaved: () => void;
  onDirtyChange: (isDirty: boolean) => void;
};

const requiredText = (message: string) => ({
  required: message,
  validate: (value: string) => value.trim() !== "" || message,
});

const nameRules = requiredText("이름을 입력하세요.");
const majorRules = requiredText("전공을 입력하세요.");
const classYearRules = {
  required: "졸업 연도를 입력하세요.",
  validate: (value: string) =>
    /^\d{4}$/.test(value.trim()) || "졸업 연도를 4자리 숫자로 입력하세요.",
};
const rolesRules = {
  validate: (value: string[]) =>
    value.length > 0 || "역할을 하나 이상 추가하세요.",
};

/** Add / edit form for one board entry, for the entry dialog. */
export default function BoardEntryForm({
  entry,
  startYear,
  roleSuggestions,
  token,
  onCancel,
  onSaved,
  onDirtyChange,
}: BoardEntryFormProps) {
  const isEdit = entry !== undefined;
  const [isSaving, setIsSaving] = useState(false);

  const methods = useForm<BoardEntryFormValues>({
    mode: "onTouched",
    defaultValues: {
      name: entry?.name ?? "",
      major: entry?.major ?? "",
      classYear: entry ? String(entry.classYear) : "",
      roles: entry?.roles ?? [],
      isLead: entry?.isLead ?? false,
      tier: entry?.tier ?? "member",
    },
  });
  const {
    register,
    setValue,
    trigger,
    watch,
    formState: { isDirty, errors },
  } = methods;

  // The roles field has no DOM input of its own.
  useEffect(() => {
    register("roles", rolesRules);
  }, [register]);

  useEffect(() => {
    onDirtyChange(isDirty);
  }, [isDirty, onDirtyChange]);

  const roles = watch("roles");
  const isLead = watch("isLead");

  const handleRolesChange = (next: string[]) =>
    setValue("roles", next, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

  const onSubmit = async (values: BoardEntryFormValues) => {
    if (!token || isSaving) return;
    setIsSaving(true);

    const fields: BoardEntryFields = {
      name: values.name.trim(),
      major: values.major.trim(),
      classYear: Number(values.classYear.trim()),
      roles: values.roles,
      isLead: values.isLead,
      tier: values.tier,
    };

    try {
      if (entry) {
        await updateBoardEntry(entry.boardMemberID, fields, token);
      } else {
        await createBoardEntry(startYear, fields, token);
      }
    } catch {
      toast.error("저장에 실패했습니다.");
      setIsSaving(false);
      return;
    }

    toast.success(isEdit ? "수정되었습니다." : "추가되었습니다.");
    onSaved();
  };

  return (
    <Form
      form={methods}
      onSubmit={onSubmit}
      className="flex min-h-0 flex-col gap-4"
    >
      <div className="flex max-h-[60vh] flex-col gap-4 overflow-y-auto">
        <Form.Input
          name="name"
          label="이름"
          placeholder="Gildong Hong"
          rules={nameRules}
        />
        <Form.Input
          name="major"
          label="전공"
          placeholder="Computer Science"
          rules={majorRules}
        />
        <Form.Input
          name="classYear"
          label="졸업 연도"
          type="number"
          inputMode="numeric"
          placeholder="2028"
          rules={classYearRules}
        />

        <FormItem
          htmlFor={ROLES_ID}
          label="역할"
          required
          description="추천 역할은 이 연도와 지난 연도에 쓰인 역할입니다. 새 역할도 입력할 수 있습니다."
          error={errors.roles?.message}
        >
          <RoleTagInput
            id={ROLES_ID}
            value={roles}
            onChange={handleRolesChange}
            onBlur={() => void trigger("roles")}
            suggestions={roleSuggestions}
            invalid={errors.roles !== undefined}
            disabled={isSaving}
          />
        </FormItem>

        <Form.Radio
          name="tier"
          label="구분"
          description="회장단은 임원진 소개 페이지 맨 위에 강조되어 표시됩니다."
          orientation="horizontal"
        >
          <RadioItem value="president" text="회장단" />
          <RadioItem value="member" text="임원" />
        </Form.Radio>

        <div className="flex flex-col gap-2">
          <Checkbox
            id={IS_LEAD_ID}
            text="팀장"
            checked={isLead}
            onChange={(event) =>
              setValue("isLead", event.target.checked, { shouldDirty: true })
            }
            aria-describedby={`${IS_LEAD_ID}-description`}
            disabled={isSaving}
          />
          <p
            id={`${IS_LEAD_ID}-description`}
            className="type-caption text-muted-foreground"
          >
            임원진 소개 페이지에서 역할 배지가 강조됩니다.
          </p>
        </div>
      </div>

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
          {isSaving ? "저장 중..." : isEdit ? "저장" : "추가"}
        </Form.Button>
      </DialogFooter>
    </Form>
  );
}
