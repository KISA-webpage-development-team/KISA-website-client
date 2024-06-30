// User Page (/users/[email])

// This page is only for logged in users.
// Can't view other users' profile pages without logging in.

import { sejongHospitalLight } from "../../../utils/fonts/textFonts";
import { adminEmail } from "../../../config/admin";

// auth
import { getServerSession } from "next-auth";
import { authOptions } from "../../../config/auth";

// sub-ui components
import UserBasicInfo from "../../../components/Users/UserBasicInfo";
import UserBoard from "../../../components/Users/UserBoard";

// types
import { UserParamsPageProps } from "../../../model/props/users";

export default async function UserPage({ params }: UserParamsPageProps) {
  const session = await getServerSession(authOptions);

  const { email } = params;
  const decodedEmail = decodeURIComponent(email);

  if (session?.user.email !== adminEmail && decodedEmail === adminEmail) {
    return <div>권한이 없습니다.</div>;
  }

  return (
    <section
      className={`${sejongHospitalLight.className} pt-2 md:pt-3 lg:pt-4 gap-6`}
    >
      <UserBasicInfo email={decodedEmail} session={session} />

      <UserBoard email={decodedEmail} session={session} />
    </section>
  );
}

// [NOTE on rendering method]
// This page is rendered as CSR (Client Side Rendering) because it is a user-specific page.
// The page is not indexed by search engines and only the user can access it.
// If they are not logged in, they will be notified to log in.
