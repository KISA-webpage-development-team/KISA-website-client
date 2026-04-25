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
}

interface PochaFormValues {
  title: string;
  description: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

export default function PochaForm({
  mode = "create",
  existingPochaInfo,
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
      startDate: existingStartDate ?? "",
      startTime: existingStartTime ?? "",
      endDate: existingEndDate ?? "",
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

    const start = combineDateAndTime(watchedStartDate, watchedStartTime);
    const end = combineDateAndTime(watchedEndDate, watchedEndTime);

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
      values.startDate,
      values.startTime
    );
    const newEndDateTime = combineDateAndTime(values.endDate, values.endTime);

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

      // Refresh today's pocha summary
      await mutate("/pocha/status-info/today");
      // Refresh any previous-pocha lists (date-keyed)
      await mutate(
        (key) =>
          typeof key === "string" && key.startsWith("/pocha/previous/")
      );
      // For update mode, refresh that pocha's menu cache
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
