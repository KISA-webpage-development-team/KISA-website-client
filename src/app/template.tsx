import { ReactNode } from "react";

import { getServerSession } from "next-auth";
import authOptions from "@/lib/next-auth/authOptions";
import { getIsAdmin } from "@/apis/auth/queries";
import { UnderConstruction } from "@/components/ui/feedback";

// Root template — applies to ALL routes (main + pocha).
// Owns ONLY the UnderConstruction gate, since BE outages affect both apps.
// Header / Footer / session-for-Header live in (main)/layout.tsx.
export default async function Template({ children }: { children: ReactNode }) {
  // flag to show under construction page
  const underConstruction = false;

  if (!underConstruction) return <>{children}</>;

  const session = await getServerSession(authOptions);
  const isAdmin = await getIsAdmin(session?.user?.email, session?.token);

  return isAdmin ? <>{children}</> : <UnderConstruction />;
}
