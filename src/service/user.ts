import axios from "axios";
import { backendUrl } from "../config/backendUrl";
import useSWR, { SWRConfiguration } from "swr";
import { User } from "../model/props/users";
import { Comment, Post } from "../model/props/posts";
import { fetcherWithToken } from "./swrConfig";

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

// SWR
type UserData = User | null;
type UserPostsData = Post[] | null;
type UserCommentsData = Comment[] | null;

export function useUser(
  email: string,
  token: string | null,
  options?: SWRConfiguration
) {
  // token이 주어지지 않았다면 fetch를 하지 않는다
  const { data, error, isLoading } = useSWR(
    token ? [`/users/${email}/`, token] : null,
    fetcherWithToken,
    options
  );

  return {
    user: data as UserData,
    isLoading,
    isError: error || data === null,
  };
}

export function useUserPosts(
  email: string,
  token: string | null,
  options?: SWRConfiguration
) {
  const { data, error, isLoading } = useSWR(
    token ? [`/users/${email}/posts/`, token] : null,
    fetcherWithToken,
    options
  );

  return {
    posts: data?.posts as UserPostsData,
    isLoading,
    isError: error,
  };
}

export function useUserComments(
  email: string,
  token: string | null,
  options?: SWRConfiguration
) {
  const { data, error, isLoading } = useSWR(
    token ? [`/users/${email}/comments/`, token] : null,
    fetcherWithToken,
    options
  );
  return {
    comments: data?.comments as UserCommentsData,
    isLoading,
    isError: error,
  };
}
