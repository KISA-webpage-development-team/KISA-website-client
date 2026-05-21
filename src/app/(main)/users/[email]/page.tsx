"use client";

// /users/[email] — member-directory profile.
// Hybrid surface: hero card + activity board (posts/comments tabs).
//
// Auth gates (preserved verbatim):
//   - useAuth() session → if no session, render <NotLogin />.
//   - if decodedEmail.includes(KISA_EMAIL) && !session.user.email.includes(KISA_EMAIL)
//     → <NotAuthorized /> (KISA-org email rule).
//
// Client component: session is read via AuthContext so mock-mode (sessionStorage-backed
// MOCK_SESSION) and real next-auth both flow through the same boundary.

import { KISA_EMAIL } from "@/constants/email";
import { useAuth } from "@/lib/auth/authContext";

import UserProfileHero from "@/features/users/components/view/UserProfileHero";
import UserActivityBoard from "@/features/users/components/view/UserActivityBoard";

import { NotLogin, NotAuthorized } from "@/components/ui/feedback";

type UserViewPageProps = {
  params: {
    email: string;
  };
};

export default function UserViewPage({ params }: UserViewPageProps) {
  const { session } = useAuth();

  // [NOTE] email on the URL is encoded; decode for fetch + comparison.
  const { email } = params;
  const decodedEmail = decodeURIComponent(email);

  if (!session) {
    return <NotLogin />;
  }

  // [Business Logic] Only KISA email is allowed to access KISA's user page.
  if (
    decodedEmail.includes(KISA_EMAIL) &&
    !session?.user?.email.includes(KISA_EMAIL)
  ) {
    return <NotAuthorized />;
  }

  return (
    <section className="flex flex-col gap-6">
      <UserProfileHero
        email={decodedEmail}
        token={session.token}
        sessionEmail={session.user.email}
        sessionImage={session.user.image}
      />
      <UserActivityBoard email={decodedEmail} token={session.token} />
    </section>
  );
}
