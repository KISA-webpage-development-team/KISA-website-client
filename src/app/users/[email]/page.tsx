"use client";

// User Page (/users/[email])

// This page is only for logged in users.
// Can't view other users' profile pages without logging in.

import { sejongHospitalLight } from "../../../utils/fonts/textFonts";
import { adminEmail } from "../../../config/admin";

// hooks
import { useSession } from "next-auth/react";
import { useUser, useUserComments, useUserPosts } from "../../../service/user";

// sub-ui components
import UserBasicInfo from "../../../components/Users/UserBasicInfo";
import UserBoard from "../../../components/Users/UserBoard";
import NotLoginModal from "../../../components/shared/NotLoginModal";

// types
import { UserParamsPageProps } from "../../../model/props/users";
import { CustomSession } from "../../../model/common/types";

export default function UserPage({ params }: UserParamsPageProps) {
  const { email } = params;
  const decodedEmail = decodeURIComponent(email);

  const { data: session, status } = useSession() as {
    data: CustomSession | null;
    status: string;
  };

  // Data Fetching from client side using custom useSWR hooks ----------------
  // (참고: session?.token이 null인 경우에는 애초에 api call을 하지 않도록 hook을 만들어놓음)
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
  // --------------------------------------------------------------------------

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

  // console.log(userError, postsError, commentsError);
  if (userError || postsError || commentsError) {
    return <div>존재하지 않는 유저입니다</div>;
  }

  if (decodedEmail === adminEmail && session?.user.email !== adminEmail) {
    return <div>권한이 없습니다</div>;
  }

  return (
    <section
      className={`${sejongHospitalLight.className} pt-2 md:pt-3 lg:pt-4 gap-6`}
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
