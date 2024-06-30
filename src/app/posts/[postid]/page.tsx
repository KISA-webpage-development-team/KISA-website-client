"use client";

// [24.06.01 ~ ]: Refactoring + TS conversion by Jioh

// [UI]
// BoardTitle
// PostView
// CommentsView

import BoardTitle from "../../../components/Boards/BoardTitle";
import CommentsView from "../../../components/Posts/comment/CommentsView";
import PostView from "../../../components/Posts/post-view/PostView";
import { usePost } from "../../../service/swrHooks/postHooks";
import { fetcher } from "../../../service/swrConfig";
import { SessionProvider } from "next-auth/react";

type PageProps = {
  params: {
    postid: string;
  };
};

export default function PostPage({ params }: PageProps) {
  const { postid } = params;

  const { post, isLoading, isError } = usePost(postid, { fetcher: fetcher });

  // [TODO]: when there's no post "error.tsx" should be rendered
  if (isLoading) {
    return <></>;
  }
  if (isError) {
    return <div>존재하지 않는 게시물입니다</div>;
  }

  return (
    <section className="!gap-0">
      <BoardTitle boardType={post.type} size="small" />

      <SessionProvider>
        <PostView post={post} />

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
