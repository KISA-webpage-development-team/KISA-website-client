"use client";

import React from "react";
import CommentItem from "./CommentItem";
import DownArrowIcon from "../../ui/DownArrowIcon";
import { useSession } from "next-auth/react";
import HorizontalDivider from "../../shared/HorizontalDivider";

export default function CommentsList({
  commentsCount,
  comments,
  setCommentsStale,
}) {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center">
        <p className="mr-1 text-sm md:text-base">댓글 {commentsCount}개</p>
        <DownArrowIcon />
      </div>

      {comments?.map((comment) => (
        <div key={comment.commentid} className="">
          <CommentItem
            commentid={comment.commentid}
            email={comment.email}
            postid={comment.postid}
            isAuthor={session?.user.email === comment.email}
            fullname={comment.fullname}
            created={comment.created}
            text={comment.text}
            childComments={comment.childComments}
            useremail={session?.user.email}
            isCommentOfComment={comment.isCommentOfComment}
            parentCommentid={comment.commentid}
            setCommentsStale={setCommentsStale}
            token={session?.token}
          />
        </div>
      ))}
    </div>
  );
}
