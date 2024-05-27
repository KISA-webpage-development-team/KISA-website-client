import React from "react";
import PostClient from "../../../components/Posts/post-view/PostClient";
export default function PostPage({ params }) {
  const { postid } = params;

  return (
    <div className="flex flex-col">
      <PostClient postid={postid} />
    </div>
  );
}
