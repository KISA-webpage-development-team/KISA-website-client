import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  Icon,
  toast,
} from "@umichkisa-ds/web";

import CommentEditor from "./CommentEditor";
import GoBlueButton from "@/features/bulletin-board/components/shared/GoBlueButton";

import { deleteComment } from "@/apis/comments/mutations";
import { formatRelativeTime } from "@/utils/formats/date";
import { useCommentsContext } from "@/features/bulletin-board/contexts/CommentsContext";

import { Comment } from "@/types/comment";

type CommentItemProps = {
  comment: Comment;
  refreshComments: () => void;
  commentAuthorMap: Map<string, number>;
  onCommentAdded?: () => void;
  onCommentDeleted?: () => void;
  onOptimisticAdd?: (temp: Comment) => void;
  onOptimisticReplace?: (tempId: number, server: Comment | null) => void;
  onOptimisticRollback?: (tempId: number) => void;
};

export default function CommentItem({
  comment,
  refreshComments,
  commentAuthorMap,
  onCommentAdded,
  onCommentDeleted,
  onOptimisticAdd,
  onOptimisticReplace,
  onOptimisticRollback,
}: CommentItemProps) {
  const { session, isAdmin, isEveryKisa, postAuthorEmail } =
    useCommentsContext();
  const pathname = usePathname();

  const {
    commentid,
    email,
    fullname,
    created,
    text,
    childComments,
    isCommentOfComment,
    anonymous,
    secret,
  } = comment;

  // Local UI state
  const [openReplyEditor, setOpenReplyEditor] = useState(false);
  const [openEditEditor, setOpenEditEditor] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const userEmail = session?.user?.email;
  const isCommentAuthor = userEmail === email;
  const isPostAuthor = postAuthorEmail === email;
  const viewerIsPostAuthor = userEmail === postAuthorEmail;

  // Capability gates -----------------------------------------------------
  const canEdit = isCommentAuthor;
  // New: admin can delete any comment in addition to its author.
  const canDelete = isCommentAuthor || isAdmin;

  // Reply gate, expressed positively. On a secret comment, only the secret
  // author or the post author may reply; otherwise anyone signed-in may reply.
  const canReply = !secret || isCommentAuthor || viewerIsPostAuthor;

  // Visibility of the body text on a secret comment.
  const canSeeText = isCommentAuthor || !secret || viewerIsPostAuthor;

  // Lock icon shown only to the post author and the comment author.
  const showSecretIcon = secret && (viewerIsPostAuthor || isCommentAuthor);

  // Optimistic-temp comment guard: temp ids are negative.
  const isTemp = commentid < 0;

  // Handlers -------------------------------------------------------------
  const handleOpenReply = () => {
    if (!session) {
      toast.error("로그인이 필요한 기능입니다.", {
        action: {
          label: "로그인",
          onClick: () => {
            window.location.href = `/signin?callbackUrl=${encodeURIComponent(
              pathname ?? "/",
            )}`;
          },
        },
      });
      return;
    }
    setOpenReplyEditor((open) => !open);
  };

  const handleConfirmDelete = async () => {
    if (isDeleteLoading) return;
    setIsDeleteLoading(true);
    const res = await deleteComment(commentid, session?.token);
    if (res?.success) {
      refreshComments();
      onCommentDeleted?.();
      setDeleteOpen(false);
      setIsDeleteLoading(false);
    } else {
      setIsDeleteLoading(false);
      toast.error("댓글 삭제에 실패했습니다.");
    }
  };

  const renderCommentAuthor = () => {
    if (isCommentAuthor && anonymous) {
      return (
        <Link href={`/users/${email}`} className="hover:underline">
          <span className="type-body-sm text-foreground">{`${fullname}(익명)`}</span>
        </Link>
      );
    }
    if (isCommentAuthor || !anonymous) {
      return (
        <Link href={`/users/${email}`} className="hover:underline">
          <span className="type-body-sm text-foreground">{fullname}</span>
        </Link>
      );
    }
    if (isPostAuthor) {
      return (
        <span className="type-body-sm text-foreground">{`익명${commentAuthorMap.get(
          email,
        )}(글쓴이)`}</span>
      );
    }
    return (
      <span className="type-body-sm text-foreground">{`익명${commentAuthorMap.get(
        email,
      )}`}</span>
    );
  };

  // Own-comment affordance: subtle navy left-border stripe.
  const ownStripeClass = isCommentAuthor ? "!text-brand-primary-mid" : "";

  return (
    <div className="flex flex-col">
      <div className="flex">
        {isCommentOfComment && (
          <span className="text-muted-foreground">
            <Icon name="reply" size="sm" className="mr-2 mt-1 -scale-x-100" />
          </span>
        )}

        <div className={`flex w-full flex-col ${ownStripeClass}`}>
          {/* Row 1: identity + meta + actions */}
          <div className="flex items-start justify-between gap-1">
            <div className="flex flex-wrap items-center gap-2 type-body-sm text-muted-foreground">
              {canSeeText ? (
                <>{renderCommentAuthor()}</>
              ) : (
                <span className="inline-flex items-center gap-1 type-label text-muted-foreground">
                  <Icon name="lock" size="xs" />
                  비밀 댓글
                </span>
              )}
              <span aria-hidden="true">·</span>
              <span>{formatRelativeTime(created)}</span>
              {showSecretIcon && (
                <Icon name="lock" size="xs" label="비밀 댓글" />
              )}
            </div>

            <div className="flex items-center">
              {isEveryKisa && !secret && !isTemp && (
                <GoBlueButton
                  targetType="comment"
                  id={commentid}
                  session={session}
                />
              )}
              {canEdit && !isTemp && (
                <Button
                  variant="tertiary"
                  size="sm"
                  onClick={() => setOpenEditEditor((o) => !o)}
                  aria-label={openEditEditor ? "Cancel edit" : "Edit comment"}
                >
                  {openEditEditor ? "취소" : "수정"}
                </Button>
              )}
              {canDelete && !isTemp && (
                <Button
                  variant="tertiary"
                  size="sm"
                  onClick={() => setDeleteOpen(true)}
                  aria-label="Delete comment"
                >
                  삭제
                </Button>
              )}
              {canReply && !isTemp && (
                <Button
                  variant="tertiary"
                  size="sm"
                  onClick={handleOpenReply}
                  aria-label={openReplyEditor ? "Close reply editor" : "Reply"}
                >
                  {openReplyEditor ? "닫기" : "답글"}
                </Button>
              )}
            </div>
          </div>

          {/* Row 2: body */}
          <div className="type-body-sm text-foreground">
            {canSeeText ? (
              <>
                {text}
                {isTemp && (
                  <span className="ml-2 type-caption text-muted-foreground">
                    전송 중…
                  </span>
                )}
              </>
            ) : (
              <span className="text-muted-foreground">비밀 댓글입니다.</span>
            )}
          </div>
        </div>
      </div>

      {/* Inline edit composer */}
      {openEditEditor && session && (
        <div className="mt-2 mb-3 pl-3">
          <CommentEditor
            mode="update"
            commentid={commentid}
            curCommentId={commentid}
            initialText={text}
            secret={secret}
            refreshComments={refreshComments}
            setOpen={setOpenEditEditor}
          />
        </div>
      )}

      {/* Inline reply composer */}
      {openReplyEditor && session && (
        <div className="mt-2 mb-3 ml-6 flex items-start gap-2">
          <span className="text-muted-foreground">
            <Icon name="reply" size="sm" className="mt-2 -scale-x-100" />
          </span>
          <div className="flex-1">
            <CommentEditor
              mode="reply"
              commentid={commentid}
              curCommentId={commentid}
              secret={secret}
              refreshComments={refreshComments}
              setOpen={setOpenReplyEditor}
              onCommentAdded={onCommentAdded}
              onOptimisticAdd={onOptimisticAdd}
              onOptimisticReplace={onOptimisticReplace}
              onOptimisticRollback={onOptimisticRollback}
            />
          </div>
        </div>
      )}

      {/* Delete confirm */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent size="sm">
          <DialogTitle>댓글을 삭제하시겠습니까?</DialogTitle>
          <DialogDescription>
            삭제된 댓글은 복구할 수 없습니다.
          </DialogDescription>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setDeleteOpen(false)}
              disabled={isDeleteLoading}
            >
              취소
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isDeleteLoading}
            >
              {isDeleteLoading ? "삭제중..." : "삭제"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Replies (single-level nesting) */}
      {childComments && childComments.length > 0 && (
        <div className="ml-4 mt-2 flex flex-col gap-2">
          {childComments.map((subComment) => (
            <CommentItem
              key={`subComment-${subComment.commentid}`}
              comment={subComment}
              refreshComments={refreshComments}
              commentAuthorMap={commentAuthorMap}
              onCommentAdded={onCommentAdded}
              onCommentDeleted={onCommentDeleted}
              onOptimisticAdd={onOptimisticAdd}
              onOptimisticReplace={onOptimisticReplace}
              onOptimisticRollback={onOptimisticRollback}
            />
          ))}
        </div>
      )}
    </div>
  );
}
