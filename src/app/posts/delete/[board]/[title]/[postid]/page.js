// this page lets user to confirm deletion of a post
import React from "react";
import PostDeleteClient from "../../../../../../components/Posts/PostDeleteClient";

export default function DeleteConfirmPage({ params }) {
  const { board, title, postid } = params; // post title
  const krTitle = decodeURI(title); // decodeURI to decode the encoded title

  return (
    <div
      className="h-full flex flex-col items-center justify-center gap-4 
    px-[20px] md:px-[60px] lg:px-[75px]"
    >
      <h1>{<strong>{`"${krTitle}"`}</strong>}을 삭제하시겠습니까?</h1>
      {/* Actual delete api call happens here */}
      <PostDeleteClient boardType={board} postid={postid} />
    </div>
  );
}
