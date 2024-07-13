// Custom hook to fetch user board data

// <Business Logic>
// 1. user의 posts를 가져온다.
// 2. user의 comments를 가져온다.
// 3. post를 보고 닫고의 토글 스위치를 만든다.

import { useUserComments } from "@/refactor_src/entities/user/api/queries/useUserComments";
import { useUserPosts } from "@/refactor_src/entities/user/api/queries/useUserPosts";
import { useState } from "react";

type ActiveViewOptions = "posts" | "comments";

const useUserBoard = (email: string, token: string | null) => {
  const [activeView, setActiveView] = useState<ActiveViewOptions>("posts");

  const {
    posts,
    isLoading: isUserPostsLoading,
    error: userPostsError,
  } = useUserPosts(email, token);
  const {
    comments,
    isLoading: isUserCommentsLoading,
    error: userCommentsError,
  } = useUserComments(email, token);

  return {
    activeView,
    setActiveView,
    posts,
    comments,
    isLoading: isUserPostsLoading || isUserCommentsLoading,
    error: userPostsError || userCommentsError,
  };
};

export default useUserBoard;
