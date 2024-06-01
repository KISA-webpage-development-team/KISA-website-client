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

export default async function PostPage({ params }: PostParamsPageProps) {
  const { postid } = params;

  // parallel fetching from server side: post & comment
  const post = await getSinglePost(postid);

  // [TODO]: when there's no post "error.tsx" should be rendered
  if (!post) {
    return <div>404 NOT FOUND</div>;
  }

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
