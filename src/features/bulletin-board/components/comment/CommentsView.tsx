"use client";

// [UI]
// 1. comment count
// 2. default comment editor to add direct comment on the post
// 3. comment list

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

// ui components
import CommentEditor from "./CommentEditor";
import CommentsList from "./CommentsList";

// hooks
import { useComments } from "@/features/bulletin-board/hooks/useComments";

// types
import { UserSession } from "@/lib/next-auth/types";

type CommentsViewProps = {
  isEveryKisa?: boolean;
  commentsCount: number;
  postid: number;
  email: string;
};

export default function CommentsView({
  isEveryKisa = false,
  commentsCount,
  postid,
  email,
}: CommentsViewProps) {
  const { data: session, status: sessionStatus } = useSession() as {
    data: UserSession | undefined;
    status: string;
  };

  const {
    comments,
    status: commentsStatus,
    error,
    refreshComments,
  } = useComments(postid);

  // optimistic update on comments count to solve comments count sync issue
  // [NOTE] this needs delicate attention on implementation, it would be better if we have a separate api for updating comments count
  const [optimisticCommentsCount, setOptimisticCommentsCount] =
    useState<number>(commentsCount);

  // Sync with prop if post is refetched
  useEffect(() => {
    setOptimisticCommentsCount(commentsCount);
  }, [commentsCount]);

  const handleCommentAdded = () => setOptimisticCommentsCount((c) => c + 1);

  const handleCommentDeleted = () =>
    setOptimisticCommentsCount((c) => Math.max(0, c - 1));
  // ------------------------------------------------------------

  const isLoading = sessionStatus === "loading" || commentsStatus === "loading";
  const isAuthenticated = sessionStatus === "authenticated";

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
          isEveryKisa={isEveryKisa}
          mode="create"
          session={session}
          postid={postid}
          refreshComments={refreshComments}
          onCommentAdded={handleCommentAdded}
        />
      )}

      {/* 3. comment list */}
      <CommentsList
        isEveryKisa={isEveryKisa}
        comments={comments}
        session={session}
        refreshComments={refreshComments}
        email={email}
        onCommentDeleted={handleCommentDeleted}
      />
    </div>
  );
}
