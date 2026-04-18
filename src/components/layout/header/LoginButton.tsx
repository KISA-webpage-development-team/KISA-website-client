"use client";

import React from "react";
import { Button } from "@umichkisa-ds/web";
import { signIn, signOut } from "next-auth/react";
import { useMockAuth } from "@/mocks/authContext";

type LoginButtonProps = {
  isAuthenticated: boolean;
  size?: "sm" | "md";
};

function LoginButton({ isAuthenticated, size = "md" }: LoginButtonProps) {
  const { isMockMode, toggle } = useMockAuth();

  const handleClick = () => {
    if (isMockMode) {
      toggle();
      return;
    }
    if (isAuthenticated) {
      signOut();
    } else {
      signIn("google", { callbackUrl: "/" });
    }
  };

  return (
    <Button variant="secondary" size={size} onClick={handleClick}>
      {isAuthenticated ? "로그아웃" : "로그인"}
    </Button>
  );
}

export default React.memo(LoginButton);
