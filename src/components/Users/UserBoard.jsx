import React, { useState } from "react";
import UserBoardList from "./UserBoardList";
import UserBoardNavBar from "./UserBoardNavBar";
import { heebo, sejongHospitalLight } from "../../utils/fonts/textFonts";

export default function UserBoard({ postsData, commentsData }) {
  const [openPosts, setOpenPosts] = useState(true); // if openPosts = false, open comments

  if (!postsData && !commentsData) return null;

  return (
    <div className={`${heebo.className} flex flex-col w-full`}>
      {/* Nav Bar: 내 글 / 내 댓글 (default 내 글) */}
      <>
        <UserBoardNavBar openPosts={openPosts} setOpenPosts={setOpenPosts} />
      </>

      {/* 내 글 / 내 댓글 */}
      {(openPosts ? postsData : commentsData) && (
        <>
          <UserBoardList
            posts={postsData}
            comments={commentsData}
            openPosts={openPosts}
          />
        </>
      )}
    </div>
  );
}
