import axios from "axios";
import { backendUrl } from "../config/backendUrl";

export async function createComment(postid, body, token) {
  const url = `${backendUrl}/comments/${postid}/`;
  try {
    const response = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
}

// need email from the response
export async function getCommentsByPostid(postid) {
  // const url = `${backendUrl}/comments/${postid}/`;
  const url = `${backendUrl}/comments/${postid}/`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function updateComment(commentid, body, token) {
  // const url = `${backendUrl}/comments/${postid}/`;
  const url = `${backendUrl}/comments/${commentid}/`;
  try {
    const response = await axios.put(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function deleteComment(commentid, token) {
  // const url = `${backendUrl}/comments/${postid}/`;
  const url = `${backendUrl}/comments/${commentid}/`;
  try {
    const response = await axios.delete(url, {
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
