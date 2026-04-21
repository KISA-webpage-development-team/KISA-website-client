import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import {
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  Icon,
} from "@umichkisa-ds/web";

import { JobPosting, JobSource, JobTagBadge } from "../../types/jobs";

interface JobPostingCardProps {
  jobPosting: JobPosting;
  jobBadges: JobTagBadge[];
}

function getSourceLogo(source: JobSource) {
  switch (source) {
    case "wanted-api":
      return "/jobs/wanted_logo.png";
    case "kisa":
      return "/kisa_logo.png";
    default:
      return "/kisa_logo.png";
  }
}

export default function JobPostingCard({
  jobPosting,
  jobBadges,
}: JobPostingCardProps) {
  return (
    <a
      href={jobPosting.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`apply to ${jobPosting.position} at ${jobPosting.company}`}
      className="block group no-underline h-full"
    >
      <Card hoverable className="h-full">
        <CardHeader>
          <div className="flex flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2 type-body-sm text-muted-foreground">
              <span>{jobPosting.company}</span>
              <Image
                src={getSourceLogo(jobPosting.source)}
                alt={`${jobPosting.source} logo`}
                width={25}
                height={25}
              />
            </div>
            <div className="flex flex-row items-center gap-2">
              {jobBadges.map((badge) => (
                <Badge key={badge} variant="outline">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
          <CardTitle>{jobPosting.position}</CardTitle>
        </CardHeader>
        <CardFooter className="flex flex-row items-center justify-between">
          {jobPosting.dueDate ? (
            <span className="type-body-sm text-muted-foreground">
              마감: {format(jobPosting.dueDate, "yyyy.MM.dd")}
            </span>
          ) : (
            <span />
          )}
          <span className="flex flex-row items-center gap-2 type-body-sm text-brand-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <Icon name="external-link" size="sm" aria-hidden="true" />
            지원하기
          </span>
        </CardFooter>
      </Card>
    </a>
  );
}
