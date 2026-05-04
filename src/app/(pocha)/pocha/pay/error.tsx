"use client";

import { useEffect } from "react";
import { Button, StatusView } from "@umichkisa-ds/web";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function PayError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusView
      variant="error"
      fullScreen
      title="Failed to load payment."
      description={error.message || "Please try again."}
      action={<Button onClick={reset}>Retry</Button>}
    />
  );
}
