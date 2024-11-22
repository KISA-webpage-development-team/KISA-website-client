"use client";

import { getIsAdmin } from "@/apis/auth/queries";
import { NotAuthorized } from "@/final_refactor_src/components/feedback";
import { UserSession } from "@/lib/next-auth/types";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
// [TODO] put this page into auth middleware (no need to handle missing session)

export default function DashboardPage() {
  const { data: session, status } = useSession() as {
    data: UserSession | undefined;
    status: string;
  };

  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const fetchIsAdmin = async () => {
      try {
        const res = await getIsAdmin(session?.user.email, session?.token);
        if (res) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error(
          "[DashboardPage] error while fetching admin status",
          error
        );
      }
    };

    if (session) {
      fetchIsAdmin();
    }
  }, [session]);

  // only admin can view this page
  if (!isAdmin) {
    return <NotAuthorized />;
  }

  return <section>wow</section>;
}
