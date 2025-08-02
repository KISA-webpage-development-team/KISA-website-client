import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { FiExternalLink } from "react-icons/fi";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "@/utils/fonts/textFonts";
import LinkedInIcon from "@/components/ui/icon/LinkedInIcon";

const LinkedInLink = "https://www.linkedin.com/jobs/";

export default function USAFallbackContent() {
  const navigateToLinkedIn = () => {
    window.open(LinkedInLink, "_blank");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      <Card
        className={`@container/card group ${sejongHospitalBold.className} cursor-pointer
        transition-all duration-300 ease-in-out
        outline-none
        hover:bg-michigan-light-blue/10 hover:scale-105
        hover:text-michigan-blue
        `}
        onClick={navigateToLinkedIn}
      >
        <CardHeader>
          <CardDescription
            className={`${sejongHospitalLight.className} flex flex-row items-center justify-between`}
          >
            <LinkedInIcon />
          </CardDescription>
          <CardTitle
            className={`text-lg transition-all duration-300 ease-in-out`}
          >
            미국 취업 기회 탐색하기
          </CardTitle>

          <CardFooter
            className={`flex flex-row items-center justify-between
              text-sm ${sejongHospitalLight.className} px-0 w-full`}
          >
            <span>LinkedIn Jobs에서 확인</span>
            <button
              className={`${sejongHospitalBold.className} hidden hover:underline 
               transition-all duration-300 ease-in-out
               group-hover:flex flex-row items-center gap-2
               text-michigan-darker-maize
               `}
              aria-label="explore US job opportunities on LinkedIn"
            >
              <FiExternalLink className="w-4 h-4" />
              <span>탐색하기</span>
            </button>
          </CardFooter>
        </CardHeader>
      </Card>
    </div>
  );
}
