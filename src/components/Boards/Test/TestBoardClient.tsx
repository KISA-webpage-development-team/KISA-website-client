"use client";

import React from "react";
import { SimplePost } from "../../../model/props/posts";
import { BoardType } from "../../../model/common/types";
import {
  useBoardPostNum,
  useBoardPosts,
} from "../../../service/swrHooks/boardHooks";
import { heebo } from "../../../utils/fonts/textFonts";
import TestBoardTable from "./TestBoardTable";

type Props = {
  boardType: BoardType;
  announcements: SimplePost[];
  size: number;
  page: number;
};

export default function TestBoardClient({
  boardType,
  announcements,
  size,
  page,
}: Props) {
  // Data Fetching from client side using custom useSWR hooks ----------------
  const {
    posts,
    isLoading: isPostsFetching,
    isError: postsError,
  } = useBoardPosts(boardType, size, page);
  const {
    postNum: totalPostNum,
    isLoading: isPostNumFetching,
    isError: postNumError,
  } = useBoardPostNum(boardType);
  // -----------------------------------------------

  if (isPostsFetching || isPostNumFetching) {
    return <div>Loading...</div>;
  }
  //   postsError.response.status === 404
  if (postsError || postNumError) {
    return <div>게시글을 불러오는데 실패했습니다</div>;
  }

  return (
    <div
      className={`
  flex flex-col gap-4  ${heebo.className}`}
    >
      <TestBoardTable
        postStartIdx={totalPostNum - size * page}
        posts={posts}
        announcementPosts={page === 1 ? announcements : null}
      />
    </div>
  );
}
