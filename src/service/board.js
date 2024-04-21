import axios from "axios";
import { backendUrl } from "../config/backendUrl";

// page is 0-indexed
// need email address from response
export async function getBoardPosts(boardType, token, size, page) {
  const url = `${backendUrl}/boards/${boardType}/posts/?size=${size}&page=${page}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function getBoardAnnouncements(boardType, token) {
  const url = `${backendUrl}/boards/${boardType}/announcements/`;
  try {
    const response = await axios.get(url, {
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

// get the number of posts in a board for pagination
// res: { postCount: integer}
export async function getBoardPostNum(boardType, token) {
  const url = `${backendUrl}/boards/${boardType}/count/`;
  try {
    const response = await axios.get(url, {
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
