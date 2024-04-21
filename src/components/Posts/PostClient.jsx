"use client";

import React, { useEffect, useState } from "react";
import BoardTitle from "../Boards/BoardTitle";
import { createReadCountCookie, getSinglePost } from "../../service/post";
import HorizontalDivider from "../shared/HorizontalDivider";
import PostView from "./PostView";
// import { getCommentsByPostid } from "../../service/comment";

export default function PostClient({ postid }) {
  // 아래와 같이 useState와 useEffect를 이용해 CSR을 할 수 있음
  // 이는 서버 과부화를 초래할 수 있으나 real time을 유지할 수 있는 방식임.
  // update post후에 바로 페이지에 반영되지 않는 문제를 해결하기 위해 client page로 만듦.

  const [post, setPost] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const post = await getSinglePost(postid);
      setPost(post);

      return;
    };

    getData();
  }, [postid]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    /* post is null when it is not fetched yet */
    post && (
      <div className="flex flex-col">
        {/* board title */}
        <div
          className="pt-1
        pb-1 md:pb-2 flex"
        >
          <BoardTitle boardType={post.type} />
        </div>
        <HorizontalDivider color="dark" />

        {/* post content */}
        <PostView boardType={post.type} post={post} postid={postid} />
      </div>
    )
  );
}
