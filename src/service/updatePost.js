import axios from "axios";

export async function updatePost(postid, data) {
  // const url = `${backendUrl}/posts/${postid}/`;
  try {
    const response = await axios.patch(url, data);
    return response?.data;
  } catch (error) {
    console.error(error);
  }
}
