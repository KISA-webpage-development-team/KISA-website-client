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

import { deleteBoardYear, unpublishBoardYear } from "@/apis/members/mutations";
import type { AdminBoardYear } from "@/types/members";

type ConfirmKind = "unpublish" | "delete";

type BoardYearConfirmDialogProps = {
  kind: ConfirmKind;
  boardYear: AdminBoardYear | null;
  /** True when this is the only published year, so the public page empties. */
  isLastPublishedYear: boolean;
  token: string | undefined;
  onOpenChange: (open: boolean) => void;
  onDone: () => Promise<unknown>;
};

const COPY: Record<
  ConfirmKind,
  {
    title: string;
    description: (boardYear: AdminBoardYear) => string;
    confirm: string;
    pending: string;
    success: string;
    failure: string;
  }
> = {
  unpublish: {
    title: "이 연도의 게시를 취소하시겠습니까?",
    description: (boardYear) =>
      `"${boardYear.label}" 임원진이 임원진 소개 페이지에서 내려갑니다. 언제든 다시 게시할 수 있습니다.`,
    confirm: "게시 취소",
    pending: "게시 취소 중...",
    success: "게시가 취소되었습니다.",
    failure: "게시 취소에 실패했습니다.",
  },
  delete: {
    title: "이 연도를 삭제하시겠습니까?",
    description: (boardYear) =>
      `"${boardYear.label}" 연도와 등록된 임원 ${boardYear.entries.length}명이 함께 영구적으로 삭제되며 복구할 수 없습니다.`,
    confirm: "삭제",
    pending: "삭제 중...",
    success: "삭제되었습니다.",
    failure: "삭제에 실패했습니다.",
  },
};

/**
 * Confirmation for Unpublish and Delete on a board year. Runs the mutation,
 * toasts the result and hands revalidation back to the page through `onDone`.
 */
export default function BoardYearConfirmDialog({
  kind,
  boardYear,
  isLastPublishedYear,
  token,
  onOpenChange,
  onDone,
}: BoardYearConfirmDialogProps) {
  const [isPending, setIsPending] = useState(false);
  const copy = COPY[kind];
  const showsEmptyPageWarning = kind === "unpublish" && isLastPublishedYear;

  const handleConfirm = async () => {
    if (!boardYear || !token || isPending) return;
    setIsPending(true);
    try {
      if (kind === "unpublish") {
        await unpublishBoardYear(boardYear.startYear, token);
      } else {
        await deleteBoardYear(boardYear.startYear, token);
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
    <Dialog open={boardYear !== null} onOpenChange={onOpenChange}>
      <DialogContent size="sm">
        <DialogTitle>{copy.title}</DialogTitle>
        <DialogDescription>
          {boardYear ? copy.description(boardYear) : ""}
        </DialogDescription>
        {showsEmptyPageWarning ? (
          <Alert variant="warning" title="게시 중인 마지막 연도입니다.">
            게시를 취소하면 임원진 소개 페이지에 임원진이 표시되지 않습니다.
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
            variant={kind === "delete" ? "destructive" : "primary"}
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
