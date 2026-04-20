import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  Icon,
} from "@umichkisa-ds/web";

const LINKEDIN_JOBS_URL = "https://www.linkedin.com/jobs/";

export default function USAFallbackContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <a
        href={LINKEDIN_JOBS_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="explore US job opportunities on LinkedIn"
        className="block group no-underline"
      >
        <Card hoverable>
          <CardHeader>
            <Icon
              name="linkedin"
              size="md"
              className="text-brand-primary"
              aria-hidden="true"
            />
            <CardTitle>미국 취업 기회 탐색하기</CardTitle>
          </CardHeader>
          <CardFooter className="flex flex-row items-center justify-between">
            <span className="type-body-sm text-muted-foreground">
              LinkedIn Jobs에서 확인
            </span>
            <span className="flex flex-row items-center gap-2 type-body-sm text-brand-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <Icon name="external-link" size="sm" aria-hidden="true" />
              탐색하기
            </span>
          </CardFooter>
        </Card>
      </a>
    </div>
  );
}
