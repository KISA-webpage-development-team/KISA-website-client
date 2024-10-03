// Something will be added here...
import client from "@/lib/axios/client";

/**
 * @desc Create a comment
 * @route POST /comments/{postid}/
 */
export async function createComment(postid, body, token) {
  const url = `/comments/${postid}/`;
  try {
    const response = await client.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    //console.error(error);
    return;
  }
}

/**
 * @desc Update a comment
 * @route PUT /comments/{commentid}/
 */
export async function updateComment(commentid, body, token) {
  // const url = `/comments/${postid}/`;
  const url = `/comments/${commentid}/`;
  try {
    const response = await client.put(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    //console.error(error);
    return;
  }
}

/**
 * @desc Delete a comment
 * @route DELETE /comments/{commentid}/
 */
export async function deleteComment(commentid, token) {
  // const url = `/comments/${postid}/`;
  const url = `/comments/${commentid}/`;
  try {
    const response = await client.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    //console.error(error);
    return;
  }
}
