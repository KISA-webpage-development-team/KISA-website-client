"use client";

import React, { useEffect, useState } from "react";
import { useForm, Form } from "@umichkisa-ds/form";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  toast,
} from "@umichkisa-ds/web";
import { useSession } from "next-auth/react";

import PochaInfoFields from "./PochaInfoFields";
import PochaMenuItemForm from "./PochaMenuItemForm";
import PochaMenuItemList from "./PochaMenuItemList";
import { usePochaManage } from "../../contexts/PochaManageContext";
import { UserSession } from "@/lib/next-auth/types";
import { combineDateAndTime, separateDateAndTime } from "@/utils/formats/date";
import { createPocha, updatePocha } from "@/apis/pocha/mutations";
import { PochaInfo, MenuItemRaw } from "@/types/pocha";

type MenuFormState =
  | null
  | { mode: "create"; presetImmediatePrep: boolean }
  | { mode: "update"; initialData: MenuItemRaw };

interface PochaFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "update";
  existingPochaInfo?: PochaInfo;
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

export default function PochaFormDialog({
  open,
  onOpenChange,
  mode,
  existingPochaInfo,
  onSubmitSuccess,
}: PochaFormDialogProps) {
  const { data: session } = useSession() as {
    data: UserSession | undefined;
    status: string;
  };

  const email = session?.user?.email;
  const token = session?.token;

  const { menus } = usePochaManage();

  const [activeTab, setActiveTab] = useState<"info" | "menu">("info");
  const [menuFormState, setMenuFormState] = useState<MenuFormState>(null);

  const isMenuForm = !!menuFormState;
  const dialogTitle = isMenuForm
    ? menuFormState.mode === "create"
      ? "메뉴 추가하기"
      : "메뉴 수정하기"
    : mode === "create"
      ? "포차 생성하기"
      : "포차 수정하기";

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
  // manage a synthetic error on `endDate` (surfaced in the dialog footer).
  // PochaInfoFields registers these names via Form.* compounds (lane 2.10),
  // so we don't re-register here — we just observe and decorate.
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

      // Page owns post-submit refresh: pocha info refetch + SWR mutates for
      // /pocha/menu/* and /pocha/previous/*. We just await it so the dialog
      // doesn't close until the summary card has the new data.
      await onSubmitSuccess?.();

      // Close the dialog after refetches complete.
      onOpenChange(false);

      // Reset form on create so the next open starts clean.
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

  const hasFieldErrors = Object.keys(errors).length > 0;
  const submitDisabled =
    menus.length === 0 || !isValid || isSubmitting || hasFieldErrors;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="lg">
        <DialogTitle>{dialogTitle}</DialogTitle>

        {isMenuForm ? (
          <PochaMenuItemForm
            mode={menuFormState.mode}
            initialData={
              menuFormState.mode === "update"
                ? menuFormState.initialData
                : undefined
            }
            presetImmediatePrep={
              menuFormState.mode === "create"
                ? menuFormState.presetImmediatePrep
                : undefined
            }
            closeItemForm={() => setMenuFormState(null)}
          />
        ) : (
          <Form
            form={methods}
            onSubmit={(values) => {
              if (errors.endDate || errors.endTime) {
                setActiveTab("info");
                return;
              }
              if (menus.length === 0) {
                setActiveTab("menu");
                return;
              }
              return onSubmit(values);
            }}
            className="flex flex-col gap-4"
          >
            <Tabs
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as "info" | "menu")}
            >
              <TabsList>
                <TabsTrigger value="info">기본 정보</TabsTrigger>
                <TabsTrigger value="menu">메뉴 ({menus.length})</TabsTrigger>
              </TabsList>
              <TabsContent
                value="info"
                className="max-h-[60vh] overflow-y-auto"
              >
                <PochaInfoFields />
              </TabsContent>
              <TabsContent
                value="menu"
                className="max-h-[60vh] overflow-y-auto"
              >
                <PochaMenuItemList
                  onAdd={(presetImmediatePrep) =>
                    setMenuFormState({ mode: "create", presetImmediatePrep })
                  }
                  onEdit={(menu) =>
                    setMenuFormState({ mode: "update", initialData: menu })
                  }
                />
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button
                type="button"
                variant="secondary"
                onClick={() => onOpenChange(false)}
              >
                취소
              </Button>
              <Button type="submit" disabled={submitDisabled}>
                {mode === "create" ? "포차 생성하기" : "포차 수정하기"}
              </Button>
            </DialogFooter>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
