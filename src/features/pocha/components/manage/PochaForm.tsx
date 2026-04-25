"use client";
import React, { useEffect } from "react";
import { mutate } from "swr";
import { useForm, Form } from "@umichkisa-ds/form";
import { Alert, Button, Divider, toast } from "@umichkisa-ds/web";
import PochaInfoFields from "./PochaInfoFields";
import PochaMenuFields from "./PochaMenuFields";
import { usePochaManage } from "../../contexts/PochaManageContext";
import { useSession } from "next-auth/react";
import { UserSession } from "@/lib/next-auth/types";
import { combineDateAndTime, separateDateAndTime } from "@/utils/formats/date";
import { createPocha, updatePocha } from "@/apis/pocha/mutations";
import { PochaInfo } from "@/types/pocha";

interface PochaFormProps {
  mode?: "create" | "update";
  existingPochaInfo?: PochaInfo;
  /**
   * Called after a successful create/update. The page wires this to
   * `usePocha`'s `refetch` so the active-pocha summary re-renders without a
   * full reload.
   */
  onSubmitSuccess?: () => void;
}

interface PochaFormValues {
  title: string;
  description: string;
  // DS Form.DatePicker stores Date | undefined in form state.
  // We convert to/from "YYYY-MM-DD" strings only at the API boundary.
  startDate: Date | undefined;
  startTime: string;
  endDate: Date | undefined;
  endTime: string;
}

function formatDateToYmd(date: Date | undefined): string {
  if (!date) return "";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseYmdToDate(ymd: string | null | undefined): Date | undefined {
  if (!ymd) return undefined;
  const [y, m, d] = ymd.split("-").map(Number);
  if (!y || !m || !d) return undefined;
  return new Date(y, m - 1, d);
}

export default function PochaForm({
  mode = "create",
  existingPochaInfo,
  onSubmitSuccess,
}: PochaFormProps) {
  const { data: session } = useSession() as {
    data: UserSession | undefined;
    status: string;
  };

  const email = session?.user?.email;
  const token = session?.token;

  const { menus } = usePochaManage();

  const { date: existingStartDate, time: existingStartTime } =
    separateDateAndTime(existingPochaInfo?.startDate);
  const { date: existingEndDate, time: existingEndTime } = separateDateAndTime(
    existingPochaInfo?.endDate
  );

  const methods = useForm<PochaFormValues>({
    mode: "onTouched",
    defaultValues: {
      title: existingPochaInfo?.title ?? "",
      description: existingPochaInfo?.description ?? "",
      startDate: parseYmdToDate(existingStartDate),
      startTime: existingStartTime ?? "",
      endDate: parseYmdToDate(existingEndDate),
      endTime: existingEndTime ?? "",
    },
  });

  const {
    formState: { isValid, isSubmitting, errors },
    reset,
    watch,
    setError,
    clearErrors,
  } = methods;

  // Cross-field validation: end > start. We watch the four datetime fields and
  // manage a synthetic error on `endDate` (which is also surfaced inline below
  // the submit button via formState.errors.endDate). PochaInfoFields registers
  // these names via Form.* compounds (lane 2.10), so we don't re-register here
  // — we just observe and decorate.
  const watchedStartDate = watch("startDate");
  const watchedStartTime = watch("startTime");
  const watchedEndDate = watch("endDate");
  const watchedEndTime = watch("endTime");

  useEffect(() => {
    if (
      !watchedStartDate ||
      !watchedStartTime ||
      !watchedEndDate ||
      !watchedEndTime
    ) {
      // Don't surface cross-field error until all four fields have values;
      // field-level required errors handle the empty case.
      if (errors.endDate?.type === "crossField") {
        clearErrors("endDate");
      }
      return;
    }

    const start = combineDateAndTime(
      formatDateToYmd(watchedStartDate),
      watchedStartTime
    );
    const end = combineDateAndTime(
      formatDateToYmd(watchedEndDate),
      watchedEndTime
    );

    if (start && end && new Date(end) <= new Date(start)) {
      setError("endDate", {
        type: "crossField",
        message: "종료 시간은 시작 시간보다 늦어야 합니다.",
      });
    } else if (errors.endDate?.type === "crossField") {
      clearErrors("endDate");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedStartDate, watchedStartTime, watchedEndDate, watchedEndTime]);

  const onSubmit = async (values: PochaFormValues) => {
    const newStartDateTime = combineDateAndTime(
      formatDateToYmd(values.startDate),
      values.startTime
    );
    const newEndDateTime = combineDateAndTime(
      formatDateToYmd(values.endDate),
      values.endTime
    );

    const input = {
      email,
      startDate: newStartDateTime,
      endDate: newEndDateTime,
      title: values.title,
      description: values.description,
      menus,
    };

    try {
      if (mode === "create") {
        await createPocha(input, token);
        toast.success(`${values.title} 포차 생성이 완료되었습니다.`);
      } else {
        await updatePocha(existingPochaInfo.pochaID, input, token);
        toast.success(`${values.title} 포차 수정이 완료되었습니다.`);
      }

      // Refresh today's pocha summary via the page-supplied callback
      // (usePocha is not SWR — it exposes a refetch instead).
      onSubmitSuccess?.();
      // Refresh any previous-pocha lists (date-keyed SWR consumers).
      await mutate(
        (key) =>
          typeof key === "string" && key.startsWith("/pocha/previous/")
      );
      // For update mode, refresh that pocha's menu cache (SWR).
      if (mode === "update" && existingPochaInfo?.pochaID) {
        await mutate([`/pocha/menu/${existingPochaInfo.pochaID}/`, token]);
      }

      // Reset form on create so the next pocha starts clean
      if (mode === "create") {
        reset();
      }
    } catch (error) {
      console.error("Error creating pocha:", error);
      const message =
        error instanceof Error
          ? error.message
          : "포차 생성/수정에 실패했습니다.";
      toast.error(message);
    }
  };

  const crossFieldError =
    errors.endDate?.message ?? errors.endTime?.message;

  const submitDisabled = menus.length === 0 || !isValid || isSubmitting;

  return (
    <Form form={methods} onSubmit={onSubmit} className="flex flex-col gap-6">
      <PochaInfoFields />

      <Divider />

      <PochaMenuFields />

      <Divider />

      <Button
        type="submit"
        className="w-full"
        disabled={submitDisabled}
      >
        {mode === "create" ? "포차 생성하기" : "포차 수정하기"}
      </Button>

      {crossFieldError && (
        <Alert variant="error">{crossFieldError}</Alert>
      )}
    </Form>
  );
}
