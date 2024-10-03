// GET API Axios calls
// starting with "/boards" endpoint

// TODO: add some types

import client from "@/lib/axios/client";
import { BoardType } from "@/types/board";

/**
 * @desc  Fetch board data
 * @route GET /boards/{boardType}/posts/?size={size}&page={page}
 */
export async function getBoardPosts(
  boardType: BoardType,
  size: number,
  page: number
) {
  const url = `/boards/${boardType}/posts/?size=${size}&page=${page}`;
  try {
    const response = await client.get(url);

    return response?.data;
  } catch (error) {
    console.log(error);
    return;
  }
}

/**
 * @desc Fetch the number of posts in a board
 * @route GET /boards/{boardType}/count/
 */
export async function getBoardPostNum(boardType: BoardType) {
  const url = `/boards/${boardType}/count/`;
  try {
    const response = await client.get(url);

    return response?.data;
  } catch (error) {
    console.log(error);
    return;
  }
}

/**
 * @desc Fetch the announcements in a board
 * @route GET /boards/{boardType}/announcements/
 */
export async function getBoardAnnouncements(boardType: BoardType) {
  const url = `/boards/${boardType}/announcements/`;
  try {
    const response = await client.get(url);
    return response?.data?.results;
  } catch (error) {
    console.log(error);
    return;
  }
}
