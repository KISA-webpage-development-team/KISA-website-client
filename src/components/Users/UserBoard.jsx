"use client";

import React, { useEffect, useState } from "react";
import UserBoardList from "./UserBoardList";
import UserBoardNavBar from "./UserBoardNavBar";
import { getPostsByUser, getCommentsByUser } from "../../service/user";
import { heebo, sejongHospitalLight } from "../../utils/fonts/textFonts";
import { useSession } from "next-auth/react";
import { adminEmail } from "../../config/admin";

export default function UserBoard({ email }) {
  const [openPosts, setOpenPosts] = useState(true); // if openPosts = false, open comments
  const [postsData, setPostsData] = useState();
  const [commentsData, setCommentsData] = useState();

  const { data: session, status } = useSession();

  // if (!data) return <div>loading...</div>;

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await getPostsByUser(email, session?.token);
      if (res) {
        setPostsData(res.posts);
        return;
      } else {
        // error handling
        console.log("posts fetch failed");
      }
    };
    const fetchComments = async () => {
      const res = await getCommentsByUser(email, session?.token);
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
  }, [email, openPosts, session]);

  if (!postsData && !commentsData) return null;

  if (status === "loading" || status === "unauthenticated") return null;

  // umich kisa validity check
  if (session?.user.email !== adminEmail && email === adminEmail) {
    return null;
  }

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
