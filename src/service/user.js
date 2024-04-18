import axios from "axios";
import { backendUrl } from "../config/backendUrl";

// pass user email to check whether user is admin
export async function getIsAdmin(email) {
  try {
    const url = `${backendUrl}/auth/isAdmin/`;
    // const data = { email: email };
    const response = await axios.get(url, { params: { email: email } });
    // console.log("HELLO");
    return true;
    // if (response.status === 200){
    //   return true;
    // } else if (response.status === 401) {
    //   return false;
    // } return false;
  } catch (error) {
    console.error(error);
    // console.log("HEEEEEE");
    return false;
  }
  // const url = `${backendUrl}/auth/isAdmin/`;
  // axios.get(url, {params: { email: email } })
  //   .then((response) => {
  //     if (response.status === 200){
  //       return true;
  //     }
  //     return false;
  //   })
  //   .catch((error) => {
  //     // console.log(error);
  //     if (error.status === 401) {
  //       return false;
  //     }
  //   })
}

export function getIsAdminFake(email) {
  if (
    email === "jiohin@umich.edu" ||
    email === "dongsubk@umich.edu" ||
    email === "wookwan@umich.edu"
  ) {
    return true;
  } else {
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
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getCommentsByUser(email) {
  const url = `${backendUrl}/users/${email}/comments`;
  try {
    const response = await axios.get(url);
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}
