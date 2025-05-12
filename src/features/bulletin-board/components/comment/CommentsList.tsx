import React from "react";

import CommentItem from "./CommentItem";
import { useCommentsContext } from "@/features/bulletin-board/contexts/CommentsContext";

import { Comment } from "@/types/comment";

type CommentsListProps = {
  comments: Comment[];
  refreshComments: () => void;
  onCommentAdded?: () => void;
  onCommentDeleted?: () => void;
};

export default function CommentsList({
  comments,
  refreshComments,
  onCommentAdded,
  onCommentDeleted,
}: CommentsListProps) {
  const { session } = useCommentsContext();

  const commentAuthorMap = getCommentAuthorMap(comments, session?.user?.email);

  return (
    <ul className="flex flex-col gap-1 mt-2">
      {comments?.map((comment) => (
        <CommentItem
          key={`comment-${comment.commentid}`}
          comment={comment}
          refreshComments={refreshComments}
          commentAuthorMap={commentAuthorMap}
          onCommentAdded={onCommentAdded}
          onCommentDeleted={onCommentDeleted}
        />
      ))}
    </ul>
  );
}

/**
 * Get comment author map using DFS
 */
function getCommentAuthorMap(
  comments: Comment[],
  sessionEmail: string
): Map<string, number> {
  const commentAuthorMap = new Map<string, number>();
  let idx = 1;

  const dfs = (comment: Comment) => {
    if (comment.email === sessionEmail) {
      commentAuthorMap.set(comment.email, 0);
    } else if (comment.anonymous && !commentAuthorMap.has(comment.email)) {
      commentAuthorMap.set(comment.email, idx++);
    }

    if (comment.childComments && comment.childComments.length > 0) {
      for (const childComment of comment.childComments) {
        dfs(childComment);
      }
    }
  };

  for (const comment of comments) {
    dfs(comment);
  }
  return commentAuthorMap;
}
