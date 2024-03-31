import axios from "axios";
import { backendUrl } from "../config/backendUrl";

export async function createComment(postid, body) {
  // const url = `${backendUrl}/comments/${postid}/`;
  const url = `${backendUrl}/comments/${postid}/`;
  try {
    const response = await axios.post(url, body);
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
}

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

export async function updateComment(commentid, body) {
  // const url = `${backendUrl}/comments/${postid}/`;
  const url = `${backendUrl}/comments/${commentid}/`;
  try {
    const response = await axios.put(url, body);
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function deleteComment(commentid) {
  // const url = `${backendUrl}/comments/${postid}/`;
  const url = `${backendUrl}/comments/${commentid}/`;
  try {
    const response = await axios.delete(url);
    return response;
  } catch (error) {
    console.error(error);
    return;
  }
}
