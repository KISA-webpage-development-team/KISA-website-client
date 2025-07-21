import React from "react";
import { JobPosting, JobTagBadge } from "../../types/jobs";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { Badge } from "@/components/ui/shadcn/badge";
import { FiExternalLink } from "react-icons/fi";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "@/utils/fonts/textFonts";
import { format } from "date-fns";

interface JobPostingCardProps {
  jobPosting: JobPosting;
  jobBadges: JobTagBadge[];
}

export default function JobPostingCard({
  jobPosting,
  jobBadges,
}: JobPostingCardProps) {
  const navigateToJobPosting = () => {
    window.open(jobPosting.link, "_blank");
  };

  return (
    <Card
      className={`@container/card group ${sejongHospitalBold.className} cursor-pointer
      transition-all duration-300 ease-in-out
      outline-none
      hover:bg-michigan-light-blue/10 hover:scale-105
      hover:text-michigan-blue
      `}
    >
      <CardHeader>
        <CardDescription
          className={`${sejongHospitalLight.className} flex flex-row items-center justify-between`}
        >
          <span>{jobPosting.company}</span>
          <div className="flex flex-row items-center gap-2">
            {jobBadges.map((badge) => (
              <Badge
                key={badge}
                variant="outline"
                className={`${sejongHospitalLight.className}
            border-gray-400 
              group-hover:border-michigan-blue transition-all duration-300 ease-in-out`}
              >
                {badge}
              </Badge>
            ))}
          </div>
        </CardDescription>
        <CardTitle
          className={`text-lg transition-all duration-300 ease-in-out`}
        >
          {jobPosting.position}
        </CardTitle>

        <CardFooter
          className={`flex flex-row items-center justify-between
            text-sm ${sejongHospitalLight.className} px-0 w-full`}
        >
          <span>마감: {format(jobPosting.dueDate, "yyyy.MM.dd")}</span>
          <button
            onClick={navigateToJobPosting}
            className={`${sejongHospitalBold.className} hidden hover:underline 
             transition-all duration-300 ease-in-out
             group-hover:flex flex-row items-center gap-2
             text-michigan-darker-maize
             `}
            aria-label="apply to job"
          >
            <FiExternalLink className="w-4 h-4" />
            <span>지원하기</span>
          </button>
        </CardFooter>
      </CardHeader>
    </Card>
  );
}
