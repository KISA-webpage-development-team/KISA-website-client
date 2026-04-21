"use client";

// NOTE: DateRangePicker is intentionally commented out for MVP — the wanted
// jobs API does not expose a date-range filter yet. Keep the context wiring
// (startDate/endDate) in JobsCuratorContext so this block can be restored in
// one edit when the API ships the filter. See plan Lane 1.4 §Q3.

import { ToggleGroup, Label } from "@umichkisa-ds/web";
import { useJobsCurator } from "../../contexts/JobsCuratorContext";
import { internshipTypeLabels } from "../../constant";
import type { InternshipType, SupportedCountry } from "../../types/jobs";

const countryItems = [
  { value: "KR", label: "한국" },
  { value: "US", label: "미국" },
];

const employmentItems = [
  { value: "intern", label: "인턴" },
  { value: "fulltime", label: "정규직" },
];

const internshipItems = [
  { value: "experiential", label: internshipTypeLabels.experiential },
  { value: "convertible", label: internshipTypeLabels.convertible },
  { value: "global", label: internshipTypeLabels.global },
];

export default function TagList() {
  const {
    country,
    setCountry,
    employmentType,
    setEmploymentType,
    internshipTypes,
    setInternshipTypes,
  } = useJobsCurator();

  const isKorea = country === "KR";
  const employmentValue = employmentType === "fulltime" ? "fulltime" : "intern";

  const handleEmploymentChange = (value: string) => {
    if (value === "intern") {
      setEmploymentType("intern");
    } else if (value === "fulltime") {
      setEmploymentType("fulltime");
      setInternshipTypes([]);
    }
  };

  const handleInternshipChange = (values: string[]) => {
    setInternshipTypes(values as InternshipType[]);
  };

  return (
    <div className="rounded-md border border-border bg-surface p-4 flex flex-col gap-4 md:flex-row md:items-end md:gap-4">
      <div className="flex flex-col gap-2">
        <Label id="country-label" htmlFor="country-group">
          지역
        </Label>
        <ToggleGroup
          id="country-group"
          aria-labelledby="country-label"
          items={countryItems}
          value={country}
          onValueChange={(v) => setCountry(v as SupportedCountry)}
        />
      </div>

      {isKorea && (
        <div className="flex flex-col gap-2 md:pl-4 md:border-l md:border-border">
          <Label id="employment-label" htmlFor="employment-group">
            고용 형태
          </Label>
          <ToggleGroup
            id="employment-group"
            aria-labelledby="employment-label"
            items={employmentItems}
            value={employmentValue}
            onValueChange={handleEmploymentChange}
          />
        </div>
      )}

      {isKorea && employmentType === "intern" && (
        <div className="flex flex-col gap-2 md:pl-4 md:border-l md:border-border">
          <div className="flex items-baseline gap-2">
            <Label id="intern-track-label" htmlFor="intern-track-group">
              인턴십 유형
            </Label>
            <span className="type-caption text-muted-foreground">
              복수 선택
            </span>
          </div>
          <ToggleGroup
            id="intern-track-group"
            type="multiple"
            aria-labelledby="intern-track-label"
            items={internshipItems}
            value={internshipTypes}
            onValueChange={handleInternshipChange}
          />
        </div>
      )}

      {/*
        MVP: date-range filter deferred — API does not filter by range yet.
        To re-enable: restore DateRangePicker + DateRange imports, re-add
        startDate/endDate/setStartDate/setEndDate to the useJobsCurator
        destructure above, and reinstate the block below.

        <div className="flex flex-col gap-2 md:ml-auto md:pl-4 md:border-l md:border-border">
          <Label id="date-range-label" htmlFor="date-range-picker">기간</Label>
          <DateRangePicker
            aria-labelledby="date-range-label"
            value={{ from: startDate, to: endDate }}
            onChange={(range) => {
              if (range?.from && range?.to) {
                setStartDate(range.from);
                setEndDate(range.to);
              }
            }}
          />
        </div>
      */}
    </div>
  );
}
