import React from "react";
import UserBasicInfo from "../../../components/Users/UserBasicInfo";
import UserBoard from "../../../components/Users/UserBoard";
import { getUserInfo } from "../../../service/user";
import { decode } from "punycode";
import { sejongHospitalLight } from "../../../utils/fonts/textFonts";

// currently, this page is only for logged in users.
// Can't view other users' profile pages

export default async function UserPage({ params }) {
  const { emailid } = params;
  const umichEmail = emailid + "@umich.edu";

  const userInfo = await getUserInfo(umichEmail);

  // const userInfo = await getUserInfo(decodedEmail);
  // // currently, userInfo is just same as session's email and name

  // if (decodedEmail !== userInfo.email) {
  //   return (
  //     <div className="flex flex-col items-center py-10 px-[20px] md:px-[60px] lg:px-[75px]">
  //       <h1 className="text-2xl font-bold">
  //         You are not authorized to view this page
  //       </h1>
  //     </div>
  //   );
  // }

  return (
    <div className={`container ${sejongHospitalLight.className}`}>
      <UserBasicInfo user={userInfo} />

      {/* <>
        <UserBoard email={email} />
      </> */}
    </div>
  );
}
