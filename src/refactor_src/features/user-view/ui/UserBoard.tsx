import { CustomSession } from "@/refactor_src/shared/next-auth/types";
import React from "react";

type UserBoardProps = {
  email: string;
  session: CustomSession | null;
};

export function UserBoard({ email, session }: UserBoardProps) {
  // <Business Logic>
  // 1. user의 posts를 가져온다.
  // 2. user의 comments를 가져온다.
  // 3. post를 보고 닫고의 토글 스위치를 만든다.

  return <div>UserBoard</div>;
}
