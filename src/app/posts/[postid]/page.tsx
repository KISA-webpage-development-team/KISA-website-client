// [24.06.01 ~ ]: Refactoring + TS conversion by Jioh

import React from "react";
import PostClient from "../../../components/Posts/post-view/PostClient";
import { getSinglePost } from "../../../service/post";
import { PostParamsPageProps } from "../../../model/props/posts";

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
    <div className="flex flex-col">
      <PostClient postid={postid} />
    </div>
  );
}

// [NOTE on rendering method]
// This page is rendered as SSR (Server Side Rendering) dynamically.
// "post" is initially fetched from the server
// and then the page is rendered with the fetched data.
