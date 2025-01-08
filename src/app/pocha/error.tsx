"use client";
import {
  NotFound,
  NotLogin,
  UnexpectedError,
} from "@/final_refactor_src/components/feedback";

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
    <div className="flex flex-col items-center justify-center">
      <UnexpectedError />
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={reset}
      >
        Try Again
      </button>
    </div>
  );
}
