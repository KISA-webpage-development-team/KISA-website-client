// CommentsContext
// : shared state + mutation callbacks for the comments tree.
//
// Two providers, on purpose:
//   - CommentsContext carries auth/post metadata (re-renders are rare).
//   - CommentsMutationsContext carries optimistic + refetch callbacks (often
//     re-rendered by the owner). Splitting them keeps consumers that only
//     need auth from re-rendering when mutation callback identity changes,
//     and vice-versa.

import React, { createContext, useContext } from "react";

import { UserSession } from "@/lib/next-auth/types";
import { Comment } from "@/types/comment";

export type CommentsContextValue = {
  session: UserSession | undefined;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isEveryKisa: boolean;
  postAuthorEmail: string;
  postid: number;
};

export type CommentsMutationsValue = {
  refreshComments: () => void;
  onCommentAdded: () => void;
  onCommentDeleted: () => void;
  onOptimisticAdd: (temp: Comment) => void;
  onOptimisticReplace: (tempId: number, server: Comment | null) => void;
  onOptimisticRollback: (tempId: number) => void;
};

const CommentsContext = createContext<CommentsContextValue | undefined>(
  undefined,
);
const CommentsMutationsContext = createContext<
  CommentsMutationsValue | undefined
>(undefined);

export function CommentsProvider({
  value,
  children,
}: {
  value: CommentsContextValue;
  children: React.ReactNode;
}) {
  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
}

export function CommentsMutationsProvider({
  value,
  children,
}: {
  value: CommentsMutationsValue;
  children: React.ReactNode;
}) {
  return (
    <CommentsMutationsContext.Provider value={value}>
      {children}
    </CommentsMutationsContext.Provider>
  );
}

export function useCommentsContext() {
  const context = useContext(CommentsContext);
  if (!context) {
    throw new Error(
      "useCommentsContext must be used within a CommentsProvider",
    );
  }
  return context;
}

export function useCommentsMutations() {
  const context = useContext(CommentsMutationsContext);
  if (!context) {
    throw new Error(
      "useCommentsMutations must be used within a CommentsMutationsProvider",
    );
  }
  return context;
}
