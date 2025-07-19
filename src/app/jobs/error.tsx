"use client";

import { CustomButton } from "@/components/ui/button";
import { NotFound, NotLogin, UnexpectedError } from "@/components/ui/feedback";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  if (error.message.includes("Unauthorized")) {
    return <NotLogin />;
  } else if (error.message.includes("Not Found")) {
    return <NotFound />;
  }

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <UnexpectedError />
      <CustomButton onClick={reset} text="다시 시도하기" />
    </div>
  );
}
