"use client";

// [TEST] for Next-Auth Middleware functionality

import React from "react";
import { NotLogin } from "@/components/ui/feedback";
import { signIn } from "next-auth/react";

export default function page({ searchParams }) {
  const { callbackUrl } = searchParams;

  const handleGoogleSignIn = () => {
    signIn("google", {
      callbackUrl: callbackUrl || "/",
    });
  };

  return (
    <section>
      <span className="md:text-lg text-center self-center font-bold text-michigan-blue">
        Please sign in with your UMich Google email. Using an external email
        may restrict access to our services.
      </span>
      {/* {(callbackUrl || decodeURIComponent(callbackUrl).endsWith("com/")) && ( */}
      {/* @ts-ignore */}
      <NotLogin handleGoogleSignIn={handleGoogleSignIn} />
      {/* )} */}
    </section>
  );
}
