// sub-ui components
import UserBasicInfoLeft from "./UserBasicInfoLeft";
import UserBaiscInfoRight from "./UserBasicInfoRight";

export default function UserBasicInfo({ email, session, user }) {
  console.log("user: ", user);

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-12 lg:gap-16 justify-center">
      {/* Left: profile image + name + major */}
      {/* TODO: profile 이미지가 구글 로그인 이미지이기 때문에 로그인한 유저만 된다... */}
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
