"use client";
// SWR hooks for GET API calls
// starting with "/boards" endpoint

// TODO: add some types
import useSWR, { SWRConfiguration } from "swr";
import { immutableOption } from "@/lib/swr/options";
import { BoardType } from "@/types/board";

/**
 * @desc  Fetch board data
 * @route GET /boards/{boardType}/posts/?size={size}&page={page}
 */
export function useBoardPosts(
  boardType: BoardType,
  size: number,
  page: number,
  options: SWRConfiguration = immutableOption
) {
  // - By adding immutableOption,
  // revalidation is disabled for board data that doesn't change frequently,
  // except when the page is refreshed.
  // - token is NOT required for the request

  const url = `/boards/${boardType}/posts/?size=${size}&page=${page}`;

  const { data, error, isLoading } = useSWR(url, options);

  return {
    posts: data?.results,
    isLoading,
    error: error,
  };
}

/**
 * @desc Fetch the number of posts in a board
 * @route GET /boards/{boardType}/count/
 */
export function useBoardPostNum(
  boardType: BoardType,
  options: SWRConfiguration = immutableOption
) {
  // - By adding immutableOption,
  // revalidation is disabled for board data that doesn't change frequently,
  // except when the page is refreshed.
  // - token is NOT required for the request

  const url = `/boards/${boardType}/count/`;

  const { data, error, isLoading } = useSWR(url, options);

  return {
    postNum: data?.postCount as number | null,
    isLoading,
    error: error,
  };
}
