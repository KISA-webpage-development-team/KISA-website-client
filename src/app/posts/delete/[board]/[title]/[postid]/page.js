// this page lets user to confirm deletion of a post
import React from "react";
import PostDeleteClient from "../../../../../../components/Posts/post-delete/PostDeleteClient";

export default function DeleteConfirmPage({ params }) {
  const { board, title, postid } = params; // post title
  const krTitle = decodeURI(title); // decodeURI to decode the encoded title

  return (
    <section className="items-center justify-center gap-4">
      <h1>{<strong>{`"${krTitle}"`}</strong>}을 삭제하시겠습니까?</h1>
      {/* Actual delete api call happens here */}
      <PostDeleteClient boardType={board} postid={postid} />
    </section>
  );
}
