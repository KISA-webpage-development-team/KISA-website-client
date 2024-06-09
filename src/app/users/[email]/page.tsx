"use client";

// This page is only for logged in users.
// Can't view other users' profile pages without logging in.

import React, { useEffect, useState } from "react";
import UserBasicInfo from "../../../components/Users/UserBasicInfo";
import UserBoard from "../../../components/Users/UserBoard";
import { sejongHospitalLight } from "../../../utils/fonts/textFonts";
import { User, UserParamsPageProps } from "../../../model/props/users";
import { useSession } from "next-auth/react";
import { CustomSession } from "../../../model/common/types";
import {
  getCommentsByUser,
  getPostsByUser,
  getUserInfo,
} from "../../../service/user";
import { useUser } from "../../../service/test/testapi";
import NotLoginModal from "../../../components/shared/NotLoginModal";
import { adminEmail } from "../../../config/admin";

export default function UserPage({ params }: UserParamsPageProps) {
  const { email } = params;
  const decodedEmail = decodeURIComponent(email);

  const { data: session, status } = useSession() as {
    data: CustomSession | null;
    status: string;
  };

  const { user, isLoading, isError } = useUser(decodedEmail, session?.token);

  // session
  // const { data: session, status } = useSession() as {
  //   data: CustomSession | null;
  //   status: string;
  // };

  // user data states
  // const [user, setUser] = useState<User | null>(null);
  // const [postsData, setPostsData] = useState();
  // const [commentsData, setCommentsData] = useState();

  // api calls to get user data
  // useEffect(() => {
  //   // 1. fetch user's basic info with `getUserInfo`
  //   const fetchUser = async () => {
  //     const res = await getUserInfo(decodedEmail, session?.token);
  //     console.log("res: ", res);
  //     if (res) {
  //       setUser(res);
  //       return;
  //     } else {
  //       // error handling
  //       console.log("user fetch failed");
  //     }
  //   };

  //   // 2. fetch user's posts with `getPostsByUser`
  //   const fetchPosts = async () => {
  //     const res = await getPostsByUser(decodedEmail, session?.token);
  //     if (res) {
  //       setPostsData(res.posts);
  //       return;
  //     } else {
  //       // error handling

  //       console.log("posts fetch failed");
  //       throw new Error("Failed to fetch user's posts");
  //     }
  //   };

  //   // 3. fetch user's comments with `getCommentsByUser`
  //   const fetchComments = async () => {
  //     const res = await getCommentsByUser(decodedEmail, session?.token);
  //     if (res) {
  //       setCommentsData(res.comments);
  //       return;
  //     } else {
  //       // error handling
  //       console.log("comments fetch failed");
  //     }
  //   };

  //   // when session is available
  //   if (session) {
  //     // 1. fetch user data
  //     fetchUser();
  //     // fetchPosts();
  //     // fetchComments();
  //   }
  // }, [session]);

  // // loading and auth check
  // if (status === "loading") {
  //   return <div>Loading...</div>;
  // }

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <NotLoginModal />;
  }

  if (isError) {
    return <div>Error!</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (decodedEmail === adminEmail && session?.user.email !== adminEmail) {
    return <div>권한이 없습니다</div>;
  }

  return (
    <section
      className={`${sejongHospitalLight.className} pt-2 md:pt-3 lg:pt-4 
  pb-[100px] md:pb-[125px] lg:pb-[150px]`}
    >
      <UserBasicInfo email={decodedEmail} session={session} user={user} />

      {/* <UserBoard email={decodedEmail} /> */}
    </section>
  );
}

// [NOTE on rendering method]
// This page is rendered as CSR (Client Side Rendering) because it is a user-specific page.
// The page is not indexed by search engines and only the user can access it.
// If they are not logged in, they will be notified to log in.
