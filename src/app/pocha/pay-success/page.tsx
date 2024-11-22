"use client";

import { updateCartIsPaidMock } from "@/apis/pocha/mutations";
import { UserSession } from "@/lib/next-auth/types";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function PaySuccessPage() {
  const searchParams = useSearchParams();
  const pochaID = parseInt(searchParams.get("pochaid"));

  const { data: session, status } = useSession() as {
    data: UserSession | undefined;
    status: string;
  };

  useEffect(() => {
    // send update isPaid order API
    const changeCartToPaid = async () => {
      try {
        const res = await updateCartIsPaidMock(session?.user?.email, pochaID);

        if (!res) {
          console.error("Error while updating cart status");
          // THIS SHOULD BE HANDLED BETTER
        }

        console.log("success");
      } catch (error) {
        console.error("Error while updating cart status", error);

        // THIS SHOULD BE HANDLED BETTER
      }
    };

    if (session && pochaID) {
      changeCartToPaid();
    }
  }, [session, pochaID]);
  return <div>page</div>;
}
