import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  toast,
} from "@umichkisa-ds/web";

import { deleteBoardEntry } from "@/apis/members/mutations";
import type { AdminBoardEntry } from "@/types/members";

type BoardEntryDeleteDialogProps = {
  entry: AdminBoardEntry | null;
  token: string | undefined;
  onOpenChange: (open: boolean) => void;
  onDone: () => Promise<unknown>;
};

/** Confirms deleting one entry, then hands revalidation back via `onDone`. */
export default function BoardEntryDeleteDialog({
  entry,
  token,
  onOpenChange,
  onDone,
}: BoardEntryDeleteDialogProps) {
  const [isPending, setIsPending] = useState(false);

  const handleConfirm = async () => {
    if (!entry || !token || isPending) return;
    setIsPending(true);
    try {
      await deleteBoardEntry(entry.boardMemberID, token);
      toast.success("삭제되었습니다.");
      onOpenChange(false);
    } catch {
      toast.error("삭제에 실패했습니다.");
    }
    await onDone();
    setIsPending(false);
  };

  return (
    <Dialog open={entry !== null} onOpenChange={onOpenChange}>
      <DialogContent size="sm">
        <DialogTitle>이 멤버를 삭제하시겠습니까?</DialogTitle>
        <DialogDescription>
          {entry ? `"${entry.name}" ` : ""}
          항목이 영구적으로 삭제되며 복구할 수 없습니다.
        </DialogDescription>
        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            취소
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isPending}
          >
            {isPending ? "삭제 중..." : "삭제"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
