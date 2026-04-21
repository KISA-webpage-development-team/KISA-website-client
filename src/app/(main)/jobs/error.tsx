"use client";

import { Button, StatusView } from "@umichkisa-ds/web";
import { NotFound, NotLogin } from "@/components/ui/feedback";

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
    <StatusView
      variant="error"
      action={<Button onClick={reset}>다시 시도하기</Button>}
    />
  );
}
