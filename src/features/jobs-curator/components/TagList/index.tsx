"use client";

import React, { useState } from "react";
import { sejongHospitalLight } from "@/utils/fonts/textFonts";
import TagDetailModal from "./TagDetailModal";
import { CountryDropdown } from "./CountryDropdown";
import TagButton from "./TagButton";
import EmploymentTypeDetailModal from "./EmploymentTypeDetailModal";

// Duration Filter Modal
export function DurationTagDetailModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [selectedDuration, setSelectedDuration] = useState("단기");

  const durations = [
    { value: "단기", label: "단기 (1-3개월)" },
    { value: "중기", label: "중기 (3-6개월)" },
    { value: "장기", label: "장기 (6개월+)" },
  ];

  return (
    <TagDetailModal isOpen={isOpen} onClose={onClose} title="기간">
      <div className="flex h-full">
        {/* Left Pane - Duration Selection */}
        <div className="w-1/2 border-r p-4 overflow-y-auto">
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${sejongHospitalLight.className}`}
            >
              기간
            </label>
            <div className="space-y-1">
              {durations.map((duration) => (
                <button
                  key={duration.value}
                  onClick={() => setSelectedDuration(duration.value)}
                  className={`w-full text-left p-2 rounded ${
                    selectedDuration === duration.value
                      ? "bg-gray-100 text-blue-600"
                      : "hover:bg-gray-50"
                  } ${sejongHospitalLight.className}`}
                >
                  {duration.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Pane - Information */}
        <div className="w-1/2 p-4 flex items-center justify-center">
          <p
            className={`text-gray-500 text-center ${sejongHospitalLight.className}`}
          >
            기간을 선택하면 상세 정보를 확인할 수 있습니다.
          </p>
        </div>
      </div>
    </TagDetailModal>
  );
}

// Main TagList component
export default function TagList() {
  const [isEmploymentTypeModalOpen, setIsEmploymentTypeModalOpen] =
    useState(false);

  return (
    <>
      <div className="flex flex-row gap-2">
        <CountryDropdown />
        <TagButton
          label={"인턴"}
          onClick={() => setIsEmploymentTypeModalOpen(true)}
        />
      </div>

      <EmploymentTypeDetailModal
        isOpen={isEmploymentTypeModalOpen}
        onClose={() => setIsEmploymentTypeModalOpen(false)}
      />
    </>
  );
}
