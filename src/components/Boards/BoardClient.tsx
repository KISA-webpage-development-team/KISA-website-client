"use client";

import React from "react";
import { heebo } from "../../utils/fonts/textFonts";

import {
  useBoardPostNum,
  useBoardPosts,
} from "../../service/swrHooks/boardHooks";

// types
import { SimplePost } from "../../model/props/posts";
import { BoardType } from "../../model/common/types";

// sub-ui components
import BoardTable from "./BoardTable";
import MobileBoardList from "./MobileBoardList";
import PaginationSizeSelector from "./PaginationSizeSelector";

// [NOTE] page is still 1-indexing here
type Props = {
  boardType: BoardType;
  announcements: SimplePost[];
  size: number;
  page: number;
};

export default function BoardClient({
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
    return <></>;
  }
  //   postsError.response.status === 404
  if (postsError || postNumError) {
    return <div>게시글을 불러오는데 실패했습니다</div>;
  }

  return (
    <div
      className={`
    flex flex-col gap-4 ${heebo.className}`}
    >
      {/* TABLE */}
      <div className="hidden md:block">
        <BoardTable
          postStartIdx={totalPostNum - size * (page - 1)}
          posts={posts}
          annoucements={page === 1 ? announcements : null}
        />
      </div>
      <div className="block md:hidden">
        <MobileBoardList
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
