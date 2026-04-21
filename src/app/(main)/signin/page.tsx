"use client";

// [TEST] for Next-Auth Middleware functionality

import React from "react";
import { NotLogin } from "@/components/ui/feedback";

export default function page({ searchParams }) {
  const { callbackUrl } = searchParams;

  return (
    <section>
      <span className="md:text-lg text-center self-center font-bold text-michigan-blue">
        Please sign in with your UMich Google email. Using an external email
        may restrict access to our services.
      </span>
      <NotLogin callbackUrl={callbackUrl || "/"} />
    </section>
  );
}
