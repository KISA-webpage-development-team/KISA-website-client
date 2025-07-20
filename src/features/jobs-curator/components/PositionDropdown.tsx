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

// TODO: need to sync this map with BE
// also need to move this to constants file or somewhere else
// Korean labels for job categories
const positionLabels: Record<JobCategory, string> = {
  developer: "개발",
  marketing: "마케팅",
  hr: "인사",
  design: "디자인",
  sales: "영업",
};

export default function PositionDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  // NOTE: I think we need to store this in useContext globally
  const [selectedPosition, setSelectedPosition] =
    useState<JobCategory>("developer");

  const handlePositionSelect = (position: JobCategory) => {
    setSelectedPosition(position);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex flex-row items-center gap-2">
          <h2 className={`${sejongHospitalBold.className} text-2xl`}>
            {positionLabels[selectedPosition]}
          </h2>
          <ChevronDownIcon className="w-6 h-6" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 min-w-64">
        {Object.entries(positionLabels).map(([key, label]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => handlePositionSelect(key as JobCategory)}
            selected={selectedPosition === key}
            className="text-1xl"
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
