"use client";

import { toast } from "@umichkisa-ds/web";

import { createPost, updatePost } from "@/apis/posts/mutations";
import { isEveryKisaBoard } from "@/utils/formats/boardType";
import { NewPostBody, UpdatePostBody } from "@/types/post";

interface UsePostSubmitProps {
  mode: "create" | "update";
  postid?: number | null;
  token?: string;
}

/**
 * Returns a `submit(payload)` function suitable for plugging into
 * react-hook-form's `handleSubmit` flow. Submitting state is owned by RHF
 * (`form.formState.isSubmitting`); this hook only performs the network call,
 * surfaces toasts on failure, and navigates on success.
 */
export function usePostSubmit({ mode, postid, token }: UsePostSubmitProps) {
  const submit = async (payload: NewPostBody | UpdatePostBody) => {
    if (mode === "create") {
      try {
        await createPost(payload as NewPostBody, token);
        if (isEveryKisaBoard(payload.type)) {
          window.location.href = `/everykisa/${payload.type}`;
        } else {
          window.location.href = `/boards/${payload.type}`;
        }
      } catch (error) {
        toast.error("게시글 작성에 실패했습니다.");
        throw error;
      }
    } else {
      if (!postid) {
        toast.error("게시글 수정에 실패했습니다.");
        return;
      }
      try {
        await updatePost(Number(postid), payload, token);
        window.location.href = `/posts/${postid}`;
      } catch (error) {
        toast.error("게시글 수정에 실패했습니다.");
        throw error;
      }
    }
  };

  return { submit };
}
