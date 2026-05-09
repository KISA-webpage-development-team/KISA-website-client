"use client";

// PostDetailClient — shared CSR renderer for the post-detail surface.
//
// Mounted both by:
//   - /posts/[postid] — the canonical view
//   - /posts/delete/[board]/[postid] — same surface with the delete-confirm
//     Dialog open on first render (back-compat with inbound delete links)
//
// Owns: post fetch, session, capability gate, and CommentsProvider wiring.

import React from "react";
import { useSession } from "next-auth/react";

import { LoadingSpinner, StatusView } from "@umichkisa-ds/web";

import BoardTitle from "@/features/bulletin-board/components/shared/BoardTitle";
import PostView from "@/features/bulletin-board/components/post-view/PostView";
import CommentsView from "@/features/bulletin-board/components/comment/CommentsView";

import { usePost } from "@/apis/posts/swrHooks";
import {
  isAnnouncementBoard,
  isEveryKisaBoard,
} from "@/utils/formats/boardType";
import { UserSession } from "@/lib/next-auth/types";
import { CommentsProvider } from "@/features/bulletin-board/contexts/CommentsContext";
import { getBoardCapability } from "@/features/bulletin-board/config/boardCapabilities";
import useAdmin from "@/lib/next-auth/useAdmin";

type PostDetailClientProps = {
  postid: number;
  initialDeleteOpen?: boolean;
};

export default function PostDetailClient({
  postid,
  initialDeleteOpen = false,
}: PostDetailClientProps) {
  // Single subscription point for session + admin status across the post tree.
  // Both flow downward as props / context so PostView, PostButtonBar, and
  // every CommentItem don't each subscribe to NextAuth independently.
  const { data: session, status: sessionStatus } = useSession() as {
    data: UserSession | undefined;
    status: string;
  };
  const { isAdmin } = useAdmin();

  const { post, isLoading: isPostLoading, error } = usePost(postid);

  const isLoading = isPostLoading || sessionStatus === "loading";

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !post) {
    return (
      <StatusView
        variant="not-found"
        title="게시글을 찾을 수 없습니다"
        description="삭제되었거나 잘못된 주소일 수 있습니다."
      />
    );
  }

  // Back-compat: study-group posts on the announcement board still allow comments.
  const studyGroupPost =
    post.postid === 368 || post.title?.startsWith("스터디 그룹 모집");

  const capability = getBoardCapability(post.type);
  const canComment =
    capability.commentsEnabled &&
    !post.isAnnouncement &&
    !isAnnouncementBoard(post.type);

  return (
    <div className="flex flex-col gap-6">
      <BoardTitle boardType={post.type} size="small" />

      <PostView
        post={post}
        session={session ?? null}
        isAdmin={isAdmin}
        initialDeleteOpen={initialDeleteOpen}
      />

      {(studyGroupPost || canComment) && (
        <CommentsProvider
          value={{
            session,
            isAuthenticated: sessionStatus === "authenticated",
            isAdmin,
            isEveryKisa: isEveryKisaBoard(post.type),
            postid: post.postid,
            postAuthorEmail: post.email,
          }}
        >
          <CommentsView commentsCount={post.commentsCount} />
        </CommentsProvider>
      )}
    </div>
  );
}
