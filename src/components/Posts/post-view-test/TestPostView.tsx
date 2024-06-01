"use client";

// [UI]
// 1. Post Title Bar: title + isAnnouncement
// 2. Post Owner Bar: fullname + created + readCount + commentsCount
// 3. Post Content: text
// 4. Edit + Delete + List Buttons

import React from "react";
import { PostViewProps } from "../../../model/props/posts";
import PostTitleBar from "../post-view/PostTitleBar";
import HorizontalDivider from "../../shared/HorizontalDivider";
import PostOwnerBar from "../post-view/PostOwnerBar";
import PostContent from "../post-view/PostContent";
import TestPostButtonBar from "./TestPostButtonBar";
import { CustomSession } from "../../../model/common/types";
import { useSession } from "next-auth/react";

export default function TestPostView({ post }: PostViewProps) {
  const { data: session, status } = useSession() as {
    data: CustomSession | null;
    status: string;
  };

  const {
    postid,
    type,
    title,
    text,
    isAnnouncement,
    email,
    fullname,
    created,
    readCount,
    commentsCount,
  } = post;

  if (status === "loading") {
    // [TODO]: add loading spinner or skeleton ui
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex flex-col">
      {/* <HorizontalDivider color="grey" /> */}

      <div
        className="w-full flex flex-col
      pt-1 
      pb-2 sm:pb-3 gap-1"
      >
        {/* 1. Post Title Bar */}
        <PostTitleBar isAnnouncement={isAnnouncement} title={title} />
        {/* 2. Post Owner Bar */}
        <PostOwnerBar
          email={email}
          fullname={fullname}
          created={created}
          readCount={readCount}
          commentsCount={commentsCount}
        />
      </div>

      <HorizontalDivider color="gray" />

      {/* 3. Post Content */}
      <PostContent text={text} />

      {/* 4. Post Buttons: Edit + Delete + List Buttons */}
      <TestPostButtonBar
        isAuthor={session?.user.email === email}
        type={type}
        postid={postid}
        title={title}
      />

      <HorizontalDivider />
    </div>
  );
}
