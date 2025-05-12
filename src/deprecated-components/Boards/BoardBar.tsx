"use client";

import React from "react";
import { useRouter } from "next/navigation";
import BoardTitle from "./BoardTitle";
import CutomButton from "@/deprecated-components/shared/CutomButton";
import PencilIcon from "@/deprecated-components/ui/PencilIcon";

type BoardBarProps = {
  boardType: string;
};

export default function BoardBar({ boardType }: BoardBarProps) {
  const router = useRouter();

  function handleCreatePostClick() {
    router.push(`/posts/create/${boardType}`);
  }

  return (
    <div className="self-stretch flex items-center justify-between">
      <BoardTitle boardType={boardType} />
      <CutomButton
        onClick={handleCreatePostClick}
        beforeIcon={<PencilIcon />}
        btnText="글쓰기"
      />
    </div>
  );
}
