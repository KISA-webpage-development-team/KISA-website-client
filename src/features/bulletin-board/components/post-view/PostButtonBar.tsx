// 1. List Button (always)
// 2. GoBlue (everykisa boards only)
// 3. Edit Button (post author only)
// 4. Delete Button (post author OR admin) — opens confirm Dialog

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@umichkisa-ds/web";

import GoBlueButton from "@/features/bulletin-board/components/shared/GoBlueButton";
import PostDeleteDialog from "@/features/bulletin-board/components/post-delete/PostDeleteDialog";

import { isEveryKisaBoard } from "@/utils/formats/boardType";

import { UserSession } from "@/lib/next-auth/types";
import { BoardType } from "@/types/board";

type PostButtonBarProps = {
  email: string; // post author's email
  session?: UserSession | null;
  isAdmin: boolean;
  type: BoardType;
  postid: number;
  /**
   * When true, the delete confirmation Dialog mounts open on first render.
   * Used by the /posts/delete/[board]/[postid] route to surface the
   * confirm overlay over the post page on inbound link.
   */
  initialDeleteOpen?: boolean;
};

export default function PostButtonBar({
  email,
  session = null,
  isAdmin,
  type,
  postid,
  initialDeleteOpen = false,
}: PostButtonBarProps) {
  const router = useRouter();

  const isEveryKisa = isEveryKisaBoard(type);
  const isAuthor = session?.user?.email === email;
  const canEdit = isAuthor;
  const canDelete = isAuthor || isAdmin;

  const [deleteOpen, setDeleteOpen] = useState(initialDeleteOpen);

  const onClickBackToList = () => {
    // Hard reload preserved intentionally — SWR cache wedge prevents
    // router.push from refreshing the list correctly.
    if (isEveryKisaBoard(type)) {
      window.location.href = `/everykisa/${type}`;
    } else {
      window.location.href = `/boards/${type}`;
    }
  };

  const onClickPostUpdate = () => {
    router.push(`/posts/update/${postid}?board_type=${type}`);
  };

  return (
    <div className="flex w-full items-center justify-between py-3">
      <Button
        variant="secondary"
        size="sm"
        onClick={onClickBackToList}
      >
        목록
      </Button>

      <div className="flex items-center gap-2">
        {isEveryKisa && (
          <GoBlueButton targetType="post" id={postid} session={session} />
        )}

        {canEdit && (
          <Button
            variant="secondary"
            size="sm"
            onClick={onClickPostUpdate}
            aria-label="Edit post"
          >
            수정
          </Button>
        )}
        {canDelete && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setDeleteOpen(true)}
            aria-label="Delete post"
          >
            삭제
          </Button>
        )}
      </div>

      <PostDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        postid={postid}
        boardType={type}
        token={session?.token}
      />
    </div>
  );
}
