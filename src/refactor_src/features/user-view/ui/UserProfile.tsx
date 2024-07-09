"use client";

import { useUser } from "@/refactor_src/entities/user";
// import useSWR from "swr";

// const fetcher = (url) => fetch(url).then((res) => res.json());

export function UserProfile({ email, token }) {
  // 1. useEffect + axios 을 이용한 커스텁 훅
  // 특징: revalidation을 하지 않는다. 페이지 새로고침을 해야만 데이터를 다시 가져온다.

  const { user, isLoading, error } = useUser(email, token);

  if (error) {
    return <p>Failed to fetch</p>;
  }

  if (isLoading) {
    return <p>Loading User...</p>;
  }

  console.log("user: ", user);

  return (
    <div
      className="flex flex-col md:flex-row
     gap-4 md:gap-10 lg:gap-12 justify-center md:items-center"
    >
      wow
    </div>
  );
}
