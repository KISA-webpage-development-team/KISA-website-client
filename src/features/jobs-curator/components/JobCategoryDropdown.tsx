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
import { jobCategoryLabels } from "../constant";

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
          <span>{category ? jobCategoryLabels[category] : "전체"}</span>
          <Icon
            name="chevron-down"
            size="md"
            className="transition-transform duration-200"
          />
        </button>
      </DropdownTrigger>
      <DropdownContent className="min-w-64">
        {(Object.entries(jobCategoryLabels) as [JobCategory, string][]).map(
          ([key, label]) => {
            const isSelected = category === key;
            return (
              <DropdownItem
                key={key}
                onSelect={() => setCategory(key)}
                className={cn(
                  "flex items-center justify-between gap-2",
                  isSelected && "font-bold! text-brand-primary"
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
