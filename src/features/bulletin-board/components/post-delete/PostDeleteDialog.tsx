"use client";

import React, { useState } from "react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  toast,
} from "@umichkisa-ds/web";

import { deletePost } from "@/apis/posts/mutations";
import { isEveryKisaBoard } from "@/utils/formats/boardType";
import { BoardType } from "@/types/board";

type PostDeleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postid: number;
  boardType: BoardType;
  token?: string;
};

/**
 * Confirm-and-delete Dialog for a post.
 *
 * Mounted by PostButtonBar. Cancel closes the Dialog (returning the user to
 * the post). Confirm fires `deletePost` and hard-redirects to the parent
 * board on success; surfaces a toast on failure.
 */
export default function PostDeleteDialog({
  open,
  onOpenChange,
  postid,
  boardType,
  token,
}: PostDeleteDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    const res = await deletePost(postid, token);
    if (res) {
      // Hard reload to bypass SWR cache for the parent board listing.
      if (isEveryKisaBoard(boardType)) {
        window.location.href = `/everykisa/${boardType}`;
      } else {
        window.location.href = `/boards/${boardType}`;
      }
      return;
    }
    setIsDeleting(false);
    toast.error("게시글 삭제에 실패했습니다.");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="sm">
        <DialogTitle>게시글을 삭제하시겠습니까?</DialogTitle>
        <DialogDescription>
          삭제된 게시글은 복구할 수 없습니다.
        </DialogDescription>
        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            취소
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "삭제중..." : "삭제"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
