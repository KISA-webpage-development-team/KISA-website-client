import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { deleteComment } from "@/apis/comments/mutations";

// sub-ui components
import CommentEditor from "./CommentEditor";

import ImageButton from "../../shared/ImageButton";
import PencilIcon from "../../ui/PencilIcon";
import TrashcanIcon from "../../ui/TrashcanIcon";
import CommentIcon from "../../ui/CommentIcon";
import ReplyIcon from "../../ui/ReplyIcon";
import { UserSession } from "@/lib/next-auth/types";
import { Comment } from "@/types/comment";
import { formatRelativeTime } from "@/utils/formats/date";

type CommentItemProps = {
  session: UserSession;
  comment: Comment;
  parentCommentid?: number;
  setCommentsStale: (stale: boolean) => void;
  postAuthorEmail: string;
  commentAuthorMap: Map<string, number>;
};

export default function CommentItem({
  session,
  comment,
  parentCommentid = 0,
  setCommentsStale,
  postAuthorEmail,
  commentAuthorMap,
}: CommentItemProps) {
  const {
    commentid,
    email,
    postid,
    fullname,
    created,
    text,
    childComments,
    isCommentOfComment,
    anonymous,
    secret
  } = comment;
  // constants for comment item
  const isAuthor = session?.user?.email === email;
  const isPostAuthor = postAuthorEmail === email;
  const token = session?.token;

  // states for reply editor
  const [openReplyEditor, setOpenReplyEditor] = useState(false);
  const [openCommentEditor, setOpenCommentEditor] = useState(false);
  // states for delete comment
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const handleOpenReplyEditor = () => {
    setOpenReplyEditor(!openReplyEditor);
  };

  const handleOpenCommentEditor = () => {
    setOpenCommentEditor(!openCommentEditor);
  };

  const handleCommentDelete = async () => {
    setIsDeleteLoading(true);
    const res = await deleteComment(commentid, token);
    if (res?.success) {
      // modify states after comment has been deleted
      setCommentsStale(true);
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
    if (isAuthor || !anonymous) {
      return (
        <Link href={`/users/${email}`}>
          <span className="font-semibold hover:underline">{fullname}</span>
        </Link>
      );
    }

    if (isPostAuthor) {
      return <span className="font-semibold">익명(글쓴이)</span>;
    }

    return (
      <span className="font-semibold">{`익명${commentAuthorMap.get(
        email
      )}`}</span>
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        {isCommentOfComment ? (
          <ReplyIcon type="flip" customClassName="-translate-y-2 mr-4" />
        ) : null}

        {/* Comment contents */}
        <div className="flex flex-col w-full gap-1 md:gap-0">
          <div className="flex items-center justify-between">
            {/* 1. Name + Time */}
            <div
              className="flex items-center gap-1 md:gap-2
            text-sm md:text-base"
            >
              {/* TODO: 익명이 적용되어야하는 부분 */}
              {/* <Link href={`/users/${email}`}>
                <p className="text-black font-semibold hover:underline">
                  {fullname} <span>{anonymous && "익명"}</span>
                </p>
              </Link> */}
              {renderCommentAuthor()}
              <p className="text-gray-500">{formatRelativeTime(created)}</p>
            </div>

            {/* 2. Buttons */}
            <div className="flex gap-3">
              {isAuthor && (
                <>
                  <ImageButton
                    background="none"
                    text={`${openCommentEditor ? "취소" : "수정"}`}
                    icon={<PencilIcon color="gray" noResize />}
                    onClick={handleOpenCommentEditor}
                  />
                  <ImageButton
                    background="none"
                    icon={<TrashcanIcon color="gray" noResize />}
                    text={"삭제"}
                    onClick={handleCommentDelete}
                  />
                </>
              )}
              {session && (
                <ImageButton
                  background="none"
                  icon={<CommentIcon color="gray" noResize />}
                  text={`${openReplyEditor ? "닫기" : "답글"}`}
                  onClick={handleOpenReplyEditor}
                />
              )}
            </div>
          </div>
          {/* 3. Text */}
          <div
            className={`${
              isAuthor && "text-blue-500"
            } pb-3 text-sm md:text-base`}
          >
            {/* 텍스트 자체가 보이는 경우: 유저가 댓글 작성자일때, 시크릿이 아닐때, 유저가 포스트 작성자일때*/}
            {isAuthor || !secret || session?.user?.email === postAuthorEmail ? text : "비밀 댓글입니다."}
            {/* 로그인한 사람이, 포스트 작성자 + 비밀댓글 = 자물쇠  */}
            {/* 로그인한 사람이, 댓글 작성자 + 비밀댓글 = 자물쇠 */}
            {secret && (session?.user?.email === postAuthorEmail || isAuthor) ? "자물쇠" : null}

          </div>
        </div>
      </div>
      {/* Comment Editor from buttons */}
      {/* - Edit Reply */}
      {openCommentEditor && session && (
        <div className="mb-4">
          <CommentEditor
            mode="update"
            session={session}
            commentid={commentid}
            postid={postid}
            curCommentId={commentid}
            placeholder={text}
            secret={secret}
            setCommentsStale={setCommentsStale}
            setOpenCommentEditor={setOpenCommentEditor}
          />
        </div>
      )}
      {openReplyEditor && session && (
        <div className="ml-8 mb-4 flex items-center gap-4">
          <ReplyIcon type="flip" />
          <CommentEditor
            mode="reply"
            session={session}
            commentid={commentid}
            postid={postid}
            curCommentId={commentid}
            secret={secret}
            setCommentsStale={setCommentsStale}
            setOpenCommentEditor={setOpenReplyEditor}
          />
        </div>
      )}
      {/* 대댓글 */}
      {childComments &&
        childComments.length > 0 &&
        childComments.map((subComment, idx) => (
          <div key={`subComment-${subComment.commentid}`} className="ml-4">
            <CommentItem 
              comment={subComment}
              session={session}
              parentCommentid={commentid}
              setCommentsStale={setCommentsStale}
              postAuthorEmail={postAuthorEmail}
              commentAuthorMap={commentAuthorMap}
            />
          </div>
        ))}
    </div>
  );
}
