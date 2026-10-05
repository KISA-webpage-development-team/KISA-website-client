import { useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  toast,
} from "@umichkisa-ds/web";

import {
  archiveCarouselItem,
  deleteCarouselItem,
} from "@/apis/carousel/mutations";
import type { AdminCarouselItem } from "@/types/carousel";

type ConfirmKind = "archive" | "remove";

type CarouselConfirmDialogProps = {
  kind: ConfirmKind;
  carouselItem: AdminCarouselItem | null;
  /** True when this item is the only live one, so the carousel would hide. */
  isLastLiveItem: boolean;
  token: string | undefined;
  onOpenChange: (open: boolean) => void;
  onDone: () => Promise<unknown>;
};

const COPY: Record<
  ConfirmKind,
  {
    title: string;
    description: string;
    confirm: string;
    pending: string;
    success: string;
    failure: string;
  }
> = {
  archive: {
    title: "이 항목을 보관하시겠습니까?",
    description:
      "홈페이지 메인 배너에서 내려가고 보관함으로 이동합니다. 보관함에서 다시 복원할 수 있습니다.",
    confirm: "보관",
    pending: "보관 중...",
    success: "보관되었습니다.",
    failure: "보관에 실패했습니다.",
  },
  remove: {
    title: "이 항목을 삭제하시겠습니까?",
    description: "항목과 이미지가 영구적으로 삭제되며 복구할 수 없습니다.",
    confirm: "삭제",
    pending: "삭제 중...",
    success: "삭제되었습니다.",
    failure: "삭제에 실패했습니다.",
  },
};

/**
 * Confirmation for Archive and Remove. Runs the mutation, toasts the result
 * and hands revalidation back to the page through `onDone`.
 */
export default function CarouselConfirmDialog({
  kind,
  carouselItem,
  isLastLiveItem,
  token,
  onOpenChange,
  onDone,
}: CarouselConfirmDialogProps) {
  const [isPending, setIsPending] = useState(false);
  const copy = COPY[kind];
  const isOpen = carouselItem !== null;
  const showsHideWarning = isLastLiveItem && carouselItem?.status === "live";

  const handleConfirm = async () => {
    if (!carouselItem || !token || isPending) return;
    setIsPending(true);
    try {
      if (kind === "archive") {
        await archiveCarouselItem(carouselItem.carouselItemID, token);
      } else {
        await deleteCarouselItem(carouselItem.carouselItemID, token);
      }
      toast.success(copy.success);
      onOpenChange(false);
    } catch {
      toast.error(copy.failure);
    }
    await onDone();
    setIsPending(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent size="sm">
        <DialogTitle>{copy.title}</DialogTitle>
        <DialogDescription>
          {carouselItem ? `"${carouselItem.title}" ` : ""}
          {copy.description}
        </DialogDescription>
        {showsHideWarning ? (
          <Alert variant="warning" title="게시 중인 마지막 항목입니다.">
            이 항목을 {copy.confirm}하면 홈페이지 메인 배너가 숨겨집니다.
          </Alert>
        ) : null}
        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            취소
          </Button>
          <Button
            variant={kind === "remove" ? "destructive" : "primary"}
            onClick={handleConfirm}
            disabled={isPending}
          >
            {isPending ? copy.pending : copy.confirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
