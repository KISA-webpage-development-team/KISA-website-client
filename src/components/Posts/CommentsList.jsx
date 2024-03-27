"use client";

import React from "react";
import CommentItem from "./CommentItem";
import DownArrowIcon from "../ui/DownArrowIcon";
import { useSession } from "next-auth/react";

export default function CommentsList({
  commentsCount,
  comments,
  setCommentsStale,
}) {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-4">
        <p className="mr-1">댓글 {commentsCount}개</p>
        <DownArrowIcon />
      </div>

      {comments?.map((comment) => (
        <div key={comment.commentid} className="mb-1">
          <CommentItem
            commentid={comment.commentid}
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
          />
        </div>
      ))}
    </div>
  );
}
