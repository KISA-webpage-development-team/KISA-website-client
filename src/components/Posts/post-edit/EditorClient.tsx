"use client";

// EditorClient.tsx
// : wrapper of the Text Editor components for "creating" and "updating" posts

// [UI]
// - title input
// - text editor (reactquill)
// - checkboxes (admin) | submit button

import React, { useEffect, useState } from "react";
import { EditorClientProps } from "../../../model/props/posts";
import { useSession } from "next-auth/react";

// sub-ui components
import NotLoginModal from "../../shared/NotLoginModal";
import TitleInput from "./TitleInput";
import TextEditor from "./TextEditor";
import CheckBoxes from "./CheckBoxes";
import PostSubmitButton from "./PostSubmitButton";
import { CustomSession } from "../../../model/common/types";
import {
  getBoardName,
  getBoardNameFromKorean,
} from "../../../config/boardName";
import { useAdmin } from "../../../service/auth";

export default function EditorClient({
  boardType,
  curPost,
  mode,
}: EditorClientProps) {
  const { data: session, status } = useSession() as {
    data: CustomSession | null;
    status: string;
  };

  // admin state
  // const [isAdmin, setIsAdmin] = useState<boolean>();
  const { isAdmin, isLoading, isError } = useAdmin(
    session?.user.email,
    session?.token
  );

  // form states
  const [title, setTitle] = useState<string>(curPost?.title || "");
  const [text, setText] = useState<string>(curPost?.text || "");
  const [isAnnouncement, setIsAnnouncement] = useState<boolean>(
    curPost?.isAnnouncement || false
  );

  // form states for announcement board
  const [announcementTag, setAnnouncementTag] = useState<string>("");
  const [customTag, setCustomTag] = useState<string>("");
  // set initial tags
  useEffect(() => {
    const setInitialTag = () => {
      if (mode === "create") return "";
      const tag = curPost?.title.startsWith("[")
        ? curPost?.title.split("]")[0].slice(1)
        : "";

      if (getBoardNameFromKorean(tag) === "none") {
        setCustomTag(tag);
      } else {
        setAnnouncementTag(getBoardNameFromKorean(tag));
      }
    };
    setInitialTag();
  }, []);

  // submit button state
  const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState<boolean>(true);

  // submit button validation -------------------------------------------------
  useEffect(() => {
    if (title?.length === 0) {
      setIsSubmitBtnDisabled(true);
      return;
    }
    if (text?.length === 0 || text === "<p><br></p>") {
      setIsSubmitBtnDisabled(true);
      return;
    }
    if (
      boardType === "announcement" &&
      announcementTag === "" &&
      customTag === ""
    ) {
      setIsSubmitBtnDisabled(true);
      return;
    } else {
      setIsSubmitBtnDisabled(false);
      return;
    }
  }, [title, text, announcementTag, customTag, boardType]);

  useEffect(() => {
    if (text === "") setIsSubmitBtnDisabled(true);
  }, [text]);
  // ---------------------------------------------------------------------------

  // Exception Handling -------------------------------------------------------
  // 1) if user is not logged in
  if (status === "unauthenticated" || session?.token === null) {
    // force user to login
    return <NotLoginModal />;
  }

  // 2) if admin state is not yet fetched
  if (isLoading) {
    // [TODO] loading spinner
    return <div>Loading...</div>;
  }

  // 3) if there is an error
  if (isError) {
    // error handling
    return <div>Error!</div>;
  }
  // 4) if boardType is announcement and user is not admin
  if (status !== "loading" && boardType === "announcement" && !isAdmin) {
    return <div>권한이 없습니다.</div>;
  }

  // ---------------------------------------------------------------------------
  return (
    <div className="flex flex-col h-full gap-4">
      <TitleInput title={title} setTitle={setTitle} />
      <TextEditor isAdmin={isAdmin} text={text} setText={setText} />
      <div
        className={`flex
      ${isAdmin ? "w-full justify-between" : "justify-end"}
      mt-20 md:mt-12`}
      >
        {isAdmin && (
          <CheckBoxes
            isBoardAnnouncement={boardType === "announcement"}
            isAnnouncement={isAnnouncement}
            setIsAnnouncement={setIsAnnouncement}
            announcementTag={announcementTag}
            setAnnouncementTag={setAnnouncementTag}
            customTag={customTag}
            setCustomTag={setCustomTag}
          />
        )}
        <PostSubmitButton
          disabled={isSubmitBtnDisabled}
          token={session?.token}
          mode={mode}
          postid={mode === "create" ? null : curPost?.postid} // [TODO]: change post id for update mode
          formData={
            // when creating a post
            mode === "create"
              ? {
                  type: boardType,
                  title:
                    boardType !== "announcement"
                      ? `${title}`
                      : customTag === ""
                      ? `[${getBoardName(announcementTag)}] ${title}`
                      : `[${customTag}] ${title}`,
                  fullname: session?.user.name,
                  email: session?.user.email,
                  text: text,
                  isAnnouncement,
                  tag: customTag === "" ? announcementTag : "",
                }
              : // when updating a post
                {
                  title:
                    boardType !== "announcement"
                      ? `${title}`
                      : customTag === ""
                      ? `[${getBoardName(announcementTag)}] ${title}`
                      : `[${customTag}] ${title}`,
                  text: text,
                  isAnnouncement,
                  tag: customTag === "" ? announcementTag : "",
                }
          }
        />
      </div>
    </div>
  );
}

// [NOTE on rendering method]
// This component is fully CSR (Client-Side Rendering)
// It is like a "main" controller of the Editor component
// different states are handled here
// and passed down to the sub-ui component as props
