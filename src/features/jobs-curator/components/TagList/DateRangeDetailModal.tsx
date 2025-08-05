import React, { useState, useEffect, useMemo } from "react";
import TagDetailModal from "./TagDetailModal";
import { Calendar } from "@/components/ui/shadcn/calendar";
import { type DateRange } from "react-day-picker";
import { addMonths, format, isBefore } from "date-fns";
import { ko } from "date-fns/locale";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "@/utils/fonts/textFonts";
import { useJobsCurator } from "../../contexts/JobsCuratorContext";
import { formatKoreanDate, isPastLocal } from "../../utils/date";

export default function DateRangeDetailModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const {
    employmentType,
    startDate: globalStartDate,
    setStartDate: setGlobalStartDate,
    endDate: globalEndDate,
    setEndDate: setGlobalEndDate,
  } = useJobsCurator();
  const isInternship = employmentType === "intern";

  // Local state for date range
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: globalStartDate,
    to: globalEndDate,
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    globalStartDate
  );
  const [dateError, setDateError] = useState<string | undefined>(undefined);

  // Sync local state with global state when modal opens
  useEffect(() => {
    if (isOpen) {
      setDateRange({ from: globalStartDate, to: globalEndDate });
      setSelectedDate(globalStartDate);
    }
  }, [isOpen, globalStartDate, globalEndDate]);

  // when switch from fulltime to internship, global end date is undefined
  // need to set to + 3 months from global start date
  useEffect(() => {
    if (employmentType === "intern" && globalEndDate === undefined) {
      setGlobalEndDate(addMonths(globalStartDate, 3));
      setDateRange({
        from: globalStartDate,
        to: addMonths(globalStartDate, 3),
      });
    }
  }, [employmentType]);

  // Date error validation (moved to useEffect)
  useEffect(() => {
    if (isInternship) {
      if (dateRange?.from && isPastLocal(dateRange.from)) {
        setDateError("시작일이 과거입니다.");
        return;
      } else if (dateRange?.to && isBefore(dateRange.to, dateRange.from)) {
        setDateError("종료일이 시작일보다 이전입니다.");
        return;
      }
    } else {
      if (selectedDate && isPastLocal(selectedDate)) {
        setDateError("시작일이 과거입니다.");
        return;
      }
    }

    setDateError(undefined);
  }, [selectedDate, dateRange, isInternship]);

  const isApplyDisabled = !!dateError;

  const handleApply = () => {
    if (isInternship) {
      setGlobalStartDate(dateRange?.from);
      setGlobalEndDate(dateRange?.to);
    } else {
      setGlobalStartDate(selectedDate);
      setGlobalEndDate(undefined);
    }
    onClose();
  };

  const handleReset = () => {
    setDateRange({ from: globalStartDate, to: globalEndDate });
    setSelectedDate(globalStartDate);
  };

  return (
    <TagDetailModal
      isOpen={isOpen}
      onClose={onClose}
      title="근무 기간"
      onApply={handleApply}
      onReset={handleReset}
      isApplyDisabled={isApplyDisabled}
    >
      <div className="flex flex-col w-full p-2 overflow-y-auto gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-2">
            <label
              className={`block text-sm font-medium ${sejongHospitalLight.className}`}
            >
              시작:{" "}
            </label>
            <div className={`${sejongHospitalBold.className} text-black`}>
              {isInternship
                ? dateRange?.from
                  ? formatKoreanDate(dateRange.from)
                  : "선택되지 않음"
                : formatKoreanDate(selectedDate)}
            </div>
          </div>
          {isInternship && (
            <div className="flex flex-row items-center gap-2">
              <label
                className={`block text-sm font-medium ${sejongHospitalLight.className}`}
              >
                종료:{" "}
              </label>
              <div className={`${sejongHospitalBold.className} text-black`}>
                {dateRange?.to
                  ? formatKoreanDate(dateRange.to)
                  : "선택되지 않음"}
              </div>
            </div>
          )}

          {/* error */}
          {dateError && (
            <span
              className={`text-red-500 text-xs ${sejongHospitalLight.className}`}
            >
              {dateError}
            </span>
          )}
        </div>
        {isInternship ? (
          <Calendar
            mode={"range"}
            locale={ko}
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={1}
            className="rounded-lg border shadow-sm"
          />
        ) : (
          <Calendar
            mode={"single"}
            locale={ko}
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-lg border shadow-sm"
          />
        )}
      </div>
    </TagDetailModal>
  );
}
