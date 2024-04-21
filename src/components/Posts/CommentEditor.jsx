"use client";

// Editor for Comment
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import NotLoginModal from "../shared/NotLoginModal";
import { useRouter } from "next/navigation";
import { createComment, updateComment } from "../../service/comment";
import { set } from "react-hook-form";

export default function CommentEditor({
  postid,
  setCommentsStale,
  setOpenCommentEditor,
  curComment = null,
  commentid = 0,
  mode = "create",
  placeholder = "",
}) {
  // if curPost is not null, then it is update mode

  // get user session
  const { data: session, status } = useSession();
  // router
  const router = useRouter();

  // states to prevent multiple key inputs at the same time
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [text, setText] = useState(
    curComment?.text || placeholder === "" ? "" : placeholder
  ); // comment content

  const handleTextChange = (e) => {
    setText(e.currentTarget.value);
  };

  const handleSumbit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    if (mode === "update") {
      // send update api call instead of create call
      const data = {
        text: text,
      };

      const res = await updateComment(curComment, data, session?.token);
      if (res) {
        console.log("Data submitted: ", data);

        // modify states after new comment has been submitted
        setCommentsStale(true);
        setOpenCommentEditor(false);

        setIsSubmitting(false);

        console.log("comment update success");
      } else {
        // error handling
        console.log("comment update failed");
      }
    } else {
      // 일반 댓글
      const data = {
        email: session?.user.email,
        fullname: session?.user.name,
        text: text,
        isCommentOfComment: commentid === 0 ? false : true,
        parentCommentid: commentid,
      };
      console.log("data: ", data);
      // send post api call to create comment with postid
      const res = await createComment(postid, data, session?.token);

      if (res) {
        console.log("Data submitted: ", data);

        // modify states after new comment has been submitted
        setCommentsStale(true);
        setOpenCommentEditor(false);

        setIsSubmitting(false);

        console.log("comment creation success");
      } else {
        // error handling
        console.log("comment creation failed");
      }
    }
  };

  if (status === "unauthenticated") {
    // force user to login
    return <NotLoginModal />;
  }

  return (
    <>
      <div className="flex items-center w-full mt-3">
        {/* Text Editor */}
        <div className="grow text-sm md:text-base ">
          {mode === "create" ? (
            <input
              type="text"
              value={text}
              onChange={handleTextChange}
              className="w-full h-16 md:h-20 border border-gray-300 rounded-md p-2
              focus:outline-michigan-blue"
              placeholder="댓글을 입력해주세요"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target === document.activeElement) {
                  e.preventDefault();
                  handleSumbit();
                }
              }}
            />
          ) : mode === "update" ? (
            <input
              type="text"
              value={text}
              onChange={handleTextChange}
              className="w-full h-16 md:h-20 border border-gray-300 rounded-md p-2
              focus:outline-michigan-blue"
              placeholder={placeholder}
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target === document.activeElement) {
                  e.preventDefault();
                  handleSumbit();
                }
              }}
            />
          ) : (
            // mode: reply
            <input
              type="text"
              value={text}
              onChange={handleTextChange}
              className="w-full h-16 md:h-20 border border-gray-300 rounded-md p-2 
              focus:outline-michigan-blue"
              placeholder="댓글을 입력해주세요"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target === document.activeElement) {
                  e.preventDefault();
                  handleSumbit();
                }
              }}
            />
          )}
        </div>

        <button
          className="ml-5 
          p-3
          bg-michigan-blue  text-michigan-maize hover:text-white
          rounded-md cursor-pointer text-xs after:sm:text-sm md:text-base"
          onClick={handleSumbit}
          disabled={isSubmitting}
        >
          댓글등록
        </button>
      </div>
      {/* Submit Button */}
    </>
  );
}
