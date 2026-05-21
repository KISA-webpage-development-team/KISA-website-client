// PostView
// 1. Title bar (with announcement badge)
// 2. Owner bar (author + meta)
// 3. Body
// 4. Action bar (list / edit / delete / like)

import React from "react";

import { Divider } from "@umichkisa-ds/web";

import PostTitleBar from "./PostTitleBar";
import PostOwnerBar from "./PostOwnerBar";
import PostContent from "./PostContent";
import PostButtonBar from "./PostButtonBar";

import ReactCookieProvider from "@/lib/react-cookie/provider";

import { UserSession } from "@/lib/next-auth/types";
import { Post } from "@/types/post";

import usePostReadCount from "@/features/bulletin-board/hooks/usePostReadCount";

type PostViewProps = {
  post: Post;
  session: UserSession | null;
  isAdmin: boolean;
  /** When true, the delete confirm Dialog mounts open. */
  initialDeleteOpen?: boolean;
};

export default function PostView({
  post,
  session,
  isAdmin,
  initialDeleteOpen = false,
}: PostViewProps) {
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

  return (
    <ReactCookieProvider>
      <article className="flex w-full flex-col">
        <header className="flex flex-col gap-1 pb-4">
          <PostTitleBar isAnnouncement={isAnnouncement} title={title} />
          <PostOwnerBar
            email={email}
            fullname={fullname}
            created={created}
            readCount={didRead ? Number(readCount) + 1 : readCount}
            commentsCount={commentsCount}
            anonymous={anonymous}
            isOwnPost={session?.user?.email === email}
          />
        </header>

        <Divider />

        <PostContent text={text} />

        <PostButtonBar
          email={email}
          session={session}
          isAdmin={isAdmin}
          type={type}
          postid={postid}
          initialDeleteOpen={initialDeleteOpen}
        />
      </article>
    </ReactCookieProvider>
  );
}
