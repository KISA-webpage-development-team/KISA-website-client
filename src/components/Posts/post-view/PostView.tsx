"use client";

// [UI]
// 1. Post Title Bar: title + isAnnouncement
// 2. Post Owner Bar: fullname + created + readCount + commentsCount
// 3. Post Content: text
// 4. Edit + Delete + List Buttons

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

// types
import { PostViewProps } from "../../../model/props/posts";
import { CustomSession } from "../../../model/common/types";

// sub-ui components
import PostTitleBar from "./PostTitleBar";
import PostOwnerBar from "./PostOwnerBar";
import PostContent from "./PostContent";
import PostButtonBar from "./PostButtonBar";
import HorizontalDivider from "../../shared/HorizontalDivider";
import { CookiesProvider } from "react-cookie";
import { getCookie, setCookie } from "../../../utils/cookie";
import { incrementReadCount } from "../../../service/post";
import { set } from "react-hook-form";

export default function PostView({ post }: PostViewProps) {
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

  const [didRead, setDidRead] = useState(false);

  // read count
  // : when cookie doesn't exist, create one and increase read count (`incrementReadCount`)
  // if cookie exists, don't increase read count, but update the cookie expiration time
  useEffect(() => {
    const cookieHandler = () => {
      const cookieName = `read-${postid}`;

      const postReadCount = async () => {
        const res = await incrementReadCount(postid, session?.token);
        if (res === null) {
          console.log("Failed to increment read count");
        }
      };

      if (getCookie(cookieName) === undefined) {
        setCookie(cookieName, true, {
          path: "/",
          secure: true,
          maxAge: 60 * 60 * 24, // 1 day
        });
        setDidRead(true);

        postReadCount();
        return;
      } else {
        setCookie(cookieName, true, {
          path: "/",
          secure: true,
          maxAge: 60 * 60 * 24, // 1 day
        });
      }
    };

    if (session) {
      cookieHandler();
    }
  }, [session, postid]);

  if (status === "loading") {
    // [TODO]: add loading spinner or skeleton ui
    return <></>;
  }

  return (
    <CookiesProvider>
      <div className="w-full flex flex-col">
        {/* <HorizontalDivider color="grey" /> */}

        <div
          className="w-full flex flex-col
      pt-1 
      pb-2 gap-1"
        >
          {/* 1. Post Title Bar */}
          <PostTitleBar isAnnouncement={isAnnouncement} title={title} />
          {/* 2. Post Owner Bar */}
          <PostOwnerBar
            email={email}
            fullname={fullname}
            created={created}
            readCount={didRead ? Number(readCount) + 1 : readCount}
            commentsCount={commentsCount}
          />
        </div>

        <HorizontalDivider color="gray" />

        {/* 3. Post Content */}
        <PostContent text={text} />

        {/* 4. Post Buttons: Edit + Delete + List Buttons */}
        <PostButtonBar
          isAuthor={session?.user.email === email}
          type={type}
          postid={postid}
          title={title}
        />

        <HorizontalDivider />
      </div>
    </CookiesProvider>
  );
}
