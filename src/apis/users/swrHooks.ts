"use client";
// SWR hooks for GET API calls
// starting with "/users" endpoint

// ---------------------------------------------------------------------------
import useSWR, { SWRConfiguration } from "swr";
import { immutableOption } from "@/lib/swr/options";

// Types
import { CustomAxiosError } from "@/lib/axios/types";
import { User } from "@/types/user";
import { UserBoardPost } from "@/types/post";
import { Comment } from "@/types/comment";

/**
 * @desc   Fetch user data
 * @route  GET /users/:email/
 */
export function useUser(
  email: string,
  token: string | null,
  options: SWRConfiguration = immutableOption
) {
  // - By adding immutableOption,
  // revalidation is disabled for user data that doesn't change frequently,
  // except when the page is refreshed.
  // - token is required for the request

  const url = `/users/${email}/`;

  const { data, error, isLoading } = useSWR<User, CustomAxiosError>(
    token ? [url, token] : null,
    options
  );

  return {
    user: data,
    isLoading,
    error,
  };
}
/**
 *@desc   Fetch posts of a user
 *@route  GET /users/:email/posts/
 */
export function useUserPosts(
  email: string,
  token: string | null,
  options: SWRConfiguration = immutableOption
) {
  // - By adding immutableOption,
  // revalidation is disabled for user's post data that doesn't change frequently,
  // except when the page is refreshed.
  // - token is required for the request

  // NOTE: `any` is used for the response type
  // it should be UserBoardPost[] but there is some issue with backend response type
  const { data, error, isLoading } = useSWR<any, CustomAxiosError>(
    token ? [`/users/${email}/posts/`, token] : null,
    options
  );

  // NOTE: there is some issue with backend response type
  // so we need to cast the response to UserBoardPost[]
  return {
    posts: data ? (data.posts as UserBoardPost[]) : [],
    isLoading,
    error,
  };
}

/**
 * @desc   Fetch comments of a user
 * @route  GET /users/:email/comments/
 */
export function useUserComments(
  email: string,
  token: string | null,
  options: SWRConfiguration = immutableOption
) {
  // - By adding immutableOption,
  // revalidation is disabled for user's comment data that doesn't change frequently,
  // except when the page is refreshed.
  // - token is required for the request

  const url = `/users/${email}/comments/`;

  // NOTE: `any` is used for the response type
  // it should be Comment[] but there is some issue with backend
  const { data, error, isLoading } = useSWR<any, CustomAxiosError>(
    token ? [url, token] : null,
    options
  );

  // NOTE: there is some issue with backend response type
  // so we need to cast the response to Comment[]
  return {
    comments: data ? (data.comments as Comment[]) : [],
    isLoading,
    error,
  };
}
