"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { deletePost } from "@/apis/posts/mutations";

// sub-ui components
import CustomImageButton from "@/components/ui/button/CustomImageButton";
import TrashcanIcon from "@/components/ui/icon/TrashcanIcon";
import PencilIcon from "@/components/ui/icon/PencilIcon";
import { isEveryKisaBoard } from "@/utils/formats/boardType";

export default function PostDeleteClient({ session, boardType, postid }) {
  const router = useRouter();

  const onClickPostDeleteCancel = () => {
    router.push(`/posts/${postid}`);
  };

  const onClickPostDeleteConfirm = async () => {
    const res = await deletePost(postid, session?.token);
    if (res) {
      // Updated status code to represent successful deletion
      // need to fix: should go remember its board name
      if (isEveryKisaBoard(boardType)) {
        window.location.href = `/everykisa/${boardType}`;
      } else {
        window.location.href = `/board/${boardType}`;
      }
      return;
    } else {
      window.alert("게시글 삭제에 실패했습니다.");
      // console.error(res);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <CustomImageButton
        type="secondary"
        icon={<PencilIcon color="gray" />}
        text="취소"
        onClick={onClickPostDeleteCancel}
      />
      <CustomImageButton
        type="secondary"
        icon={<TrashcanIcon color="gray" />}
        text="삭제"
        onClick={onClickPostDeleteConfirm}
      />
    </div>
  );
}
