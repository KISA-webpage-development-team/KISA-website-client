// GET API Axios calls
// starting with "/comments" endpoint

import client from "@/lib/axios/client";
import { Comment } from "@/types/comment";

// something will be added here...

// need email from the response
export async function getCommentsByPostid(
  postid: number
): Promise<Comment[] | undefined> {
  const url = `/comments/${postid}/`;
  try {
    const response = await client.get(url);
    return response?.data;
  } catch (error) {
    //console.error(error);
    return undefined;
  }
}
