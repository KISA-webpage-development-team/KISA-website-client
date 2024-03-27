"use client";

import { signIn } from "next-auth/react";
import React from "react";

export default function SignUpSuccessPage({ params }) {
  const { name } = params;
  const decodedName = decodeURIComponent(name);
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <p className="text-xl mb-4">{`${decodedName}님 환영합니다!`}</p>{" "}
      <button className="blue_button" onClick={() => signIn()}>
        로그인
      </button>
    </div>
  );
}
