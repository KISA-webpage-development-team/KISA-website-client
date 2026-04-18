"use client";

// Post View page (/posts/[postid])

// [UI]
// BoardTitle
// PostView
// CommentsView

// [Rendering Method]: CSR (Client Side Rendering) with SWR

import { useSession } from "next-auth/react";

// sub-ui components
import { LoadingSpinner, NotFound } from "@/components/ui/feedback";
import BoardTitle from "@/features/bulletin-board/components/shared/BoardTitle";
import PostView from "@/features/bulletin-board/components/post-view/PostView";
import CommentsView from "@/features/bulletin-board/components/comment/CommentsView";

// apis
import { usePost } from "@/apis/posts/swrHooks";

// utils
import {
  isAnnouncementBoard,
  isEveryKisaBoard,
} from "@/utils/formats/boardType";
import { UserSession } from "@/lib/next-auth/types";
import { CommentsProvider } from "@/features/bulletin-board/contexts/CommentsContext";

type PageProps = {
  params: {
    postid: string;
  };
};

export default function PostViewPage({ params }: PageProps) {
  const { postid } = params;

  const { data: session, status: sessionStatus } = useSession() as {
    data: UserSession | undefined;
    status: string;
  };

  const { post, isLoading: isPostLoading, error } = usePost(Number(postid));

  // [TODO] temporarily sets studyGroupPost as whether post title starts with 스터디 그룹 모집
  // later, this needs to be changed by integrating backend with new column
  const studyGroupPost =
    post?.postid === 368 || post?.title.startsWith("스터디 그룹 모집");

  const canComment = !post?.isAnnouncement && !isAnnouncementBoard(post?.type);

  const isLoading = isPostLoading || sessionStatus === "loading";

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <NotFound />;
  }

  return (
    <section className="!gap-0">
      <BoardTitle boardType={post.type} size="small" />

      {/* 일단 post가 로딩되면 먼저 보여준다. */}
      <PostView post={post} />

      {/* Comments는 로딩되는대로 */}
      {/* if study group or canComment */}
      {studyGroupPost || canComment ? (
        <CommentsProvider
          value={{
            session,
            isAuthenticated: sessionStatus === "authenticated",
            isEveryKisa: isEveryKisaBoard(post?.type),
            postid: post?.postid,
            postAuthorEmail: post?.email,
          }}
        >
          <CommentsView commentsCount={post?.commentsCount} />
        </CommentsProvider>
      ) : null}
    </section>
  );
}

// [NOTE on rendering method]
// This page is rendered as SSR (Server Side Rendering) dynamically.
// "post" is initially fetched from the server
// and then the page is rendered with the fetched data.
