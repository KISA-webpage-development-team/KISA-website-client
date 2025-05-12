import React from "react";

// hooks
import { usePostSubmit } from "@/features/bulletin-board/hooks/usePostSubmit";

// types
import { NewPostBody, UpdatePostBody } from "@/types/post";
import { CustomButton } from "@/components/ui/button";

interface PostSubmitButtonProps {
  disabled: boolean;
  token: string | undefined;
  mode: "create" | "update";
  postid: number | null;
  formData: NewPostBody | UpdatePostBody;
}

export default function PostSubmitButton({
  disabled,
  token,
  mode,
  postid,
  formData,
}: PostSubmitButtonProps) {
  const { handleSubmit, loading } = usePostSubmit({
    mode,
    postid,
    formData,
    token,
  });

  return (
    <CustomButton
      type="primary"
      disabled={disabled || loading}
      onClick={handleSubmit}
      className="w-1/4 h-10 text-sm md:text-base"
      text={loading ? "로딩 중..." : mode === "create" ? "등록" : "수정"}
    />
  );
}
