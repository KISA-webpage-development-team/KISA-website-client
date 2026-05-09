"use client";

import { toast } from "@umichkisa-ds/web";

import { createPost, updatePost } from "@/apis/posts/mutations";
import { isEveryKisaBoard } from "@/utils/formats/boardType";
import { NewPostBody, UpdatePostBody } from "@/types/post";

interface UsePostSubmitProps {
  mode: "create" | "update";
  postid?: number | null;
  token?: string;
  /**
   * Called with the destination href after a successful create/update. The
   * caller decides how to navigate (e.g. `next/navigation` `router.push`) so
   * we keep client cache + transitions instead of a hard reload.
   */
  onSuccess: (target: { href: string }) => void;
}

/**
 * Returns a `submit(payload)` function suitable for plugging into
 * react-hook-form's `handleSubmit` flow. Submitting state is owned by RHF
 * (`form.formState.isSubmitting`); this hook performs the network call,
 * surfaces toasts on failure, and delegates navigation to `onSuccess`.
 */
export function usePostSubmit({
  mode,
  postid,
  token,
  onSuccess,
}: UsePostSubmitProps) {
  const submit = async (payload: NewPostBody | UpdatePostBody) => {
    if (mode === "create") {
      try {
        await createPost(payload as NewPostBody, token);
        const href = isEveryKisaBoard(payload.type)
          ? `/everykisa/${payload.type}`
          : `/boards/${payload.type}`;
        onSuccess({ href });
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
        onSuccess({ href: `/posts/${postid}` });
      } catch (error) {
        toast.error("게시글 수정에 실패했습니다.");
        throw error;
      }
    }
  };

  return { submit };
}
