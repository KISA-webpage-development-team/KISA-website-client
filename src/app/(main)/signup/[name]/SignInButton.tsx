"use client";

import { Button } from "@umichkisa-ds/web";
import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <Button
      variant="primary"
      size="lg"
      className="w-full"
      onClick={() => signIn()}
    >
      Sign in
    </Button>
  );
}
