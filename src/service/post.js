import axios from "axios";
import { backendUrl } from "../config/backendUrl";

export async function createReadCountCookie(postid) {
  const url = `http://127.0.0.1:8000/api/v1/cookies/post/${postid}/`;
  try {
    const response = await axios.post(url, null, {
      withCredentials: true,
    });
    // const response = await fetch(url, {
    //   method: "POST",
    //   credentials: "include",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    console.log(response.headers["Set-Cookie"]);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function createPost(data) {
  console.log(data);
  // const url = `${backendUrl}/posts/`;
  const url = `http://127.0.0.1:8000/api/v1/posts/`; // currently env doesn't work
  try {
    const response = await axios.post(url, data);
    // console.log(response.data);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getSinglePost(postid) {
  const url = `http://127.0.0.1:8000/api/v1/posts/${postid}/`;

  try {
    const response = await axios.get(url);
    return response?.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updatePost(postid, data) {
  // const url = `${backendUrl}/posts/${postid}/`;
  const url = `http://127.0.0.1:8000/api/v1/posts/${postid}/`; // currently env doesn't work
  try {
    const response = await axios.patch(url, data);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function deletePost(postid) {
  // const url = `${backendUrl}/posts/${postid}`;
  const url = `http://127.0.0.1:8000/api/v1/posts/${postid}/`; // currently env doesn't work
  try {
    const response = await axios.delete(url);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function incrementReadCount(postid) {
  // const url = `${backendUrl}/posts/${postid}/readcount`;
  const url = `http://127.0.0.1:8000/api/v1/posts/readCount/${postid}/`; // currently env doesn't work
  try {
    const response = await axios.patch(url);
    return response;
  } catch (error) {
    console.error(error);
  }
}

// CREATE TABLE posts(
//   postid INTEGER PRIMARY KEY AUTOINCREMENT,
//   type VARCHAR(40) NOT NULL,
//   title VARCHAR(64) NOT NULL,
//   fullname VARCHAR(20) NOT NULL,
//   email VARCHAR(40) NOT NULL,
//   text VARCHAR(65536) NOT NULL,
//   readCount INTEGER NOT NULL,
//   isAnnouncement BOOL NOT NULL,
//   created DATETIME DEFAULT (DATETIME(CURRENT_TIMESTAMP, 'LOCALTIME')),
//   FOREIGN KEY (fullname) REFERENCES users(fullname)
//   FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
// );
