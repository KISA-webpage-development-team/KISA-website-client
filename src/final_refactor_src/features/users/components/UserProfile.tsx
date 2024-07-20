"use client";

import { sejongHospitalLight } from "@/final_refactor_src/utils/fonts/fonts";

// user
import { useUser } from "@/final_refactor_src/apis/users/hooks";

// shared
import {
  EmailIcon,
  GradIcon,
  LinkedInIcon,
} from "@/final_refactor_src/components/icon";
// UI
import UserProfileInfo from "./UserProfileInfo";
import UserProfileDetails from "./UserProfileDetails";
import { LoadingSpinner } from "@/final_refactor_src/components/feedback";
import { CustomLinkButton } from "@/final_refactor_src/components/button";
// Types
import { UserSession } from "@/final_refactor_src/lib/next-auth/types";

type UserProfileProps = {
  email: string;
  session: UserSession | null;
};

export function UserProfile({ email, session }: UserProfileProps) {
  // [NOTE] api GET call은 공통적으로 SWR + axios를 이용해 이후 확장 옵션을 가져갈것
  const { user, isLoading, error } = useUser(email, session?.token);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    // Error handling
    throw error;
  }

  const isSelf = session?.user.email === email;

  // <Business Logic> List 형태로 유저의 디테일한 정보들을 보여준다.
  // 이 리스트를 분리해야함 이 컴포넌트에서
  // 각각 icon, text, 그리고 필요시 onClick을 받아서 처리한다.
  const { fullname, major, gradYear, linkedin } = user;
  const detailList = [
    {
      icon: <EmailIcon />,
      text: email,
    },
    {
      icon: <GradIcon />,
      text: "Class of " + gradYear.toString(),
    },
    {
      icon: <LinkedInIcon />,
      text: linkedin?.split(".com/in/")[1]?.replace("/", ""),
      onClick: () => window.open(linkedin, "_blank"),
    },
  ];

  return (
    <div
      className={`flex flex-col md:flex-row
     ${sejongHospitalLight.className}
     gap-4 md:gap-10 lg:gap-12 justify-center items-center`}
    >
      {/* Left: Profile Image (if email is same as logged in user) + Name + Major*/}
      <UserProfileInfo
        fullname={fullname}
        major={major}
        hasProfile={isSelf}
        profile={session?.user.image}
      />
      {/* Right: email + gradYear + linkedIn + edit button */}
      <div className="flex flex-col gap-3 w-fit">
        <UserProfileDetails detailList={detailList} />
        {isSelf && (
          <CustomLinkButton
            type="primary"
            href={`/users/edit/${email}`}
            text="정보 수정"
          />
        )}
      </div>
    </div>
  );
}
