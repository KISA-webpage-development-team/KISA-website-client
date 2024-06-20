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
import TestMobileBoardTable from "./TestMobileBoardTable";
import PaginationSizeSelector from "./PaginationSizeSelector";

// [NOTE] page is still 1-indexing here
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
  } = useBoardPosts(boardType, size, page - 1);
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
    <div className={`flex flex-col gap-4 ${heebo.className}`}>
      {/* TABLE */}
      <div className="hidden md:block">
        <TestBoardTable
          postStartIdx={totalPostNum - size * (page - 1)}
          posts={posts}
          annoucements={page === 1 ? announcements : null}
        />
      </div>
      <div className="block md:hidden">
        <TestMobileBoardTable
          posts={posts}
          annoucements={page === 1 ? announcements : null}
        />
      </div>

      {/* PAGINATION BAR */}

      <PaginationSizeSelector
        totalPageNum={
          Math.ceil(totalPostNum / size) === 0
            ? 1
            : Math.ceil(totalPostNum / size)
        }
        pageNum={page}
        totalPostNum={totalPostNum}
        pageSize={size}
      />
    </div>
  );
}
