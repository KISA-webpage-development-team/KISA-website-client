"use client";

// [UI]
// 1. comment count
// 2. default comment editor to add direct comment on the post
// 3. comment list

import React, { useEffect, useState } from "react";

// ui components
import CommentEditor from "./CommentEditor";
import CommentsList from "./CommentsList";

// hooks
import { useComments } from "@/features/bulletin-board/hooks/useComments";

// types
import { useCommentsContext } from "@/features/bulletin-board/contexts/CommentsContext";

type CommentsViewProps = {
  commentsCount: number;
};

export default function CommentsView({ commentsCount }: CommentsViewProps) {
  const { isAuthenticated, postid } = useCommentsContext();

  const {
    comments,
    status: commentsStatus,
    error,
    refreshComments,
  } = useComments(postid);

  // optimistic UI update on comments count to solve comments count sync issue
  // [NOTE] this needs delicate attention on implementation, it would be better if we have a separate api for updating comments count
  const [optimisticCommentsCount, setOptimisticCommentsCount] =
    useState<number>(commentsCount);

  // Sync with prop if post is refetched
  useEffect(() => {
    setOptimisticCommentsCount(commentsCount);
  }, [commentsCount]);

  const handleCommentAdded = () => {
    setOptimisticCommentsCount((c) => c + 1);
    console.log("handleCommentAdded");
  };

  const handleCommentDeleted = () =>
    setOptimisticCommentsCount((c) => Math.max(0, c - 1));
  // ------------------------------------------------------------

  const isLoading = commentsStatus === "loading";

  if (isLoading) {
    return null;
  }

  if (commentsStatus === "error") {
    throw new Error(error || "Failed to fetch comments");
  }

  return (
    <div className="flex flex-col py-4 gap-2 self-stretch">
      {/* 1. comment count */}
      <span className="text-sm md:text-base">{`댓글 ${optimisticCommentsCount}개`}</span>

      {/* 2. default comment editor to add direct comment on the post */}
      {isAuthenticated && (
        <CommentEditor
          mode="create"
          refreshComments={refreshComments}
          onCommentAdded={handleCommentAdded}
        />
      )}

      {/* 3. comment list */}
      <CommentsList
        comments={comments}
        refreshComments={refreshComments}
        onCommentAdded={handleCommentAdded}
        onCommentDeleted={handleCommentDeleted}
      />
    </div>
  );
}
