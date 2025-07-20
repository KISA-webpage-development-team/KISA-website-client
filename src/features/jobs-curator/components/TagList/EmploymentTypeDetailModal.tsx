import { useState } from "react";
import TagDetailModal from "./TagDetailModal";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "@/utils/fonts/textFonts";
import { EmploymentType, InternshipType } from "../../types/jobs";
import DateInputField from "./DateInputField";

const levels: { value: EmploymentType; label: string }[] = [
  { value: "fulltime", label: "신입" },
  { value: "internship", label: "인턴" },
];

const internshipTypes: { value: InternshipType; label: string }[] = [
  { value: "experiential", label: "체험형" },
  { value: "convertible", label: "전환형" },
  { value: "global", label: "해외대학형" },
];

export default function EmploymentTypeDetailModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [selectedLevel, setSelectedLevel] =
    useState<EmploymentType>("fulltime");
  const [selectedTypes, setSelectedTypes] = useState<InternshipType[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [startCalendarOpen, setStartCalendarOpen] = useState(false);
  const [endCalendarOpen, setEndCalendarOpen] = useState(false);

  const handleLevelSelect = (level: EmploymentType) => {
    setSelectedLevel(level);
    // Clear selected types when switching to fulltime
    if (level === "fulltime") {
      setSelectedTypes([]);
    }
  };

  const handleTypeToggle = (type: InternshipType) => {
    setSelectedTypes((prev) => {
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  const handleStartCalendarOpen = () => {
    setEndCalendarOpen(false);
  };

  const handleEndCalendarOpen = () => {
    setStartCalendarOpen(false);
  };

  const handleStartOpenChange = (open: boolean) => {
    setStartCalendarOpen(open);
    if (open) {
      setEndCalendarOpen(false);
    }
  };

  const handleEndOpenChange = (open: boolean) => {
    setEndCalendarOpen(open);
    if (open) {
      setStartCalendarOpen(false);
    }
  };

  // Form validation logic
  const isApplyDisabled = () => {
    // For 신입 (fulltime): no required fields
    if (selectedLevel === "fulltime") {
      return false;
    }

    // For 인턴 (internship): at least one 채용유형 is required
    if (selectedLevel === "internship") {
      return selectedTypes.length === 0;
    }

    return true; // Default to disabled
  };

  return (
    <TagDetailModal
      isOpen={isOpen}
      onClose={onClose}
      title="채용유형"
      isApplyDisabled={isApplyDisabled()}
    >
      <div className="flex h-full">
        {/* Left Pane - Employment Level */}
        <div className="w-1/2 border-r p-4 overflow-y-auto">
          <div className="mb-4">
            <label
              className={`block text-sm font-medium mb-2 ${sejongHospitalLight.className}`}
            >
              고용형태
            </label>
            <div className="space-y-1">
              {levels.map((level) => (
                <button
                  key={level.value}
                  onClick={() => handleLevelSelect(level.value)}
                  className={`w-full text-left p-2 rounded ${
                    selectedLevel === level.value
                      ? `bg-gray-100 text-michigan-light-blue ${sejongHospitalBold.className}`
                      : "hover:bg-gray-50"
                  } ${sejongHospitalLight.className}`}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>

          {/* Show 채용유형 only when 인턴 is selected */}
          {selectedLevel === "internship" && (
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${sejongHospitalLight.className}`}
              >
                채용유형 (다중 선택 가능)
              </label>
              <div className="space-y-1">
                {internshipTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => handleTypeToggle(type.value)}
                    className={`w-full text-left p-2 rounded flex items-center gap-2 ${
                      selectedTypes.includes(type.value)
                        ? `bg-gray-100 text-michigan-light-blue ${sejongHospitalBold.className}`
                        : "hover:bg-gray-50"
                    } ${sejongHospitalLight.className}`}
                  >
                    <div
                      className={`w-4 h-4 border rounded flex items-center justify-center ${
                        selectedTypes.includes(type.value)
                          ? "bg-blue-500 border-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedTypes.includes(type.value) && (
                        <div className="w-2 h-2 bg-white rounded-sm"></div>
                      )}
                    </div>
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Pane - Date Selection */}
        <div className="w-1/2 p-4 flex flex-col">
          {selectedLevel === "fulltime" ? (
            // 신입 - Start date only
            <DateInputField
              label="시작일"
              date={startDate}
              onDateChange={setStartDate}
              placeholder="시작일을 선택하세요"
              onCalendarOpen={handleStartCalendarOpen}
              isOpen={startCalendarOpen}
              onOpenChange={handleStartOpenChange}
            />
          ) : (
            // 인턴 - Start and end dates
            <div className="flex flex-col w-full gap-4">
              <DateInputField
                label="시작일"
                date={startDate}
                onDateChange={setStartDate}
                placeholder="시작일을 선택하세요"
                onCalendarOpen={handleStartCalendarOpen}
                isOpen={startCalendarOpen}
                onOpenChange={handleStartOpenChange}
              />
              <DateInputField
                label="종료일"
                date={endDate}
                onDateChange={setEndDate}
                placeholder="종료일을 선택하세요"
                disabled={!startDate}
                onCalendarOpen={handleEndCalendarOpen}
                isOpen={endCalendarOpen}
                onOpenChange={handleEndOpenChange}
              />
            </div>
          )}
        </div>
      </div>
    </TagDetailModal>
  );
}
