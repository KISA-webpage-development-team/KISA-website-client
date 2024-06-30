import React from "react";
import UserEditClient from "../../../../components/Users/UserEditClient";
import { UserParamsPageProps } from "../../../../model/props/users";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../config/auth";

export default async function UserEditPage({ params }: UserParamsPageProps) {
  const session = await getServerSession(authOptions);

  const { email } = params;
  const decodedEmail = decodeURIComponent(email);

  // page view validity check
  if (session?.user.email !== decodedEmail) {
    return <div>권한이 없습니다</div>;
  }

  return (
    <section
      className="pt-2 md:pt-3 lg:pt-4 
  "
    >
      <UserEditClient email={decodedEmail} session={session} />
    </section>
  );
}
