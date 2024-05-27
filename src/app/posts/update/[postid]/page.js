"use client";

import React, { useEffect, useState } from "react";
import BoardTitle from "../../../../components/Boards/BoardTitle";
import { getSinglePost } from "../../../../service/post";
import dynamic from "next/dynamic";

// need to force EditorClient to be rendered on client-side
// I don't know why NextJS doesn't automatically render it on client-side
// this will remove the error "document is not defined"
const EditorClient = dynamic(
  () => import("../../../../components/Posts/post-edit/EditorClient"),
  {
    ssr: false,
  }
);

export default function PostUpdatePage({ params }) {
  const { postid } = params;
  const [post, setPost] = useState();

  useEffect(() => {
    const fetchPost = async () => {
      const post = await getSinglePost(postid);
      setPost(post);
    };
    fetchPost();
  }, [postid]);

  if (!post) {
    return <></>;
  }

  return (
    <section>
      {/* Board Title */}
      <BoardTitle boardType={post.type} />

      {/* Text Editor */}

      <div className="grow w-full">
        <EditorClient boardType={post.type} curPost={post} mode="update" />
      </div>
    </section>
  );
}
// [NOTE on rendering method]
// This page is rendered as CSR (Client Side Rendering) dynamically.
// * current post data is fetched with useEffect to keep it updated
// Client-Side Components like BoardTitle and Editor are rendered and
// become interactive in the browser after the initial HTML is loaded
