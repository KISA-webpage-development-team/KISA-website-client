// this page lets user to confirm deletion of a post
import React from "react";
import PostDeleteClient from "@/features/bulletin-board/components/post-delete/PostDeleteClient";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/next-auth/authOptions";
import { BoardType } from "@/types/board";

type PageProps = {
  params: {
    board: BoardType;
    postid: string;
  };
};

export default async function DeleteConfirmPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  const { board, postid } = params; // post title

  return (
    <section className="items-center justify-center gap-4">
      <h1>게시물을 삭제하시겠습니까?</h1>
      {/* Actual delete api call happens here */}
      <PostDeleteClient session={session} boardType={board} postid={postid} />
    </section>
  );
}
