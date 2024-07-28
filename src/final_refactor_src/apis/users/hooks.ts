"use client";
// <Users Hooks>
// SWR hooks to make GET API calls
// starting with "/users" endpoint

// [NOTE] GET API Calls are done with SWR library for future extension options
// ---------------------------------------------------------------------------
import useSWR from "swr";
import { immutableOption } from "@/final_refactor_src/lib/swr/options";

// Types
import { User } from "@/final_refactor_src/types/user";
import { Post } from "@/final_refactor_src/types/post";
import { CustomAxiosError } from "@/final_refactor_src/lib/axios/types";
import { Comment } from "@/final_refactor_src/types/comment";

/**
 * @desc   Fetch user data
 * @route  GET /users/:email/
 */
export function useUser(email: string, token: string | null) {
  // - By adding immutableOption,
  // revalidation is disabled for user data that doesn't change frequently,
  // except when the page is refreshed.
  // - token is required for the request

  const { data, error, isLoading } = useSWR<User, CustomAxiosError>(
    token ? [`/users/${email}/`, token] : null,
    immutableOption
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
export function useUserPosts(email: string, token: string | null) {
  // - By adding immutableOption,
  // revalidation is disabled for user's post data that doesn't change frequently,
  // except when the page is refreshed.
  // - token is required for the request
  const { data, error, isLoading } = useSWR<any, CustomAxiosError>(
    token ? [`/users/${email}/posts/`, token] : null,
    immutableOption
  );

  // there is some issue with backend response type
  // so we need to cast the response to Post[]
  return {
    posts: data ? (data.posts as Post[]) : [],
    isLoading,
    error,
  };
}

// @desc   Fetch comments of a user
// @route  GET /users/:email/comments/
export function useUserComments(email: string, token: string | null) {
  // - By adding immutableOption,
  // revalidation is disabled for user's comment data that doesn't change frequently,
  // except when the page is refreshed.
  // - token is required for the request
  const { data, error, isLoading } = useSWR<any, CustomAxiosError>(
    token ? [`/users/${email}/comments/`, token] : null,
    immutableOption
  );

  return {
    comments: data ? (data.comments as Comment[]) : [],
    isLoading,
    error,
  };
}
