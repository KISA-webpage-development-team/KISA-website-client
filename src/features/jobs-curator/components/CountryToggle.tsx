"use client";

import React from "react";
import { ToggleGroup } from "@umichkisa-ds/web";

import { useJobsCurator } from "../contexts/JobsCuratorContext";
import type { SupportedCountry } from "../types/jobs";

const COUNTRY_ITEMS: { value: SupportedCountry; label: string }[] = [
  { value: "KR", label: "한국" },
  { value: "US", label: "미국" },
];

export default function CountryToggle() {
  const { country, setCountry } = useJobsCurator();

  return (
    <ToggleGroup
      type="single"
      items={COUNTRY_ITEMS}
      value={country}
      onValueChange={(v) => setCountry(v as SupportedCountry)}
      aria-label="국가 선택"
    />
  );
}
