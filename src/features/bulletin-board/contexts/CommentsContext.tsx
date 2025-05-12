// CommentsContext
// : to provide shared states for comments to avoid props drilling

import React, { createContext, useContext } from "react";

import { UserSession } from "@/lib/next-auth/types";

// Define the context value type
export type CommentsContextValue = {
  session: UserSession | undefined;
  isAuthenticated: boolean;
  isEveryKisa: boolean;
  postAuthorEmail: string;
  postid: number;
};

const CommentsContext = createContext<CommentsContextValue | undefined>(
  undefined
);

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

export function useCommentsContext() {
  const context = useContext(CommentsContext);
  if (!context) {
    throw new Error(
      "useCommentsContext must be used within a CommentsProvider"
    );
  }
  return context;
}
