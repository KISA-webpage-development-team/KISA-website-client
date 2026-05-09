// /users/edit/[email] — self-only profile editor.
//
// Auth gates (preserved verbatim):
//   - getSession() → if no session, render <NotLogin />.
//   - session.user.email !== decodedEmail → <NotAuthorized />.

import { getSession } from "@/lib/next-auth/getSession";

import UserEditFormCard from "@/features/users/components/edit/UserEditFormCard";
import { NotAuthorized, NotLogin } from "@/components/ui/feedback";

type UserEditPageProps = {
  params: {
    email: string;
  };
};

export default async function UserEditPage({ params }: UserEditPageProps) {
  const session = await getSession();

  const { email } = params;
  const decodedEmail = decodeURIComponent(email);

  if (!session) {
    return <NotLogin />;
  }

  // [Business Logic] Only the user can edit their own information.
  if (session?.user.email !== decodedEmail) {
    return <NotAuthorized />;
  }

  return (
    <section>
      <UserEditFormCard
        email={decodedEmail}
        token={session.token}
        sessionImage={session.user.image}
      />
    </section>
  );
}
