"use client";

import React from "react";
import { useRouter } from "next/navigation";
import PostSearchBar from "./PostSearchBar";
import CreatePostButton from "./CreatePostButton";

export default function BoardBar({ boardType }) {
  const router = useRouter();

  function handleCreatePostClick() {
    router.push(`/posts/create/${boardType}`);
  }

  return (
    <div className="flex items-center justify-between">
      <PostSearchBar />
      <CreatePostButton onClick={handleCreatePostClick} />
    </div>
  );
}
