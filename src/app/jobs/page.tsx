"use client";

import React from "react";

import { LoadingSpinner } from "@/components/ui/feedback";
import useJobs from "@/features/jobs-curator/hooks/useJobs";

export default function JobsCuratorPage() {
  const { jobs, status, error } = useJobs();

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (status === "error") {
    throw new Error(error || "Unexpected error occurred");
  }

  return <div>JobsCuratorPage</div>;
}
