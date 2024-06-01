import React from "react";
import { CommentsListProps } from "../../../model/props/posts";
import CommentItem from "./CommentItem";

export default function CommentsList({
  comments,
  session,
  setCommentsStale,
}: CommentsListProps) {
  return (
    <div className="flex flex-col gap-1 mt-2">
      {comments?.map((comment) => (
        <CommentItem
          key={`comment-${comment.commentid}`}
          session={session}
          comment={comment}
          parentCommentid={comment.commentid}
          setCommentsStale={setCommentsStale}
        />
      ))}
    </div>
  );
}
