import React from "react";
import UserEditClient from "@/final_refactor_src/features/users/components/edit/UserEditClient";
import { getSession } from "@/final_refactor_src/lib/next-auth/getSession";
import { NotAuthorized } from "@/final_refactor_src/components/feedback";

type PageProps = {
  params: {
    email: string;
  };
};

export default async function UserEditPage({ params }: PageProps) {
  // [NOTE] getSession() is a function based on next-auth
  // no need to handle missing session because of the auth middleware
  const session = await getSession();

  // [NOTE] email on the URL is encoded
  // need to decodeURIComponent to get the correct value
  const { email } = params;
  const decodedEmail = decodeURIComponent(email);

  // [Business Logic]: Only the user can edit their own information
  if (session?.user.email !== decodedEmail) {
    return <NotAuthorized />;
  }

  return (
    <section>
      <UserEditClient email={decodedEmail} session={session} />
    </section>
  );
}
