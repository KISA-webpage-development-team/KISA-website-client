"use client";

import { usePost } from "@/final_refactor_src/apis/post/hooks";
// [24.06.01 ~ ]: Refactoring + TS conversion by Jioh

// [UI]
// BoardTitle
// PostView
// CommentsView

// [Rendering Method]: CSR (Client Side Rendering) with SWR
import BoardTitle from "../../../components/Boards/BoardTitle";
import CommentsView from "../../../components/Posts/comment/CommentsView";
import PostView from "../../../components/Posts/post-view/PostView";
import { SessionProvider } from "next-auth/react";
import { LoadingSpinner } from "@/final_refactor_src/components/feedback";

type PageProps = {
  params: {
    postid: string;
  };
};

export default function PostViewPage({ params }: PageProps) {
  const { postid } = params;

  const { post, isLoading, error } = usePost(postid);

  // [TODO]: when there's no post "error.tsx" should be rendered
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    throw error;
  }

  return (
    <section className="!gap-0">
      <BoardTitle boardType={post.type} size="small" />

      <SessionProvider>
        {/* 일단 post가 로딩되면 먼저 보여준다. */}
        <PostView post={post} />

        {/* Comments는 로딩되는대로 */}
        {!post?.isAnnouncement && post?.type !== "announcement" && (
          <CommentsView
            commentsCount={post?.commentsCount}
            postid={post?.postid}
          />
        )}
      </SessionProvider>
    </section>
  );
}

// [NOTE on rendering method]
// This page is rendered as SSR (Server Side Rendering) dynamically.
// "post" is initially fetched from the server
// and then the page is rendered with the fetched data.
