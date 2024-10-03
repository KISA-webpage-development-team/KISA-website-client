"use client";

// [UI]
// 1. comment count
// 2. default comment editor to add direct comment on the post
// 3. comment list

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getCommentsByPostid } from "@/apis/comments/queries";

// sub-ui components
import CommentEditor from "./CommentEditor";
import CommentsList from "./CommentsList";

// types
import { CustomSession } from "../../../model/common/types";
import { Comment, CommentsViewProps } from "../../../model/props/posts";

export default function CommentsView({
  commentsCount,
  postid,
}: CommentsViewProps) {
  const { data: session, status } = useSession() as {
    data: CustomSession | null;
    status: string;
  };

  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsStale, setCommentsStale] = useState<boolean>(true); // keep comments up-to-date

  // fetch comments to keep comments up-to-date
  useEffect(() => {
    const getComments = async () => {
      const comments_res = await getCommentsByPostid(postid);
      setComments(comments_res);
      setCommentsStale(false);
      return;
    };

    if (commentsStale) getComments();
  }, [commentsStale, postid]);

  if (status === "loading") {
    // [TODO]: add loading spinner or skeleton ui
    return <></>;
  }

  return (
    <div className="flex flex-col py-4 gap-2 self-stretch">
      {/* 1. comment count */}
      {/* [TODO] post의 commentsCount를 상시 업데이트하지 못하고 있음. */}
      <p className="text-sm md:text-base">{`댓글 ${commentsCount}개`}</p>
      {/* 2. default comment editor to add direct comment on the post */}
      {status === "authenticated" && (
        <CommentEditor
          mode="create"
          session={session}
          postid={postid}
          setCommentsStale={setCommentsStale}
        />
      )}

      {/* 3. comment list */}
      <CommentsList
        comments={comments}
        session={session}
        setCommentsStale={setCommentsStale}
      />
      {/* <CommentsList commentsCount={commentsCount} comments={comments} /> */}
    </div>
  );
}
