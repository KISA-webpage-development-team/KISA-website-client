import { useState, useEffect } from "react";
import { getPost } from "@/apis/posts/queries";
import { isEveryKisaBoard } from "@/utils/formats/boardType";
import { NewPostBody, UpdatePostBody } from "@/types/post";
import { BoardType } from "@/types/board";

interface UsePostEditorFormProps {
  session: any;
  boardType: string;
  curPostId?: number | null;
  mode: "create" | "update";
}

export function usePostEditorForm({
  session,
  boardType,
  curPostId = null,
  mode,
}: UsePostEditorFormProps) {
  const isEveryKisa = isEveryKisaBoard(boardType);
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [isAnnouncement, setIsAnnouncement] = useState<boolean>(false);
  const [anonymousValue, setAnonymousValue] = useState<string>("none");
  const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState<boolean>(true);

  // Fetch initial post if editing
  useEffect(() => {
    const fetchInitialPost = async (postid: number) => {
      try {
        const res = await getPost(postid);
        setTitle(res.title);
        setText(res.text);
        setIsAnnouncement(res.isAnnouncement);
      } catch (error) {
        console.log("Error occured while fetching post: ", error);
      }
    };
    if (curPostId) {
      fetchInitialPost(curPostId);
    }
  }, [curPostId]);

  // Validation
  useEffect(() => {
    if (isEveryKisa && mode === "create" && anonymousValue === "none") {
      setIsSubmitBtnDisabled(true);
      return;
    }
    if (title?.length === 0) {
      setIsSubmitBtnDisabled(true);
      return;
    }
    if (text?.length === 0 || text === "<p><br></p>") {
      setIsSubmitBtnDisabled(true);
      return;
    }
    setIsSubmitBtnDisabled(false);
  }, [title, text, boardType, anonymousValue, isEveryKisa, mode]);

  useEffect(() => {
    if (text === "") setIsSubmitBtnDisabled(true);
  }, [text]);

  // formData for create/update
  const formData: NewPostBody | UpdatePostBody =
    mode === "create"
      ? {
          type: boardType as BoardType,
          title: title,
          fullname: session?.user.name,
          email: session?.user.email,
          text: text,
          isAnnouncement,
          anonymous: isEveryKisa ? anonymousValue === "anonymous" : false,
          readCount: 0,
        }
      : {
          type: boardType as BoardType,
          title: title,
          text: text,
          isAnnouncement,
        };

  return {
    title,
    setTitle,
    text,
    setText,
    isAnnouncement,
    setIsAnnouncement,
    anonymousValue,
    setAnonymousValue,
    isSubmitBtnDisabled,
    formData,
    isEveryKisa,
  };
}
