"use client";

import React, { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";
import { JobCategory } from "../types/jobs";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import { useJobsCurator } from "../contexts/JobsCuratorContext";

// label coming from BE - wanted
// TODO: in the future with more job sources,
// we need to find a better way to handle this
const positionLabels: Record<JobCategory, string> = {
  developer: "개발",
  engineering: "엔지니어링·설계",
  finance: "금융",
  business: "경영·비즈니스",
  marketing: "마케팅·광고",
  design: "디자인",
  hr: "HR",
  medical: "의료·제약·바이오",
  sales: "영업",
  customer_service: "고객서비스·리테일",
  media: "미디어",
  manufacturing: "제조·생산",
  logistics: "물류·무역",
  game: "게임 제작",
  security: "정보보호",
  education: "교육",
  legal: "법률·법집행기관",
  food: "식·음료",
  construction: "건설·시설",
  public: "공공·복지",
};

export default function JobCategoryDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  // NOTE: I think we need to store this in useContext globally
  const { category, setCategory } = useJobsCurator();

  const handlePositionSelect = (position: JobCategory) => {
    setCategory(position);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex flex-row items-center gap-2">
          <h2 className={`${sejongHospitalBold.className} text-2xl`}>
            {category ? positionLabels[category] : "전체"}
          </h2>
          <ChevronDownIcon className="w-6 h-6" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 min-w-64 max-h-64 overflow-y-auto">
        {Object.entries(positionLabels).map(([key, label]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => handlePositionSelect(key as JobCategory)}
            selected={category === key}
            className="text-1xl"
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
