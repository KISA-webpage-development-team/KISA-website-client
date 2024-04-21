import axios from "axios";
import { backendUrl } from "../config/backendUrl";

// pass user email to check whether user is admin
export async function getIsAdmin(email) {
  try {
    const url = `${backendUrl}/auth/isAdmin/`;
    // const data = { email: email };
    const response = await axios.get(url, { params: { email: email } });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getUserInfo(email) {
  const url = `${backendUrl}/users/${email}/`;
  try {
    const response = await axios.get(url);
    return response?.data;
  } catch (err) {
    console.error(err);
  }
}

export async function updateUser(email, data) {
  const url = `${backendUrl}/users/${email}/`;
  try {
    const response = await axios.patch(url, data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getPostsByUser(email) {
  const url = `${backendUrl}/users/${email}/posts`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getCommentsByUser(email) {
  const url = `${backendUrl}/users/${email}/comments`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}
