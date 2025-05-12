"use client";

// EditorClient.tsx
// : wrapper of the Text Editor components for "creating" and "updating" posts

// [UI]
// - title input
// - text editor (reactquill)
// - announcement checkbox (admin) | submit button

import React from "react";
import { Radio, RadioGroup } from "@nextui-org/react";

// sub-ui components
import PostTitleInput from "./PostTitleInput";
import AnnouncementCheckbox from "./AnnouncementCheckbox";
import PostSubmitButton from "./PostSubmitButton";
import TextEditor from "@/features/bulletin-board/components/shared/TextEditor";
import { LoadingSpinner, NotAuthorized } from "@/components/ui/feedback";

// utils
import { isAnnouncementBoard } from "@/utils/formats/boardType";
import { cn } from "@/utils/styles/cn";
import useAdmin from "@/lib/next-auth/useAdmin";
import { usePostEditorForm } from "@/features/bulletin-board/hooks/usePostEditorForm";

export default function PostEditor({
  session,
  boardType,
  curPostId = null,
  mode,
}) {
  const { isAdmin, status: adminStatus } = useAdmin();

  // Use custom hook for form state and logic
  const {
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
  } = usePostEditorForm({
    session,
    boardType,
    curPostId,
    mode,
  });

  // Exception Handling -------------------------------------------------------
  if (adminStatus === "loading") {
    return <LoadingSpinner />;
  }
  if (isAnnouncementBoard(boardType) && isAdmin === false) {
    return <NotAuthorized />;
  }
  // ---------------------------------------------------------------------------
  return (
    <div className="flex flex-col h-full gap-4">
      <PostTitleInput title={title} setTitle={setTitle} />
      {isAdmin !== null && (
        <TextEditor token={session?.token} text={text} setText={setText} />
      )}

      <div
        className={`flex
      ${isAdmin ? "w-full justify-between" : "justify-end"}
      mt-20 md:mt-12`}
      >
        <div
          className="flex flex-row items-center 
        gap-4 sm:gap-8"
        >
          {isAdmin && (
            <AnnouncementCheckbox
              isBoardAnnouncement={isAnnouncementBoard(boardType)}
              isAnnouncement={isAnnouncement}
              setIsAnnouncement={setIsAnnouncement}
            />
          )}
          {/* If isEveryKisa, show anonymous checkbox options */}
          {isEveryKisa && mode === "create" && (
            <RadioGroup
              className="flex gap-1"
              orientation="horizontal"
              defaultValue="none"
              value={anonymousValue}
              onValueChange={setAnonymousValue}
            >
              <Radio value="anonymous">익명</Radio>
              <Radio value="non-anonymous">실명</Radio>
              <Radio
                value="none"
                classNames={{
                  base: cn("hidden"),
                }}
              >
                선택 안함
              </Radio>
            </RadioGroup>
          )}
        </div>

        <PostSubmitButton
          disabled={isSubmitBtnDisabled}
          token={session?.token}
          mode={mode}
          postid={mode === "create" ? null : curPostId}
          formData={formData}
        />
      </div>
    </div>
  );
}
