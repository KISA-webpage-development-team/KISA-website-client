"use client";

// sub-ui components
import UserBasicInfoLeft from "./UserBasicInfoLeft";
import UserBaiscInfoRight from "./UserBasicInfoRight";
import { useUser } from "../../service/user";

export default function UserBasicInfo({ email, session }) {
  // Data Fetching from client side using custom useSWR hooks ----------------
  // (참고: session?.token이 null인 경우에는 애초에 api call을 하지 않도록 hook을 만들어놓음)
  const {
    user,
    isLoading: isUserFetching,
    isError: userError,
  } = useUser(email, session?.token);

  // [NOTE]
  // loading session is not needed, because it is already handled in middleware
  // unauthenticated is already handled in middleware

  if (isUserFetching) return <div>Loading...</div>;

  if (userError) return <div>에러가 발생했습니다!</div>;

  return (
    <div
      className="flex flex-col md:flex-row
     gap-4 md:gap-10 lg:gap-12 justify-center md:items-center"
    >
      {/* Left: profile image + name + major */}
      <UserBasicInfoLeft
        hasProfile={session?.user.email === email}
        profile={session?.user.image}
        fullname={user?.fullname}
        major={user?.major}
      />

      {/* Right: email, gradYear, borndate, linkedin*/}
      <UserBaiscInfoRight
        email={email}
        gradYear={user?.gradYear}
        linkedin={user?.linkedin}
        canEdit={session?.user.email === email}
      />
    </div>
  );
}
