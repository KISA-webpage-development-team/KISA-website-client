import React, { useMemo } from "react";

import CommentItem from "./CommentItem";
import { useCommentsContext } from "@/features/bulletin-board/contexts/CommentsContext";

import { Comment } from "@/types/comment";

type CommentsListProps = {
  comments: Comment[];
};

export default function CommentsList({ comments }: CommentsListProps) {
  const { session } = useCommentsContext();

  const sessionEmail = session?.user?.email;
  const commentAuthorMap = useMemo(
    () => getCommentAuthorMap(comments, sessionEmail),
    [comments, sessionEmail],
  );

  return (
    <ul className="flex flex-col gap-3">
      {comments?.map((comment) => (
        <li key={`comment-${comment.commentid}`}>
          <CommentItem
            comment={comment}
            commentAuthorMap={commentAuthorMap}
          />
        </li>
      ))}
    </ul>
  );
}

/**
 * Build a deterministic anon-numbering map across the (possibly nested) thread.
 * - The viewer's own comments are mapped to 0 (rendered as their fullname).
 * - Other anonymous authors are numbered 1..N in DFS order, stable across
 *   edits/deletes of unrelated comments.
 */
function getCommentAuthorMap(
  comments: Comment[],
  sessionEmail: string | undefined,
): Map<string, number> {
  const map = new Map<string, number>();
  let idx = 1;

  const dfs = (comment: Comment) => {
    if (comment.email === sessionEmail) {
      map.set(comment.email, 0);
    } else if (comment.anonymous && !map.has(comment.email)) {
      map.set(comment.email, idx++);
    }
    if (comment.childComments && comment.childComments.length > 0) {
      for (const child of comment.childComments) {
        dfs(child);
      }
    }
  };

  for (const c of comments) {
    dfs(c);
  }
  return map;
}
