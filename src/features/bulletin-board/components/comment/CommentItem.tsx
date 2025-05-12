import React, { useState } from "react";
import Link from "next/link";
import { deleteComment } from "@/apis/comments/mutations";

// sub-ui components
import CommentEditor from "./CommentEditor";
import GoBlueButton from "@/features/bulletin-board/components/shared/GoBlueButton";
import CustomImageButton from "@/components/ui/button/CustomImageButton";
import PencilIcon from "@/components/ui/icon/PencilIcon";
import TrashcanIcon from "@/components/ui/icon/TrashcanIcon";
import CommentIcon from "@/components/ui/icon/CommentIcon";
import ReplyIcon from "@/components/ui/icon/ReplyIcon";

// utils
import { formatRelativeTime } from "@/utils/formats/date";

// apis
import SecretIcon from "@/components/ui/icon/SecretIcon";

// types
import { Comment } from "@/types/comment";

import { useCommentsContext } from "@/features/bulletin-board/contexts/CommentsContext";

type CommentItemProps = {
  comment: Comment;
  refreshComments: () => void;
  commentAuthorMap: Map<string, number>;
  onCommentAdded?: () => void;
  onCommentDeleted?: () => void;
};

export default function CommentItem({
  comment,
  refreshComments,
  commentAuthorMap,
  onCommentAdded,
  onCommentDeleted,
}: CommentItemProps) {
  const { session, isEveryKisa, postAuthorEmail } = useCommentsContext();
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

  // states for reply editor
  const [openReplyEditor, setOpenReplyEditor] = useState(false);
  const [openCommentEditor, setOpenCommentEditor] = useState(false);
  // states for delete comment
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  // derived states
  const isCommentAuthor = session?.user?.email === comment.email;
  const isPostAuthor = postAuthorEmail === comment.email;

  const canEdit = isCommentAuthor;
  const canDelete = isCommentAuthor;
  const canReply = !(
    secret &&
    !(session?.user?.email === postAuthorEmail) &&
    !isCommentAuthor
  );
  const canSeeText =
    isCommentAuthor || !secret || session?.user?.email === postAuthorEmail;
  const showSecretIcon =
    secret && (session?.user?.email === postAuthorEmail || isCommentAuthor);

  const handleOpenReplyEditor = () => {
    // session이 존재하지 않으면, 로그인 필수 모달을 띄워야 함
    if (!session) {
      window.alert("로그인이 필요한 기능입니다.");
      return;
    }

    setOpenReplyEditor(!openReplyEditor);
  };

  const handleOpenCommentEditor = () => {
    setOpenCommentEditor(!openCommentEditor);
  };

  const handleCommentDelete = async () => {
    setIsDeleteLoading(true);
    const res = await deleteComment(commentid, session?.token);
    if (res?.success) {
      // modify states after comment has been deleted
      refreshComments();
      onCommentDeleted?.();
      setIsDeleteLoading(false);
    } else {
      // error handling
      console.log("comment deletion failed");
    }
  };

  /**
   * @desc Renders the author of the comment following anonymous logic
   *
   */
  const renderCommentAuthor = () => {
    if (isCommentAuthor && anonymous) {
      return (
        <Link href={`/users/${email}`}>
          <span className="font-semibold hover:underline">{`${fullname}(익명)`}</span>
        </Link>
      );
    } else if (isCommentAuthor || !anonymous) {
      return (
        <Link href={`/users/${email}`}>
          <span className="font-semibold hover:underline">{fullname}</span>
        </Link>
      );
    } else if (isPostAuthor) {
      return (
        <span className="font-semibold">{`익명${commentAuthorMap.get(
          email
        )}(글쓴이)`}</span>
      );
    } else {
      return (
        <span className="font-semibold">{`익명${commentAuthorMap.get(
          email
        )}`}</span>
      );
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        {isCommentOfComment ? (
          <ReplyIcon type="flip" className="-translate-y-2" />
        ) : null}

        {/* Comment contents */}
        <div
          className={`flex flex-col w-full gap-1 md:gap-0
          ${isCommentOfComment && "pl-2"}`}
        >
          <div className="flex items-center justify-between">
            {/* 1. Name + Time */}
            <div
              className="flex items-center gap-1 md:gap-2
            text-sm md:text-base"
            >
              {canSeeText ? (
                <>
                  {renderCommentAuthor()}
                  <p className="text-gray-500">{formatRelativeTime(created)}</p>
                </>
              ) : (
                <>
                  <SecretIcon />

                  <p className="text-gray-500">{formatRelativeTime(created)}</p>
                </>
              )}

              {showSecretIcon ? <SecretIcon /> : null}
            </div>

            {/* 2. Buttons */}
            <div className="flex">
              {isEveryKisa && !secret && (
                <GoBlueButton
                  targetType="comment"
                  id={commentid}
                  session={session}
                />
              )}
              {canEdit && canDelete && (
                <>
                  <CustomImageButton
                    type="tertiary"
                    background="none"
                    text={`${openCommentEditor ? "취소" : "수정"}`}
                    icon={<PencilIcon color="gray" noResize />}
                    onClick={handleOpenCommentEditor}
                  />
                  <CustomImageButton
                    type="tertiary"
                    background="none"
                    icon={<TrashcanIcon color="gray" noResize />}
                    text={isDeleteLoading ? "삭제중..." : "삭제"}
                    onClick={handleCommentDelete}
                    disabled={isDeleteLoading}
                  />
                </>
              )}
              {canReply && (
                <>
                  <CustomImageButton
                    type="tertiary"
                    background="none"
                    icon={<CommentIcon color="gray" noResize />}
                    text={`${openReplyEditor ? "닫기" : "답글"}`}
                    onClick={handleOpenReplyEditor}
                  />
                </>
              )}
            </div>
          </div>
          {/* 3. Text */}
          <div
            className={`${
              isCommentAuthor && "text-blue-500"
            } pt-1 pb-3 text-sm md:text-base
            text-wrap `}
          >
            {/* 텍스트 자체가 보이는 경우: 유저가 댓글 작성자일때, 시크릿이 아닐때, 유저가 포스트 작성자일때*/}
            {canSeeText ? text : <p className="italic">비밀 댓글입니다.</p>}
            {/* 로그인한 사람이, 포스트 작성자 + 비밀댓글 = 자물쇠  */}
            {/* 로그인한 사람이, 댓글 작성자 + 비밀댓글 = 자물쇠 */}
          </div>
        </div>
      </div>
      {/* Comment Editor from buttons */}
      {/* - Edit Reply */}
      {openCommentEditor && session && (
        <div className="mb-4">
          <CommentEditor
            mode="update"
            commentid={commentid}
            curCommentId={commentid}
            placeholder={text}
            secret={secret}
            refreshComments={refreshComments}
            setOpenCommentEditor={setOpenCommentEditor}
          />
        </div>
      )}
      {openReplyEditor && session && (
        <div className="ml-8 mb-4 flex items-center gap-4">
          <ReplyIcon type="flip" />
          <CommentEditor
            mode="reply"
            commentid={commentid}
            curCommentId={commentid}
            secret={secret}
            refreshComments={refreshComments}
            setOpenCommentEditor={setOpenReplyEditor}
            onCommentAdded={onCommentAdded}
          />
        </div>
      )}
      {/* 대댓글 */}
      {childComments &&
        childComments.length > 0 &&
        childComments.map((subComment, idx) => (
          <div
            key={`subComment-${subComment.commentid}`}
            className="ml-3 md:ml-4"
          >
            <CommentItem
              comment={subComment}
              refreshComments={refreshComments}
              commentAuthorMap={commentAuthorMap}
              onCommentAdded={onCommentAdded}
              onCommentDeleted={onCommentDeleted}
            />
          </div>
        ))}
    </div>
  );
}
