"use client";

// [24.06.01 ~ ]: Refactoring + TS conversion by Jioh

// [UI]
// BoardTitle
// PostView
// CommentsView

import React from "react";
import { getSinglePost } from "../../../service/post";
import { PostParamsPageProps } from "../../../model/props/posts";
import BoardTitle from "../../../components/Boards/BoardTitle";
import CommentsView from "../../../components/Posts/comment/CommentsView";
import PostView from "../../../components/Posts/post-view/PostView";
import SWRProvider from "../../../context/SWRProvider";
import { usePost } from "../../../service/swrHooks/postHooks";
import { fetcher } from "../../../service/swrConfig";

export default function PostPage({ params }: PostParamsPageProps) {
  const { postid } = params;

  // const post = await getSinglePost(postid);

  const { post, isLoading, isError } = usePost(postid, { fetcher: fetcher });

  // [TODO]: when there's no post "error.tsx" should be rendered
  if (isLoading) {
    return <></>;
  }
  if (isError) {
    console.log(isError);

    return <div>존재하지 않는 게시물입니다</div>;
  }

  console.log(post);

  return (
    <section className="!gap-0">
      <div className="w-full">
        <BoardTitle boardType={post?.type} size="small" />
      </div>

      <div className="w-full">
        <PostView post={post} />
      </div>

      {!post?.isAnnouncement && post?.type !== "announcement" && (
        <div className="w-full">
          <CommentsView
            commentsCount={post?.commentsCount}
            postid={post?.postid}
          />
        </div>
      )}
    </section>
  );
}

// [NOTE on rendering method]
// This page is rendered as SSR (Server Side Rendering) dynamically.
// "post" is initially fetched from the server
// and then the page is rendered with the fetched data.
