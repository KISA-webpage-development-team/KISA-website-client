// POST, PUT, PATCH, DELETE API calls for post

import client from "@/lib/axios/client";

type TokenType = string | null;

// Post --------------------------------------------------------------
/**
 * @desc  Create a post
 * @route POST /posts/
 */
export async function createPost(data, token: TokenType) {
  const url = `/posts/`;

  try {
    const response = await client.post(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.error(error);
    return;
  }
}

/**
 * @desc Update a post
 * @route PATCH /posts/:postid/
 */
export async function updatePost(postid, data, token: TokenType) {
  const url = `/posts/${postid}/`;
  try {
    const response = await client.patch(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    return;
  }
}

/**
 * @desc Delete a post
 * @route DELETE /posts/:postid/
 */
export async function deletePost(postid, token: TokenType) {
  const url = `/posts/${postid}/`;
  try {
    const response = await client.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return;
  }
}

// Post: Read Count --------------------------------------------------------------
/**
 * @desc Increase the read count of a post
 * @route PATCH /posts/readCount/:postid/
 */
export async function incrementReadCount(postid, token: TokenType) {
  const url = `/posts/readCount/${postid}/`;
  // in patch method, the second parameter is the data to be sent (in this case, it's empty)
  try {
    const response = await client.patch(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    return;
  }
}
