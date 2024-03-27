"use client";

import { signIn, signOut } from "next-auth/react";
import React from "react";

export default function LoginButton({ session = false }) {
  return session ? (
    <button className="simple_button" onClick={() => signOut()}>
      로그아웃
    </button>
  ) : (
    <button className="simple_button" onClick={() => signIn("google")}>
      로그인
    </button>
  );
}
