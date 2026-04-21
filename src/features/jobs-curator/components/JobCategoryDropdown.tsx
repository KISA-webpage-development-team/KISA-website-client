"use client";

import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  Icon,
  cn,
} from "@umichkisa-ds/web";

import { useJobsCurator } from "../contexts/JobsCuratorContext";
import { JobCategory } from "../types/jobs";

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
  const { category, setCategory } = useJobsCurator();

  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex flex-row items-center gap-2 type-h2 text-foreground cursor-pointer",
            "underline decoration-transparent decoration-2 underline-offset-4 transition-[text-decoration-color,color] duration-150",
            "hover:decoration-brand-accent",
            "data-[state=open]:text-brand-primary",
            "focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
            "[&[data-state=open]>svg]:rotate-180"
          )}
        >
          <span>{category ? positionLabels[category] : "전체"}</span>
          <Icon
            name="chevron-down"
            size="md"
            className="transition-transform duration-200"
          />
        </button>
      </DropdownTrigger>
      <DropdownContent className="min-w-64">
        {(Object.entries(positionLabels) as [JobCategory, string][]).map(
          ([key, label]) => {
            const isSelected = category === key;
            return (
              <DropdownItem
                key={key}
                onSelect={() => setCategory(key)}
                className={cn(
                  "flex items-center justify-between gap-2",
                  isSelected && "!font-bold text-brand-primary"
                )}
              >
                <span>{label}</span>
                {isSelected && (
                  <Icon
                    name="check"
                    size="sm"
                    className="text-brand-primary"
                  />
                )}
              </DropdownItem>
            );
          }
        )}
      </DropdownContent>
    </Dropdown>
  );
}
