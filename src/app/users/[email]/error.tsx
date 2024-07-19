"use client"; // Error components must be Client Components

// [NOTE] currently this is for testing. not done yet.

import { CustomAxiosError } from "@/refactor_src/shared/axios/types";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: CustomAxiosError;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    // console.log(error.response.status);
    // console.log(error.response.data);
  }, [error]);

  return (
    <div>
      <span>{error.response?.status}</span>
      <span>{error.response?.data.error}</span>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
