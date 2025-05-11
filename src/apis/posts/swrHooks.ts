import useSWR, { SWRConfiguration } from "swr";

import { immutableOption } from "@/lib/swr/options";
import { CustomAxiosError } from "@/lib/axios/types";
import { Post } from "@/types/post";

/**
 * @desc Fetch a post with the given postid [TOKEN NOT REQUIRED]
 * @route GET /posts/:postid/
 */
// [TODO] usePost function should be real-time
// which means, options shouldn't be set to immutableOption
// and should be set to defaultOption

// BUT for now, there are not many users in the system,
// so we set the options to immutableOption

// [NOTE]
// options can be something like...
// - immutableOption to disable revalidation
// - { fetcher: fetcherWithToken } to enable token required GET API calls
// - { fetcher: fetcher } to enable GET API calls without token
export function usePost(
  postid: number,
  options: SWRConfiguration = immutableOption
): {
  post: Post | undefined;
  isLoading: boolean;
  error: CustomAxiosError | undefined;
} {
  const url = `/posts/${postid}/`;

  const { data, error, isLoading } = useSWR(postid ? url : null, options);

  return {
    post: data,
    isLoading,
    error,
  };
}
