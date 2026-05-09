"use client";

// CommentsView
// 1. comment count
// 2. top-level composer (when authenticated)
// 3. comment list

import React, { useCallback, useMemo, useState } from "react";

import { Alert, Divider } from "@umichkisa-ds/web";

import CommentEditor from "./CommentEditor";
import CommentsList from "./CommentsList";

import { useComments } from "@/features/bulletin-board/hooks/useComments";
import { useCommentsContext } from "@/features/bulletin-board/contexts/CommentsContext";
import { Comment } from "@/types/comment";

type CommentsViewProps = {
  commentsCount: number;
};

/** Insert an optimistic temp comment into the tree. */
function insertOptimistic(tree: Comment[], temp: Comment): Comment[] {
  if (!temp.isCommentOfComment || !temp.parentCommentid) {
    return [...tree, temp];
  }
  return tree.map((c) => {
    if (c.commentid === temp.parentCommentid) {
      return { ...c, childComments: [...(c.childComments ?? []), temp] };
    }
    if (c.childComments?.length) {
      return {
        ...c,
        childComments: insertOptimistic(c.childComments, temp),
      };
    }
    return c;
  });
}

export default function CommentsView({ commentsCount }: CommentsViewProps) {
  const { isAuthenticated, postid } = useCommentsContext();

  const {
    comments,
    status: commentsStatus,
    error,
    refreshComments,
  } = useComments(postid);

  // Optimistic count is tracked as a signed delta on top of the server-truth
  // `commentsCount` prop. When the server count changes (post refetch) the
  // delta resets — handled inline below per React's "reset state on prop
  // change" pattern (no effect needed).
  const [delta, setDelta] = useState(0);
  const [lastSyncedCount, setLastSyncedCount] = useState(commentsCount);
  if (lastSyncedCount !== commentsCount) {
    setLastSyncedCount(commentsCount);
    setDelta(0);
  }
  const displayedCommentsCount = Math.max(0, commentsCount + delta);

  // Optimistic comment list. Server-fetched `comments` is the ground truth;
  // local overlays apply between submit and refresh. Each temp is keyed by a
  // negative id; CommentEditor's onOptimisticReplace drops it deterministically
  // on POST success, so we don't need a fuzzy reconciliation effect.
  const [overlay, setOverlay] = useState<Comment[]>([]);

  const renderedComments = useMemo<Comment[]>(() => {
    let tree = comments ?? [];
    for (const temp of overlay) {
      tree = insertOptimistic(tree, temp);
    }
    return tree;
  }, [comments, overlay]);

  const handleOptimisticAdd = useCallback((temp: Comment) => {
    setOverlay((prev) => [...prev, temp]);
  }, []);

  const handleOptimisticReplace = useCallback(
    (tempId: number, _server: Comment | null) => {
      // Drop the temp; server refresh provides the authoritative comment.
      setOverlay((prev) => prev.filter((t) => t.commentid !== tempId));
    },
    [],
  );

  const handleOptimisticRollback = useCallback((tempId: number) => {
    setOverlay((prev) => prev.filter((t) => t.commentid !== tempId));
    setDelta((d) => d - 1);
  }, []);

  const handleCommentAdded = useCallback(() => setDelta((d) => d + 1), []);
  const handleCommentDeleted = useCallback(() => setDelta((d) => d - 1), []);

  const isLoading = commentsStatus === "loading";

  return (
    <section className="flex flex-col gap-3 self-stretch py-4">
      <Divider />

      {/* 1. Header */}
      <h2 className="type-h3 text-foreground">
        댓글{" "}
        <span className="text-muted-foreground">{displayedCommentsCount}</span>
      </h2>

      {/* 2. Top-level composer (authenticated only). */}
      {isAuthenticated && (
        <CommentEditor
          mode="create"
          refreshComments={refreshComments}
          onCommentAdded={handleCommentAdded}
          onOptimisticAdd={handleOptimisticAdd}
          onOptimisticReplace={handleOptimisticReplace}
          onOptimisticRollback={handleOptimisticRollback}
        />
      )}

      {/* 3. List / states */}
      {isLoading && (
        <p className="type-body-sm text-muted-foreground">
          댓글을 불러오는 중입니다.
        </p>
      )}
      {!isLoading && commentsStatus === "error" && (
        <Alert variant="error" title="댓글을 불러오지 못했습니다">
          {error || "다시 시도해주세요."}
        </Alert>
      )}
      {!isLoading &&
        commentsStatus !== "error" &&
        renderedComments.length === 0 && (
          <p className="type-body-sm text-muted-foreground">
            아직 댓글이 없습니다.
          </p>
        )}
      {!isLoading && commentsStatus !== "error" && renderedComments.length > 0 && (
        <CommentsList
          comments={renderedComments}
          refreshComments={refreshComments}
          onCommentAdded={handleCommentAdded}
          onCommentDeleted={handleCommentDeleted}
          onOptimisticAdd={handleOptimisticAdd}
          onOptimisticReplace={handleOptimisticReplace}
          onOptimisticRollback={handleOptimisticRollback}
        />
      )}
    </section>
  );
}
