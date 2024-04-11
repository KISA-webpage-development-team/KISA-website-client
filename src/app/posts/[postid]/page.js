import React from "react";
import PostClient from "../../../components/Posts/PostClient";
export default function PostPage({ params }) {
  const { postid } = params;

  return (
    <div className="flex flex-col px-[20px] md:px-[60px] lg:px-[75px]">
      {/* client component를 사용하므로써 데이터를 real time으로 유지
      Client side rendering CSR */}
      <PostClient postid={postid} />
    </div>
  );
}
