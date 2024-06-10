import useSWR, { SWRConfiguration } from "swr";
import { SimpleUser, User } from "../model/props/users";
import { Comment, Post } from "../model/props/posts";
import { fetcherWithToken } from "./swrConfig";
import client from "../config/axios";

// GET
// data type -------------------------------------
type UserData = User | null;
type UserPostsData = Post[] | null;
type UserCommentsData = Comment[] | null;
// -----------------------------------------------
// @route GET /users/{email}/
// @params email, token, options
export function useUser(
  email: string,
  token: string | null,
  options?: SWRConfiguration
) {
  const { data, error, isLoading } = useSWR(
    token ? [`/users/${email}/`, token] : null,
    options
  );

  return {
    user: data as UserData,
    isLoading,
    isError: error || data === null,
  };
}

// @route GET /users/{email}/posts/
// @params email, token, options
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
    isError: error || data === null,
  };
}

// @route GET /users/{email}/comments/
// @params email, token, options
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
    isError: error || data === null,
  };
}

// PATCH
export async function updateUser(
  email: string,
  data: SimpleUser,
  token: string | null
): Promise<boolean> {
  const url = `/users/${email}/`;

  try {
    const response = await client.patch(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return !!response.data;
  } catch (err) {
    console.error(err);
  }
}
