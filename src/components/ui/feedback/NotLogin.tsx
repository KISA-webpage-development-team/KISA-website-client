import React from "react";
import LoginButton from "@/components/layout/header/LoginButton";

type NotLoginProps = {
  callbackUrl?: string;
};

export default function NotLogin({ callbackUrl }: NotLoginProps) {
  return (
    <div
      className="md:text-lg
    w-full h-full flex flex-col items-center "
    >
      <p className="mb-2">Please sign in to continue.</p>
      <LoginButton isAuthenticated={false} callbackUrl={callbackUrl} />
    </div>
  );
}
