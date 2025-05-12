"use client";

import React from "react";
import { useRouter } from "next/navigation";
import BoardTitle from "./BoardTitle";
import { CustomImageButton } from "@/components/ui/button";
import PencilIcon from "@/components/ui/icon/PencilIcon";

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
      <CustomImageButton
        type="primary"
        onClick={handleCreatePostClick}
        icon={<PencilIcon />}
        text="글쓰기"
        className="!py-1"
      />
    </div>
  );
}
