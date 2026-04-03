import React from "react";
import LoginButton from "@/components/layout/header/LoginButton";
import { signIn } from "next-auth/react";

export default function NotLogin({
  handleGoogleSignIn = () => signIn("google", { callbackUrl: "/" }),
}) {
  return (
    <div
      className="md:text-lg 
    w-full h-full flex flex-col items-center "
    >
      <p className="mb-2">Please sign in to continue.</p>
      <LoginButton handleGoogleSignIn={handleGoogleSignIn} />
    </div>
  );
}
