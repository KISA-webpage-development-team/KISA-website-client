import React, { ChangeEvent, useState } from "react";
import { CommentEditorProps } from "../../../model/props/posts";
import { createComment, updateComment } from "@/apis/comments/mutations";

export default function CommentEditor({
  mode,
  session,
  postid,
  commentid = 0,
  curCommentId = null,
  placeholder = "댓글을 입력해주세요",
  setCommentsStale,
  setOpenCommentEditor = () => {},
}: CommentEditorProps) {
  const [text, setText] = useState<string>(
    placeholder === "댓글을 입력해주세요" ? "" : placeholder
  ); // comment content
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // states to prevent multiple key inputs at the same time

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value);

  const handleSubmitComment = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    // 일반 댓글 + 답글
    const data = {
      email: session?.user.email,
      fullname: session?.user.name,
      text: text,
      isCommentOfComment: commentid === 0 ? false : true,
      parentCommentid: commentid,
      anonymous: false,
    };
    // send post api call to create comment with postid
    const res = await createComment(postid, data, session?.token);

    if (res) {
      // modify states after new comment has been submitted
      setCommentsStale(true);
      setOpenCommentEditor(false);
      setText("");
      setIsSubmitting(false);
    } else {
      // error handling
      console.log("comment creation failed");
    }
  };

  const handleSubmitUpdate = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    // send update api call
    const data = {
      text: text,
    };

    const res = await updateComment(curCommentId, data, session?.token);
    if (res) {
      setCommentsStale(true);
      setOpenCommentEditor(false);
      setIsSubmitting(false);
    } else {
      // error handling
      console.log("comment update failed");
    }
  };

  return (
    <div
      className="flex flex-col sm:flex-row 
    items-end sm:items-center w-full "
    >
      <textarea
        value={text}
        onChange={handleTextChange}
        className="w-full h-20 md:h-28
             border border-gray-300 rounded-md p-3
              text-sm md:text-base
              focus:outline-michigan-blue"
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target === document.activeElement) {
            e.preventDefault();
            if (mode === "update") {
              handleSubmitUpdate();
            } else {
              handleSubmitComment();
            }
          }
        }}
      />
      <button
        disabled={text.length === 0}
        onClick={mode === "update" ? handleSubmitUpdate : handleSubmitComment}
        className="block h-full sm:h-20 md:h-28 md:aspect-square rounded-md 
        mt-1 sm:mt-0
        text-xs sm:text-sm md:text-base 
        !px-3 !py-1 sm:!px-4 sm:!py-2
        blue_button"
      >
        {isSubmitting ? "등록 중..." : "댓글 등록"}
      </button>
    </div>
  );
}
