import axios from "axios";
import { backendUrl } from "../config/backendUrl";

export async function createReadCountCookie(postid) {
  const url = `${backendUrl}/cookies/post/${postid}/`;
  try {
    const response = await axios.post(url, null, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function createPost(data, token) {
  const url = `${backendUrl}/posts/`;
  try {
    const response = await axios.post(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function getSinglePost(postid) {
  const url = `${backendUrl}/posts/${postid}/`;

  try {
    const response = await axios.get(url);
    return response?.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updatePost(postid, data, token) {
  const url = `${backendUrl}/posts/${postid}/`;
  try {
    const response = await axios.patch(
      url,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function deletePost(postid, token) {
  // const url = `${backendUrl}/posts/${postid}`;
  const url = `${backendUrl}/posts/${postid}/`; // currently env doesn't work
  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function incrementReadCount(postid, token) {
  // const url = `${backendUrl}/posts/${postid}/readcount`;
  const url = `${backendUrl}/posts/readCount/${postid}/`; // currently env doesn't work
  try {
    const response = await axios.patch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}
