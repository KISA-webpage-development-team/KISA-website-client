"use client";

import React, { useMemo, useState } from "react";
import { CountryDropdown } from "./CountryDropdown";
import TagButton from "./TagButton";
import EmploymentTypeDetailModal from "./EmploymentTypeDetailModal";
import { useJobsCurator } from "../../contexts/JobsCuratorContext";
import { formatTagToLabel } from "../../utils/formatTagToLabel";
import { internshipTypeLabels } from "../../constant";
import { InternshipType } from "../../types/jobs";
// import DateRangeDetailModal from "./DateRangeDetailModal";
// import { addMonths } from "date-fns";
// import { formatKoreanDate } from "../../utils/date";

// NOTE: for MVP, we don't support date range filter
// because wanted api data doesn't have it

// Main TagList component
export default function TagList() {
  const { employmentType, internshipTypes } = useJobsCurator();

  // employment type modal
  const [isEmploymentTypeModalOpen, setIsEmploymentTypeModalOpen] =
    useState(false);

  const employmentTypeLabel = useMemo(() => {
    if (employmentType === "intern") {
      const allTypes = Object.keys(internshipTypeLabels) as InternshipType[];

      // if all types are selected, show "전체"
      const allSelected =
        internshipTypes.length === allTypes.length &&
        allTypes.every((type) => internshipTypes.includes(type));
      return `인턴 (${
        allSelected
          ? "전체"
          : internshipTypes.map((type) => formatTagToLabel(type)).join(", ")
      })`;
    }
    return formatTagToLabel(employmentType);
  }, [employmentType, internshipTypes]);

  // date range modal
  // const [isDateRangeModalOpen, setIsDateRangeModalOpen] = useState(false);

  // const dateRangeLabel = useMemo(() => {
  //   const label = employmentType === "intern" ? "기간" : "시작";

  //   if (employmentType === "intern") {
  //     return `${label}: ${formatKoreanDate(startDate)} ~ ${formatKoreanDate(
  //       endDate ?? addMonths(startDate, 3)
  //     )}`;
  //   } else {
  //     // no end date for fulltime
  //     return `${label}: ${formatKoreanDate(startDate)}`;
  //   }
  // }, [employmentType, startDate, endDate]);

  return (
    <>
      <div className="flex flex-row gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <CountryDropdown />
        <TagButton
          label={employmentTypeLabel}
          onClick={() => setIsEmploymentTypeModalOpen(true)}
        />
        {/* <TagButton
          label={dateRangeLabel}
          onClick={() => setIsDateRangeModalOpen(true)}
        /> */}
      </div>

      <EmploymentTypeDetailModal
        isOpen={isEmploymentTypeModalOpen}
        onClose={() => setIsEmploymentTypeModalOpen(false)}
      />

      {/* <DateRangeDetailModal
        isOpen={isDateRangeModalOpen}
        onClose={() => setIsDateRangeModalOpen(false)}
      /> */}
    </>
  );
}
