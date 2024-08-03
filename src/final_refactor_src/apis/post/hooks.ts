import { immutableOption } from "@/final_refactor_src/lib/swr/options";
import { Post } from "@/final_refactor_src/types/post";
import useSWR, { SWRConfiguration } from "swr";

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
  postid: string,
  options: SWRConfiguration = immutableOption
) {
  const { data, error, isLoading } = useSWR(
    postid ? `/posts/${postid}/` : null,
    options
  );

  return {
    post: data as Post | null,
    isLoading,
    error,
  };
}
