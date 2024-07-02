"use client";

import React, { useState } from "react";
import UserBoardList from "./UserBoardList";
import UserBoardNavBar from "./UserBoardNavBar";
import { heebo } from "../../utils/fonts/textFonts";
import {
  useUserComments,
  useUserPosts,
} from "../../service/swrHooks/userHooks";

export default function UserBoard({ email, session }) {
  const [openPosts, setOpenPosts] = useState(true); // if openPosts = false, open comments

  // posts와 comments의 revalidate을 주기적으로 해줘야할것 같음.
  const {
    posts,
    isLoading: isPostsFetching,
    isError: postsError,
  } = useUserPosts(email, session?.token);
  const {
    comments,
    isLoading: isCommentsFetching,
    isError: commentsError,
  } = useUserComments(email, session?.token);

  if (isPostsFetching || isCommentsFetching) return null;

  if (postsError || commentsError) return <div>에러가 발생했습니다!</div>;

  return (
    <div className={`${heebo.className} flex flex-col w-full`}>
      {/* Nav Bar: 내 글 / 내 댓글 (default 내 글) */}
      <>
        <UserBoardNavBar openPosts={openPosts} setOpenPosts={setOpenPosts} />
      </>

      {/* 내 글 / 내 댓글 */}
      {(openPosts ? posts : comments) && (
        <>
          <UserBoardList
            posts={posts}
            comments={comments}
            openPosts={openPosts}
          />
        </>
      )}
    </div>
  );
}
