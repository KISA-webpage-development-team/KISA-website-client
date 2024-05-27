"use client";

// EditorClient.tsx
// : wrapper of the Text Editor components for "creating" and "updating" posts

// [UI]
// - title input
// - text editor (reactquill)
// - checkboxes (admin) | submit button

import React, { useEffect, useState } from "react";
import { EditorClientProps } from "./model/props/posts";
import { useSession } from "next-auth/react";

// sub-ui components
import NotLoginModal from "../shared/NotLoginModal";
import TitleInput from "./TitleInput";
import TextEditor from "./TextEditor";
import CheckBoxes from "./CheckBoxes";
import SubmitButton from "./SubmitButton";
import { getIsAdmin } from "../../service/user";
import { CustomSession } from "./model/common/types";

export default function EditorClient({ boardType, mode }: EditorClientProps) {
  const { data: session, status } = useSession() as {
    data: CustomSession | null;
    status: string;
  };

  // admin state
  const [isAdmin, setIsAdmin] = useState<boolean>();

  // form states
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isAnnouncement, setIsAnnouncement] = useState<boolean>(false);
  // form states for announcement board
  const [announcementTag, setAnnouncementTag] = useState<string>("");
  const [customTag, setCustomTag] = useState<string>("");

  // check if user is admin
  useEffect(() => {
    const fetchIsAdmin = async () => {
      try {
        const res = await getIsAdmin(session?.user.email, session?.token);
        setIsAdmin(res);
      } catch (error) {
        // error handling
        return;
      }
    };

    if (session) {
      fetchIsAdmin();
    }
  }, [session]);

  // handle submit functions
  const handleSubmit = () => {
    // [TODO] handle submit
    console.log("submit button clicked");
  };

  // Exception Handling -------------------------------------------------------
  // 1) if user is not logged in
  if (status === "unauthenticated") {
    // force user to login
    return <NotLoginModal />;
  }

  // 2) if admin state is not yet fetched
  if (isAdmin === undefined) {
    // [TODO] loading spinner
    return <div>Loading...</div>;
  }

  // 3) if boardType is announcement and user is not admin
  if (status !== "loading" && boardType === "announcement" && !isAdmin) {
    return <div>권한이 없습니다.</div>;
  }
  // ---------------------------------------------------------------------------

  return (
    <div
      className="flex flex-col h-full gap-4
   "
    >
      <TitleInput title={title} setTitle={setTitle} />

      <TextEditor isAdmin={isAdmin} content={content} setContent={setContent} />

      <div
        className={`flex
      ${isAdmin ? "w-full justify-between" : "justify-end"}
      mt-12`}
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
        <SubmitButton onClick={handleSubmit} mode={mode} />
      </div>

      <button
        className="simple_button"
        onClick={() => {
          console.log("title: ", title);
          console.log("content: ", content);
          console.log("isAdmin: ", isAdmin);
          console.log("isAnnouncement: ", isAnnouncement);
          console.log("announcementTag: ", announcementTag);
          console.log("customTag: ", customTag);
        }}
      >
        state checker
      </button>
    </div>
  );
}

// [NOTE on rendering method]
// This component is fully CSR (Client-Side Rendering)
// It is like a "main" controller of the Editor component
// different states and api calls are handled here
// and passed down to the sub-ui component as props
