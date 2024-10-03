"use client";

import React from "react";
import { CustomButton } from "@/final_refactor_src/components/button";
import { getBoardPostNum, getBoardAnnouncements } from "@/apis/boards/queries";
import { BoardType } from "@/types/board";
import { getCommentsByPostid } from "@/apis/comments/queries";
import { getUserComments } from "@/apis/users/queries";
import {
  createComment,
  deleteComment,
  updateComment,
} from "@/apis/comments/mutations";
import { getPost } from "@/apis/posts/queries";

export default function APITester({ token }) {
  const sampleEmail = "jiohin@umich.edu";

  const handleApi = async () => {
    // const res = await getBoardPostNum(BoardType.Community);
    // const res = await getCommentsByPostid(192);
    const res = await getPost(192);
    // const res = await getUserComments(sampleEmail, token);

    // const res = await getUserPosts(sampleEmail, token);
    console.log(res);
  };
  return (
    <div>
      <CustomButton onClick={handleApi} text="TEST" />
    </div>
  );
}
