import React from "react";
import UserBasicInfo from "../../../components/Users/UserBasicInfo";
import UserBoard from "../../../components/Users/UserBoard";
import { sejongHospitalLight } from "../../../utils/fonts/textFonts";

// currently, this page is only for logged in users.
// Can't view other users' profile pages

export default async function UserPage({ params }) {
  const { email } = params;

  const decodedEmail = decodeURIComponent(email);

  return (
    <div className={`container ${sejongHospitalLight.className}`}>
      <UserBasicInfo email={decodedEmail} />

      <UserBoard email={decodedEmail} />
    </div>
  );
}
