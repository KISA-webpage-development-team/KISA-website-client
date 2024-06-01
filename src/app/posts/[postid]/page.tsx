// [24.06.01 ~ ]: Refactoring + TS conversion by Jioh

// [UI]
// BoardTitle
// PostView
// CommentsView

import React from "react";
import PostClient from "../../../components/Posts/post-view/PostClient";
import { getSinglePost } from "../../../service/post";
import { PostParamsPageProps } from "../../../model/props/posts";
import BoardTitle from "../../../components/Boards/BoardTitle";
import TestPostView from "../../../components/Posts/post-view-test/TestPostView";
import TestCommentsView from "../../../components/Posts/post-view-test/TestCommentsView";
import HorizontalDivider from "../../../components/shared/HorizontalDivider";

export default async function PostPage({ params }: PostParamsPageProps) {
  const { postid } = params;

  const post = await getSinglePost(postid);
  // console.log("post: ", post);
  // console.log(typeof postid);

  // [TODO]: when there's no post "error.tsx" should be rendered
  if (!post) {
    return <div>404 NOT FOUND</div>;
  }

  return (
    <section className="!gap-0">
      <div className="w-full">
        <BoardTitle boardType={post?.type} size="small" />
      </div>
      {/* [TODO] change to PostView */}
      <div className="w-full">
        <TestPostView post={post} />
      </div>
      {/* [TODO] add CommentsView */}
      <div className="w-full">
        <TestCommentsView />
      </div>
    </section>
  );
}

// [NOTE on rendering method]
// This page is rendered as SSR (Server Side Rendering) dynamically.
// "post" is initially fetched from the server
// and then the page is rendered with the fetched data.
