import React, { ChangeEvent, useState } from "react";

import {
  Button,
  Checkbox,
  RadioGroup,
  RadioItem,
  Textarea,
  toast,
} from "@umichkisa-ds/web";

import { createComment, updateComment } from "@/apis/comments/mutations";
import { Comment, NewCommentBody } from "@/types/comment";
import {
  useCommentsContext,
  useCommentsMutations,
} from "@/features/bulletin-board/contexts/CommentsContext";

type CommentEditorProps = {
  mode: "create" | "update" | "reply";
  /** Parent comment id when mode = "reply". 0 for top-level. */
  commentid?: number;
  /** Comment being edited when mode = "update". */
  curCommentId?: number | null;
  /** Visible placeholder for the textarea. Display only — never seeds value. */
  placeholder?: string;
  /** Initial textarea value (used in update mode to seed the existing text). */
  initialText?: string;
  /** Existing secret flag, used in update mode to disable the checkbox. */
  secret?: boolean;
  /** Generic close callback — used by parent to close edit/reply editors. */
  setOpen?: (value: boolean) => void;
};

let nextTempId = -1;
function makeTempId(): number {
  // Negative ids are guaranteed non-collision with backend ids (always > 0).
  return nextTempId--;
}

export default function CommentEditor({
  mode,
  commentid = 0,
  curCommentId = null,
  placeholder = "댓글을 입력해주세요",
  initialText,
  secret,
  setOpen = () => {},
}: CommentEditorProps) {
  const { session, isEveryKisa, postid } = useCommentsContext();
  const {
    refreshComments,
    onCommentAdded,
    onOptimisticAdd,
    onOptimisticReplace,
    onOptimisticRollback,
  } = useCommentsMutations();

  const [text, setText] = useState<string>(initialText ?? "");

  // anonymous radio state — everykisa boards only.
  // "none" = unselected (submit disabled), "anonymous" / "non-anonymous" = chosen.
  const [anonymousValue, setAnonymousValue] = useState<string>("none");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [secretChecked, setSecretChecked] = useState<boolean>(
    mode === "update" ? Boolean(secret) : false,
  );

  const isTextEmpty = text.trim().length === 0;
  const isAnonymousNotSelected = isEveryKisa && anonymousValue === "none";
  const isSubmitDisabled =
    isTextEmpty || isAnonymousNotSelected || isSubmitting;

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value);

  const handleSecretChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSecretChecked(e.target.checked);

  /**
   * Submit a new comment (POST). Performs an optimistic insert and rolls back
   * on failure.
   */
  const handleSubmitComment = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const data: NewCommentBody = {
      email: session?.user.email,
      fullname: session?.user.name,
      text,
      isCommentOfComment: commentid !== 0,
      parentCommentid: commentid,
      anonymous: isEveryKisa ? anonymousValue === "anonymous" : false,
      secret: secretChecked,
    };

    // Build a local temp comment for optimistic insert.
    const tempId = makeTempId();
    const tempComment: Comment = {
      ...data,
      commentid: tempId,
      postid,
      created: new Date().toISOString(),
      childComments: [],
      likesCount: 0,
    };
    onOptimisticAdd(tempComment);
    onCommentAdded();

    const res = await createComment(postid, data, session?.token);

    if (res) {
      // Refresh from server so the temp is replaced with the real comment.
      onOptimisticReplace(tempId, (res as Comment) ?? null);
      refreshComments();
      setOpen(false);
      setText("");
      setAnonymousValue("none");
      setIsSubmitting(false);
    } else {
      onOptimisticRollback(tempId);
      setIsSubmitting(false);
      toast.error("댓글 등록에 실패했습니다.");
    }
  };

  /**
   * Submit an edit (PUT).
   */
  const handleSubmitUpdate = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const res = await updateComment(curCommentId, { text }, session?.token);
    if (res) {
      refreshComments();
      setOpen(false);
      setIsSubmitting(false);
    } else {
      setIsSubmitting(false);
      toast.error("댓글 수정에 실패했습니다.");
    }
  };

  const handleSubmit =
    mode === "update" ? handleSubmitUpdate : handleSubmitComment;

  return (
    <div className="flex w-full flex-col gap-2">
      <Textarea
        value={text}
        onChange={handleTextChange}
        placeholder={placeholder}
        rows={3}
        className="resize-none"
        onKeyDown={(e) => {
          if (
            e.key === "Enter" &&
            !e.shiftKey &&
            e.target === document.activeElement &&
            !isSubmitDisabled
          ) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />

      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* Identity / privacy controls — mutually exclusive by board kind. */}
        <div className="flex items-center">
          {isEveryKisa && mode !== "update" && (
            <RadioGroup
              value={anonymousValue}
              onValueChange={setAnonymousValue}
              className="flex flex-row gap-3"
              aria-label="작성자 표시 방식"
            >
              <RadioItem value="anonymous" text="익명" />
              <RadioItem value="non-anonymous" text="실명" />
            </RadioGroup>
          )}
          {!isEveryKisa && (
            <Checkbox
              id="secret"
              name="secret"
              checked={secretChecked}
              onChange={handleSecretChange}
              disabled={mode === "update"}
              text="비밀댓글"
            />
          )}
        </div>

        <Button
          variant="primary"
          size="sm"
          disabled={isSubmitDisabled}
          onClick={handleSubmit}
        >
          {isSubmitting ? "등록 중" : "댓글 등록"}
        </Button>
      </div>
    </div>
  );
}
