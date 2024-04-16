"use client";

import React, { useEffect, useState } from "react";
import UserBoardList from "./UserBoardList";
import UserBoardNavBar from "./UserBoardNavBar";
import { getPostsByUser, getCommentsByUser } from "../../service/user";
import { heebo, sejongHospitalLight } from "../../utils/fonts/textFonts";

export default function UserBoard({ email }) {
  const [openPosts, setOpenPosts] = useState(true); // if openPosts = false, open comments
  const [postsData, setPostsData] = useState();
  const [commentsData, setCommentsData] = useState();

  // if (!data) return <div>loading...</div>;

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await getPostsByUser(email);
      if (res) {
        setPostsData(res.posts);
        return;
      } else {
        // error handling
        console.log("posts fetch failed");
      }
    };
    const fetchComments = async () => {
      const res = await getCommentsByUser(email);
      if (res) {
        setCommentsData(res.comments);
        return;
      } else {
        // error handling
        console.log("comments fetch failed");
      }
    };

    if (openPosts) fetchPosts();
    else fetchComments();
  }, [email, openPosts]);

  if (!postsData && !commentsData) return null;

  return (
    <div className={`${heebo.className} flex flex-col w-full mt-10`}>
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
