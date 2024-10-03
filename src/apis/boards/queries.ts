// GET API Axios calls
// starting with "/boards" endpoint

import client from "@/lib/axios/client";
import { BoardType } from "@/types/board";
import { SimplePost } from "@/types/post";

/**
 * @desc  Fetch board data
 * @route GET /boards/{boardType}/posts/?size={size}&page={page}
 */
export async function getBoardPosts(
  boardType: BoardType,
  size: 10 | 20 | 30,
  page: number
): Promise<SimplePost[] | undefined> {
  // NOTE: page is 0-indexed

  const url = `/boards/${boardType}/posts/?size=${size}&page=${page}`;
  try {
    const response = await client.get(url);

    return response?.data?.results;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

/**
 * @desc Fetch the announcements in a board
 * @route GET /boards/{boardType}/announcements/
 */
export async function getBoardAnnouncements(
  boardType: BoardType
): Promise<SimplePost[] | undefined> {
  const url = `/boards/${boardType}/announcements/`;
  try {
    const response = await client.get(url);
    return response?.data?.results;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

/**
 * @desc Fetch the number of posts in a board
 * @route GET /boards/{boardType}/count/
 */
export async function getBoardPostNum(
  boardType: BoardType
): Promise<number | undefined> {
  const url = `/boards/${boardType}/count/`;
  try {
    const response = await client.get(url);

    return response?.data?.postCount;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
