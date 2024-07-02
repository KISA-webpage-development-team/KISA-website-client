"use client";

import useSWR, { SWRConfiguration } from "swr";
import { User } from "../../model/props/users";
import { Comment, Post } from "../../model/props/posts";

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
    isError: error,
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
    options
  );

  return {
    posts: data?.posts as UserPostsData,
    isLoading,
    isError: error,
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
    options
  );

  return {
    comments: data?.comments as UserCommentsData,
    isLoading,
    isError: error,
  };
}
