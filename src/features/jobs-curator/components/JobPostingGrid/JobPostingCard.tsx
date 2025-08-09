import React from "react";
import { JobPosting, JobSource, JobTagBadge } from "../../types/jobs";
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
import Image from "next/image";

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

  const getSourceLogo = (source: JobSource) => {
    switch (source) {
      case "wanted-api":
        return "/jobs/wanted_logo.png";
      case "kisa":
        return "/kisa_logo.png";
      default:
        return "/kisa_logo.png";
    }
  };

  return (
    <Card
      className={`@container/card group ${sejongHospitalBold.className} cursor-pointer
      transition-all duration-300 ease-in-out
      outline-none 
      hover:bg-michigan-light-blue/10 
      hover:text-michigan-blue
      `}
    >
      <CardHeader className="h-full">
        <CardDescription
          className={`${sejongHospitalLight.className} flex flex-row items-center justify-between`}
        >
          <div className="flex items-center gap-2">
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
          className={`flex flex-row items-center justify-end w-full
            text-sm ${sejongHospitalLight.className} px-0 w-full`}
        >
          {jobPosting.dueDate && (
            <span className="flex-1">
              마감: {format(jobPosting.dueDate, "yyyy.MM.dd")}
            </span>
          )}
          <button
            onClick={navigateToJobPosting}
            className={`${sejongHospitalBold.className} 
            hover:underline 
             transition-all duration-300 ease-in-out
              flex flex-row items-center gap-2
              text-gray-400
            group-hover:text-michigan-darker-maize
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
