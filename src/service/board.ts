import { BoardType } from "../model/common/types";
import { SimplePost } from "../model/props/posts";
import client from "../config/axios";

// [DEPRECATED]
export async function getBoardPosts(
  boardType: BoardType,
  size: number,
  page: number
): Promise<SimplePost[]> {
  // page is 0-indexed
  // need email address from response
  const url = `/boards/${boardType}/posts/?size=${size}&page=${page}/`;
  try {
    const response = await client.get(url);
    console.log("post fetched");
    return response.data;
  } catch (error) {
    // console.error(error);
    return;
  }
}

export async function getBoardAnnouncements(
  boardType: BoardType
): Promise<SimplePost[]> {
  if (boardType === "announcement") return [];

  const url = `/boards/${boardType}/announcements/`;
  try {
    const response = await client.get(url);
    return response?.data?.results;
  } catch (error) {
    // //console.error(error);
    return;
  }
}

// get the number of posts in a board for pagination
// res: { postCount: integer}
export async function getBoardPostNum(boardType) {
  const url = `/boards/${boardType}/count/`;
  try {
    const response = await client.get(url);
    return response.data;
  } catch (error) {
    // //console.error(error);
    return;
  }
}
