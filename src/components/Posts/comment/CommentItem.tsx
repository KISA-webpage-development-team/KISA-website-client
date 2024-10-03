import React, { useState } from "react";
import Link from "next/link";
import { timeForToday } from "../../../utils/dateFormatter";
import { deleteComment } from "@/apis/comments/mutations";
import { CommentItemProps } from "../../../model/props/posts";

// sub-ui components
import CommentEditor from "./CommentEditor";

import ImageButton from "../../shared/ImageButton";
import PencilIcon from "../../ui/PencilIcon";
import TrashcanIcon from "../../ui/TrashcanIcon";
import CommentIcon from "../../ui/CommentIcon";
import ReplyIcon from "../../ui/ReplyIcon";

export default function CommentItem({
  session,
  comment,
  parentCommentid = 0,
  setCommentsStale,
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
  } = comment;
  // constants for comment item
  const isAuthor = session?.user?.email === email;
  const useremail = session?.user?.email;
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
              <Link href={`/users/${email}`}>
                <p className="text-black font-semibold hover:underline">
                  {fullname}
                </p>
              </Link>
              <p className="text-gray-500">{timeForToday(created)}</p>
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
            {text}
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
            />
          </div>
        ))}
    </div>
  );
}
