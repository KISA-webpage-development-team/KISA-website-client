"use client";

// /users/edit/[email] — self-only profile editor.
//
// Auth gates (preserved verbatim):
//   - useAuth() session → if no session, render <NotLogin />.
//   - session.user.email !== decodedEmail → <NotAuthorized />.
//
// Client component: session is read via AuthContext so mock-mode (sessionStorage-backed
// MOCK_SESSION) and real next-auth both flow through the same boundary.

import { useAuth } from "@/lib/auth/authContext";

import UserEditFormCard from "@/features/users/components/edit/UserEditFormCard";
import { NotAuthorized, NotLogin } from "@/components/ui/feedback";

type UserEditPageProps = {
  params: {
    email: string;
  };
};

export default function UserEditPage({ params }: UserEditPageProps) {
  const { session } = useAuth();

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
