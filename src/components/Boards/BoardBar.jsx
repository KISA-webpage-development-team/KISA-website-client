"use client";

import React from "react";
import { useRouter } from "next/navigation";
import BoardTitle from "./BoardTitle";
import CutomButton from "../shared/CutomButton";
import PencilIcon from "../ui/PencilIcon";

export default function BoardBar({ boardType }) {
  const router = useRouter();

  function handleCreatePostClick() {
    router.push(`/posts/create/${boardType}`);
  }

  return (
    <div className="w-full flex items-center justify-between">
      <BoardTitle boardType={boardType} />
      <CutomButton
        onClick={handleCreatePostClick}
        beforeIcon={<PencilIcon />}
        btnText="글쓰기"
      />
    </div>
  );
}
