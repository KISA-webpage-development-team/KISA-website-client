import { useState } from "react";
import { format, startOfDay } from "date-fns";
import {
  Button,
  DatePicker,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  Label,
  toast,
} from "@umichkisa-ds/web";

import { restoreCarouselItem } from "@/apis/carousel/mutations";
import type { AdminCarouselItem } from "@/types/carousel";

type CarouselRestoreDialogProps = {
  carouselItem: AdminCarouselItem | null;
  token: string | undefined;
  onOpenChange: (open: boolean) => void;
  onDone: () => Promise<unknown>;
};

const formatEndDate = (date: Date) => format(date, "yyyy.MM.dd");

/**
 * Restore an archived item to live with a new end date (today or later) or
 * none. The backend places it by the end-date rule.
 */
export default function CarouselRestoreDialog({
  carouselItem,
  token,
  onOpenChange,
  onDone,
}: CarouselRestoreDialogProps) {
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isPending, setIsPending] = useState(false);
  const isOpen = carouselItem !== null;
  const hasEndDate = endDate !== undefined;

  const handleOpenChange = (open: boolean) => {
    if (!open) setEndDate(undefined);
    onOpenChange(open);
  };

  const handleConfirm = async () => {
    if (!carouselItem || !token || isPending) return;
    setIsPending(true);
    try {
      await restoreCarouselItem(
        carouselItem.carouselItemID,
        endDate ? format(endDate, "yyyy-MM-dd") : null,
        token,
      );
      toast.success("복원되었습니다.");
      handleOpenChange(false);
    } catch {
      toast.error("복원에 실패했습니다.");
    }
    await onDone();
    setIsPending(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent size="sm">
        <DialogTitle>이 항목을 복원하시겠습니까?</DialogTitle>
        <DialogDescription>
          {carouselItem ? `"${carouselItem.title}" ` : ""}
          항목이 다시 홈페이지 메인 배너에 게시됩니다. 새 종료일을 고르거나 비워
          두세요.
        </DialogDescription>
        <div
          role="group"
          aria-labelledby="carousel-restore-end-date-label"
          className="flex flex-col gap-2"
        >
          <Label
            id="carousel-restore-end-date-label"
            htmlFor="carousel-restore-end-date"
          >
            새 종료일 (선택)
          </Label>
          <DatePicker
            value={endDate}
            onChange={setEndDate}
            formatDate={formatEndDate}
            placeholder="종료일 없음"
            disabled={isPending}
            calendarProps={{ disabled: { before: startOfDay(new Date()) } }}
          />
          <div className="flex items-center justify-between gap-2">
            <p className="type-caption text-muted-foreground">
              비워 두면 종료일 없이 게시됩니다.
            </p>
            {hasEndDate ? (
              <Button
                variant="tertiary"
                size="sm"
                onClick={() => setEndDate(undefined)}
                disabled={isPending}
              >
                종료일 지우기
              </Button>
            ) : null}
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => handleOpenChange(false)}
            disabled={isPending}
          >
            취소
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirm}
            disabled={isPending}
          >
            {isPending ? "복원 중..." : "복원"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
