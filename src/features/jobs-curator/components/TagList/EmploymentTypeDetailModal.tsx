import { useState, useEffect } from "react";
import TagDetailModal from "./TagDetailModal";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "@/utils/fonts/textFonts";
import { EmploymentType, InternshipType } from "../../types/jobs";
import { useJobsCurator } from "../../contexts/JobsCuratorContext";
import { formatTagToLabel } from "../../utils/formatTagToLabel";
import { employmentTypeLabels } from "../../constant";
import { internshipTypeLabels } from "../../constant";

export default function EmploymentTypeDetailModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const {
    employmentType: globalEmploymentType,
    setEmploymentType: setGlobalEmploymentType,
    internshipTypes: globalInternshipTypes,
    setInternshipTypes: setGlobalInternshipTypes,
  } = useJobsCurator();

  // Local state for modal interactions
  const [localEmploymentType, setLocalEmploymentType] = useState<
    EmploymentType | undefined
  >(globalEmploymentType);
  const [localInternshipTypes, setLocalInternshipTypes] = useState<
    InternshipType[]
  >(globalInternshipTypes);

  // Sync local state with global state when modal opens
  useEffect(() => {
    if (isOpen) {
      setLocalEmploymentType(globalEmploymentType);
      setLocalInternshipTypes(globalInternshipTypes);
    }
  }, [isOpen, globalEmploymentType, globalInternshipTypes]);

  const handleTypeToggle = (type: InternshipType) => {
    setLocalInternshipTypes((prev) => {
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  const handleApply = () => {
    setGlobalEmploymentType(localEmploymentType);
    setGlobalInternshipTypes(localInternshipTypes);
    onClose();
  };

  const handleReset = () => {
    setLocalEmploymentType(globalEmploymentType);
    setLocalInternshipTypes(globalInternshipTypes);
  };

  // Form validation logic
  const isApplyDisabled = () => {
    // For 신입 (fulltime): no required fields
    if (localEmploymentType === "fulltime") {
      return false;
    }

    // For 인턴 (internship): at least one 채용유형 is required
    if (localEmploymentType === "intern") {
      return localInternshipTypes.length === 0;
    }

    return true; // Default to disabled
  };

  return (
    <TagDetailModal
      isOpen={isOpen}
      onClose={onClose}
      title="채용유형"
      onApply={handleApply}
      onReset={handleReset}
      isApplyDisabled={isApplyDisabled()}
    >
      <div className="flex flex-col w-full p-2 overflow-y-auto">
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${sejongHospitalLight.className}`}
          >
            고용형태
          </label>
          <div className="space-y-1">
            {Object.entries(employmentTypeLabels).map(
              ([key, value]: [EmploymentType, string]) => (
                <button
                  key={key}
                  onClick={() => setLocalEmploymentType(key as EmploymentType)}
                  className={`w-full text-left p-2 rounded ${
                    localEmploymentType === key
                      ? `bg-gray-100 text-michigan-light-blue ${sejongHospitalBold.className}`
                      : "hover:bg-gray-50"
                  } ${sejongHospitalLight.className}`}
                >
                  {value}
                </button>
              )
            )}
          </div>
        </div>

        {/* Show 채용유형 only when 인턴 is selected */}
        {localEmploymentType === "intern" && (
          <div className="mt-2 md:mt-4">
            <label
              className={`block text-sm font-medium mb-2 ${sejongHospitalLight.className}`}
            >
              채용유형 (다중 선택 가능)
            </label>
            <div className="space-y-1">
              {Object.entries(internshipTypeLabels).map(
                ([key, value]: [InternshipType, string]) => (
                  <button
                    key={key}
                    onClick={() => handleTypeToggle(key)}
                    className={`w-full text-left p-2 rounded flex items-center gap-2 ${
                      localInternshipTypes.includes(key)
                        ? `bg-gray-100 text-michigan-light-blue ${sejongHospitalBold.className}`
                        : "hover:bg-gray-50"
                    } ${sejongHospitalLight.className}`}
                  >
                    <div
                      className={`w-4 h-4 border rounded flex items-center justify-center ${
                        localInternshipTypes.includes(key)
                          ? "bg-blue-500 border-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {localInternshipTypes.includes(key) && (
                        <div className="w-2 h-2 bg-white rounded-sm"></div>
                      )}
                    </div>
                    {value}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </TagDetailModal>
  );
}
