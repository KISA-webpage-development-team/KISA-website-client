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
import {
  useCommentsContext,
  useCommentsMutations,
} from "@/features/bulletin-board/contexts/CommentsContext";

import { Comment } from "@/types/comment";

type CommentItemProps = {
  comment: Comment;
  commentAuthorMap: Map<string, number>;
};

export default function CommentItem({
  comment,
  commentAuthorMap,
}: CommentItemProps) {
  const { session, isAdmin, isEveryKisa, postAuthorEmail } =
    useCommentsContext();
  const { refreshComments, onCommentDeleted } = useCommentsMutations();
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
      onCommentDeleted();
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

        <div className={`flex w-full flex-col`}>
          {/* Row 1: identity + meta + actions (single row, icon-only actions) */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 flex-wrap items-center gap-2 type-body-sm text-muted-foreground">
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

            <div className="flex shrink-0 items-center gap-1 md:gap-2 lg:gap-3">
              {isEveryKisa && !secret && !isTemp && (
                <GoBlueButton
                  targetType="comment"
                  id={commentid}
                  session={session}
                />
              )}
              {canEdit && !isTemp && (
                <button
                  type="button"
                  onClick={() => setOpenEditEditor((o) => !o)}
                  aria-label={openEditEditor ? "수정 취소" : "수정"}
                  className="inline-flex p-1 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Icon name={openEditEditor ? "x" : "pencil"} size="sm" />
                </button>
              )}
              {canDelete && !isTemp && (
                <button
                  type="button"
                  onClick={() => setDeleteOpen(true)}
                  aria-label="삭제"
                  className="inline-flex p-1 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-error"
                >
                  <Icon name="trash-2" size="sm" />
                </button>
              )}
              {canReply && !isTemp && (
                <button
                  type="button"
                  onClick={handleOpenReply}
                  aria-label={openReplyEditor ? "답글 닫기" : "답글"}
                  className="inline-flex p-1 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Icon name={openReplyEditor ? "x" : "reply"} size="sm" />
                </button>
              )}
            </div>
          </div>

          {/* Row 2: body */}
          <div className={`type-body-sm text-foreground ${ownStripeClass}`}>
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
              setOpen={setOpenReplyEditor}
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
              commentAuthorMap={commentAuthorMap}
            />
          ))}
        </div>
      )}
    </div>
  );
}
