"use client";

// [TEST] for Next-Auth Middleware functionality

import React from "react";
import { NotLogin } from "@/components/ui/feedback";
import { signIn } from "next-auth/react";

export default function page({ searchParams }) {
  const { callbackUrl, prompt } = searchParams;

  const handleGoogleSignIn = () => {
    const options = {
      callbackUrl: callbackUrl || "/",
    };

    // If prompt=select_account is in URL, force account selection
    if (prompt === "select_account") {
      // @ts-ignore
      options.prompt = "select_account";
    }

    signIn("google", options);
  };

  return (
    <section>
      <span className="md:text-lg self-center font-bold text-michigan-blue">
        UMich 구글 이메일 계정을 사용해주세요. 외부 이메일 사용시 서비스 이용이
        제한될 수 있습니다.
      </span>
      {/* {(callbackUrl || decodeURIComponent(callbackUrl).endsWith("com/")) && ( */}
      <NotLogin handleGoogleSignIn={handleGoogleSignIn} />
      {/* )} */}
    </section>
  );
}
