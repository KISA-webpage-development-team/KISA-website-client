import { useState } from "react";
import { createPost, updatePost } from "@/apis/posts/mutations";
import { isEveryKisaBoard } from "@/utils/formats/boardType";
import { NewPostBody, UpdatePostBody } from "@/types/post";

interface UsePostSubmitProps {
  mode: "create" | "update";
  postid?: number | null;
  formData: NewPostBody | UpdatePostBody;
  token?: string;
}

export function usePostSubmit({
  mode,
  postid,
  formData,
  token,
}: UsePostSubmitProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (mode === "create") {
      try {
        setLoading(true);
        await createPost(formData as NewPostBody, token);
        setLoading(false);
        if (isEveryKisaBoard(formData.type)) {
          window.location.href = `/everykisa/${formData.type}`;
        } else {
          window.location.href = `/boards/${formData.type}`;
        }
      } catch (error) {
        window.alert("게시글 작성에 실패했습니다.");
        setLoading(false);
      }
    } else if (mode === "update") {
      if (!postid) {
        window.alert("게시글 수정에 실패했습니다.");
        return;
      }
      try {
        setLoading(true);
        await updatePost(postid, formData, token);
        setLoading(false);
        window.location.href = `/posts/${postid}`;
      } catch (error) {
        window.alert("게시글 수정에 실패했습니다.");
        setLoading(false);
      }
    }
  };

  return { loading, handleSubmit };
}
