import axios from "axios";
import { backendUrl } from "../config/backendUrl";
import { User } from "../model/props/users";

// pass user email to check whether user is admin
export async function getIsAdmin(email, token) {
  const url = `${backendUrl}/auth/isAdmin/${email}`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch (error) {
    //console.error(error);
    return false;
  }
}

export async function getUserInfo(
  email: string,
  token: string | null
): Promise<User | null> {
  const url = `${backendUrl}/users/${email}/`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (err) {
    console.error(err);
  }
}

export async function updateUser(email, data, token) {
  const url = `${backendUrl}/users/${email}/`;

  try {
    const response = await axios.patch(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getPostsByUser(email, token) {
  const url = `${backendUrl}/users/${email}/posts/`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getCommentsByUser(email, token) {
  const url = `${backendUrl}/users/${email}/comments/`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
}
