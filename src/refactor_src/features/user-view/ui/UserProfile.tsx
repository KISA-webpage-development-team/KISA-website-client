"use client";

// [UI]
// user으 ㅣ얼

import { useUser } from "@/refactor_src/entities/user";
import LoadingSpinner from "@/refactor_src/shared/ui/LoadingSpinner";

type UserProfileProps = {
  email: string;
  token: string | null;
};

export function UserProfile({ email, token }: UserProfileProps) {
  // [NOTE] api GET call은 공통적으로 SWR + axios를 이용해 이후 확장 옵션을 가져갈것
  const { user, isLoading, error } = useUser(email, token);

  if (error) {
    // Error handling
    throw error;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className="flex flex-col md:flex-row
     gap-4 md:gap-10 lg:gap-12 justify-center md:items-center"
    >
      wow
    </div>
  );
}
