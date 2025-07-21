"use client";

import React from "react";

import { LoadingSpinner } from "@/components/ui/feedback";
import useJobs from "@/features/jobs-curator/hooks/useJobs";
import PositionDropdown from "@/features/jobs-curator/components/PositionDropdown";
import TagList from "@/features/jobs-curator/components/TagList";
import JobPostingGrid from "@/features/jobs-curator/components/JobPostingGrid";

export default function JobsCuratorPage() {
  const { jobs, status, error } = useJobs();

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (status === "error") {
    throw new Error(error || "Unexpected error occurred");
  }

  return (
    <section>
      {/*  직군 선택 Dropdown (Heading) */}
      <div className="mt-2 sm:mt-0">
        <PositionDropdown />
      </div>

      {/* Tag List */}
      <div className="sm:mt-2">
        <TagList />
      </div>

      {/* Job Posting Cards */}
      <div className="sm:mt-2">
        <JobPostingGrid jobs={jobs} />
      </div>
    </section>
  );
}
