// [UI]
// 1. Post Title Bar: title + isAnnouncement
// 2. Post Owner Bar: fullname + created + readCount + commentsCount
// 3. Post Content: text
// 4. Edit + Delete + List Buttons

import React from "react";

// sub-ui components
import PostTitleBar from "./PostTitleBar";
import PostOwnerBar from "./PostOwnerBar";
import PostContent from "./PostContent";
import PostButtonBar from "./PostButtonBar";

// TODO: final_refactor_src -> @components
import { LoadingSpinner } from "@/components/ui/feedback";
import { HorizontalDivider } from "@/components/ui/divider";

// Libs
import ReactCookieProvider from "@/lib/react-cookie/provider";
import { useSession } from "next-auth/react";

// types
import { UserSession } from "@/lib/next-auth/types";
import { Post } from "@/types/post";

// hooks
import usePostReadCount from "@/features/bulletin-board/hooks/usePostReadCount";

type PostViewProps = {
  post: Post;
};

export default function PostView({ post }: PostViewProps) {
  const { data: session, status } = useSession() as {
    data: UserSession | null;
    status: string;
  };

  const didRead = usePostReadCount(post.postid);

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
    anonymous,
  } = post;

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <ReactCookieProvider>
      <div className="w-full flex flex-col self-stretch">
        <div
          className="w-full flex flex-col 
        pt-1 pb-2 gap-1"
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
            anonymous={anonymous}
          />
        </div>

        <HorizontalDivider color="gray" />

        {/* 3. Post Content */}
        <PostContent text={text} />

        {/* 4. Post Buttons: Edit + Delete + List Buttons */}
        <PostButtonBar
          email={email}
          session={session}
          type={type}
          postid={postid}
        />

        <HorizontalDivider />
      </div>
    </ReactCookieProvider>
  );
}
