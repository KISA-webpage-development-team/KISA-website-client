import React from "react";
import PostClient from "../../../components/Posts/PostClient";
export default function PostPage({ params }) {
  const { postid } = params;

  // async function createViewCookie(postid) {
  //   "use server";

  //   // need to add secure: true later
  // }
  // const oneDay = 24 * 60 * 60 * 1000;
  // cookies().set(postid, true, {
  //   httpOnly: true,
  //   expires: new Date() + oneDay,
  // });d

  return (
    <div className="flex flex-col">
      {/* client component를 사용하므로써 데이터를 real time으로 유지
      Client side rendering CSR */}
      <PostClient postid={postid} />
    </div>
  );
}
