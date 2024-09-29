// GET API Axios calls
// starting with "/posts" endpoint

import { Post } from "@/types/post";
import client from "@/lib/axios/client";

/**
 * @desc Fetch a post with the given postid [TOKEN NOT REQUIRED]
 * @route GET /posts/:postid/
 */
export async function getPost(postid: string): Promise<Post | undefined> {
  const url = `/posts/${postid}/`;
  try {
    const response = await client.get(url);

    return response?.data;
  } catch (error) {
    console.log(error);
    return;
  }
}
