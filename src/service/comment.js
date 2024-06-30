import client from "../config/axios";

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

// need email from the response
export async function getCommentsByPostid(postid) {
  // const url = `/comments/${postid}/`;
  const url = `/comments/${postid}/`;
  try {
    const response = await client.get(url);
    return response.data;
  } catch (error) {
    //console.error(error);
    return;
  }
}

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
