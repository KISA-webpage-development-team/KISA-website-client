import axios from "axios";
import { backendUrl } from "../config/backendUrl";

// page is 0-indexed
// need email address from response
export async function getBoardPosts(boardType, size, page) {
  const url = `${backendUrl}/boards/${boardType}/posts/?size=${size}&page=${page}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
    z;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function getBoardAnnouncements(boardType) {
  const url = `${backendUrl}/boards/${boardType}/announcements/`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
}
