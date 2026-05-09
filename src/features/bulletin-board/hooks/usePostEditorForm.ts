"use client";

import { useEffect } from "react";
import { useForm } from "@umichkisa-ds/form";

import { usePost } from "@/apis/posts/swrHooks";
import { isEveryKisaBoard } from "@/utils/formats/boardType";
import { BoardType } from "@/types/board";
import { NewPostBody, UpdatePostBody } from "@/types/post";

export interface PostEditorFormValues {
  title: string;
  text: string;
  isAnnouncement: boolean;
  /** Only meaningful when mode === "create" && isEveryKisaBoard(boardType). */
  anonymous: string;
}

interface UsePostEditorFormProps {
  userName: string;
  userEmail: string;
  boardType: string;
  curPostId?: number | null;
  mode: "create" | "update";
}

type PostEditorForm = ReturnType<typeof useForm<PostEditorFormValues>>;

export function usePostEditorForm({
  userName,
  userEmail,
  boardType,
  curPostId = null,
  mode,
}: UsePostEditorFormProps): {
  form: PostEditorForm;
  isEveryKisa: boolean;
  buildPayload: (values: PostEditorFormValues) => NewPostBody | UpdatePostBody;
} {
  const isEveryKisa = isEveryKisaBoard(boardType);

  const form = useForm<PostEditorFormValues>({
    mode: "onTouched",
    defaultValues: {
      title: "",
      text: "",
      isAnnouncement: false,
      anonymous: "non-anonymous",
    },
  });

  // Hydrate form when editing — SWR dedups + caches across remounts.
  const { post } = usePost(
    mode === "update" && curPostId ? Number(curPostId) : 0,
  );

  useEffect(() => {
    if (mode !== "update" || !post) return;
    form.reset({
      title: post.title ?? "",
      text: post.text ?? "",
      isAnnouncement: !!post.isAnnouncement,
      anonymous: "non-anonymous",
    });
    // form.reset is referentially stable per RHF
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post, mode]);

  // Mode-aware payload mapping (preserves the original ternary verbatim).
  const buildPayload = (
    values: PostEditorFormValues,
  ): NewPostBody | UpdatePostBody =>
    mode === "create"
      ? {
          type: boardType as BoardType,
          title: values.title,
          fullname: userName,
          email: userEmail,
          text: values.text,
          isAnnouncement: values.isAnnouncement,
          anonymous: isEveryKisa ? values.anonymous === "anonymous" : false,
          readCount: 0,
        }
      : {
          type: boardType as BoardType,
          title: values.title,
          text: values.text,
          isAnnouncement: values.isAnnouncement,
        };

  return { form, isEveryKisa, buildPayload };
}
