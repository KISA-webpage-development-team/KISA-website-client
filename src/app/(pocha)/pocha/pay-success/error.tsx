"use client";

import { useEffect } from "react";
import { Button, StatusView } from "@umichkisa-ds/web";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function PaySuccessError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusView
      variant="error"
      fullScreen
      title="Failed to load order confirmation."
      description={error.message || "Please try again."}
      action={<Button onClick={reset}>Retry</Button>}
    />
  );
}
