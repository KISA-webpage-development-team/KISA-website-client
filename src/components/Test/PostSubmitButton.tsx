import React, { useState } from "react";
import {
  EditorMode,
  PostFormData,
  SimplePostFormData,
} from "./model/props/posts";
import { createPost, updatePost } from "../../service/post";
import { useRouter } from "next/navigation";

type Props = {
  disabled: boolean;
  token: string;
  mode: EditorMode;
  postid?: string; // only needed for update mode
  formData: SimplePostFormData | PostFormData;
};

export default function PostSubmitButton({
  disabled,
  token,
  mode,
  postid = "",
  formData,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const handleCreatePost = async () => {
    try {
      setLoading(true);
      const res = await createPost(formData, token);
      setLoading(false);

      router.push(`/boards/${(formData as PostFormData).type}`);
    } catch (error) {
      window.alert("게시글 작성에 실패했습니다.");
      return;
    }
  };

  const handleUpdatePost = async () => {
    try {
      setLoading(true);
      const res = await updatePost(postid, formData, token);
      setLoading(false);

      router.push(`/posts/${postid}`);
    } catch (error) {
      window.alert("게시글 수정에 실패했습니다.");
      return;
    }
  };

  return (
    <button
      disabled={disabled}
      className="w-1/4 h-10 blue_button"
      onClick={mode === "create" ? handleCreatePost : handleUpdatePost}
    >
      {loading ? "로딩 중..." : mode === "create" ? "등록" : "수정"}
    </button>
  );
}
