"use client";

import { Button } from "@nextui-org/react";
import { signIn, signOut } from "next-auth/react";
import React from "react";
import { heebo } from "@/utils/fonts/textFonts";

export default function LoginButton({
  session = false,
  size = "md",
  handleGoogleSignIn,
}) {
  const buttonStyle =
    "bg-white text-black shadow-lg font-bold hover:bg-gray-100";

  return session ? (
    <Button
      className={`${buttonStyle} ${heebo.className}`}
      onPress={() => signOut()}
      size={size}
    >
      로그아웃
    </Button>
  ) : (
    <Button
      className={`${buttonStyle} ${heebo.className}`}
      onPress={() => handleGoogleSignIn()}
      size={size}
    >
      로그인
    </Button>
  );
}
