import React from "react";
import UserBasicInfo from "../../../components/Users/UserBasicInfo";
import UserBoard from "../../../components/Users/UserBoard";
import { sejongHospitalLight } from "../../../utils/fonts/textFonts";
import { UserParamsPageProps } from "../../../model/props/users";

// currently, this page is only for logged in users.
// Can't view other users' profile pages

export default async function UserPage({ params }: UserParamsPageProps) {
  const { email } = params;

  const decodedEmail = decodeURIComponent(email);

  return (
    <section
      className={`${sejongHospitalLight.className} pt-2 md:pt-3 lg:pt-4 
  pb-[100px] md:pb-[125px] lg:pb-[150px]`}
    >
      <UserBasicInfo email={decodedEmail} />

      <UserBoard email={decodedEmail} />
    </section>
  );
}
