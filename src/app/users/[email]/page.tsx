"use client";

// This page is only for logged in users.
// Can't view other users' profile pages without logging in.

import UserBasicInfo from "../../../components/Users/UserBasicInfo";
import UserBoard from "../../../components/Users/UserBoard";
import { sejongHospitalLight } from "../../../utils/fonts/textFonts";
import { UserParamsPageProps } from "../../../model/props/users";
import { useSession } from "next-auth/react";
import { CustomSession } from "../../../model/common/types";
import { useUser, useUserComments, useUserPosts } from "../../../service/user";
import NotLoginModal from "../../../components/shared/NotLoginModal";
import { adminEmail } from "../../../config/admin";

export default function UserPage({ params }: UserParamsPageProps) {
  const { email } = params;
  const decodedEmail = decodeURIComponent(email);

  const { data: session, status } = useSession() as {
    data: CustomSession | null;
    status: string;
  };

  // user의 기본 정보는 자주 바뀌지 않으니 revalidate를 주기적으로 해줄 필요는 없을 것 같음.
  const {
    user,
    isLoading: isUserFetching,
    isError: userError,
  } = useUser(decodedEmail, session?.token);

  // posts와 comments의 revalidate을 주기적으로 해줘야할것 같음.
  const {
    posts,
    isLoading: isPostsFetching,
    isError: postsError,
  } = useUserPosts(decodedEmail, session?.token);
  const {
    comments,
    isLoading: isCommentsFetching,
    isError: commentsError,
  } = useUserComments(decodedEmail, session?.token);

  if (
    status === "loading" ||
    isUserFetching ||
    isPostsFetching ||
    isCommentsFetching
  ) {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <NotLoginModal />;
  }

  if (userError || postsError || commentsError) {
    return <div>Error!</div>;
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

      <UserBoard postsData={posts} commentsData={comments} />
    </section>
  );
}

// [NOTE on rendering method]
// This page is rendered as CSR (Client Side Rendering) because it is a user-specific page.
// The page is not indexed by search engines and only the user can access it.
// If they are not logged in, they will be notified to log in.
