"use client";

import React from "react";
import { useRouter } from "next/navigation";
import PostSearchBar from "./PostSearchBar";
import CreatePostButton from "./CreatePostButton";
import BoardTitle from "./BoardTitle";

export default function BoardBar({ boardType }) {
  const router = useRouter();

  function handleCreatePostClick() {
    router.push(`/posts/create/${boardType}`);
  }

  return (
    <div
      className="
    w-full flex items-center justify-between"
    >
      <BoardTitle boardType={boardType} />
      <CreatePostButton onClick={handleCreatePostClick} />
    </div>
  );
}
