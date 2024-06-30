import client from "../config/axios";
import { Post } from "../model/props/posts";

export async function createReadCountCookie(postid) {
  const url = `/cookies/post/${postid}/`;
  try {
    const response = await client.post(url, null, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    // //console.error(error);
  }
}

export async function createPost(data, token) {
  const url = `/posts/`;
  try {
    const response = await client.post(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    // //console.error(error);
    return;
  }
}

// [24.06.01] TS Conversion DONE
export async function getSinglePost(postid: string): Promise<Post | null> {
  const url = `/posts/${postid}/`;

  try {
    const response = await client.get(url);
    return response?.data;
  } catch (error) {
    // //console.error(error);
  }
}

export async function updatePost(postid, data, token) {
  const url = `/posts/${postid}/`;
  try {
    const response = await client.patch(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    // //console.error(error);
  }
}

export async function deletePost(postid, token) {
  // const url = `/posts/${postid}`;
  const url = `/posts/${postid}/`; // currently env doesn't work
  try {
    const response = await client.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    // console.log(error);
  }
}

export async function incrementReadCount(postid, token) {
  const url = `/posts/readCount/${postid}/`; // currently env doesn't work
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
    // //console.error(error);
  }
}
