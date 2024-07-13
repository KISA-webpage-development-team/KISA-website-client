"use client";

import { CustomSession } from "@/refactor_src/shared/next-auth/types";
import useUserBoard from "../hooks/useUserBoard";
import React from "react";
import {
  CommentIcon,
  CustomToggleBar,
  ListIcon,
} from "@/refactor_src/shared/@common";
import {
  UserCommentsTable,
  UserPostsTable,
} from "@/refactor_src/entities/user";

type UserBoardProps = {
  email: string;
  session: CustomSession | null;
};

export function UserBoard({ email, session }: UserBoardProps) {
  const { activeView, setActiveView, posts, comments, isLoading, error } =
    useUserBoard(email, session.token);

  const userBoardViewList = [
    {
      view: "posts",
      text: "게시물",
      icon: <ListIcon />,
    },
    {
      view: "comments",
      text: "댓글",
      icon: <CommentIcon />,
    },
  ];

  // <Business Logic>
  // 로딩 상태나 에러가 발생했을시 아무것도 렌더링하지 않는다.
  if (isLoading || error) return <></>;

  return (
    <div className={`flex flex-col w-full`}>
      {/* 토글바: 게시물 / 댓글 */}
      <CustomToggleBar
        activeView={activeView}
        setActiveView={setActiveView}
        viewList={userBoardViewList}
      />

      {/* 게시물 목록 테이블 (mobile: 리스트) */}
      {activeView === "posts" && <UserPostsTable posts={posts} />}
      {activeView === "comments" && <UserCommentsTable comments={comments} />}
    </div>
  );
}
