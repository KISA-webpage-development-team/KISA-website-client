"use client";

import { Button, StatusView } from "@umichkisa-ds/web";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  if (error.message.includes("Unauthorized")) {
    return <StatusView fullScreen variant="not-logged-in" />;
  } else if (error.message.includes("Not Found")) {
    return <StatusView fullScreen variant="not-found" />;
  }

  return (
    <StatusView
      fullScreen
      variant="error"
      action={<Button onClick={reset}>다시 시도하기</Button>}
    />
  );
}
