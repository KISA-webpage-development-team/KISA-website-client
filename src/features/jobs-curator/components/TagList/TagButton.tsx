import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import { ChevronDownIcon } from "lucide-react";
import React from "react";

export default function TagButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100"
      onClick={onClick}
    >
      <span className={`${sejongHospitalBold.className} text-1xl`}>
        {label}
      </span>
      <ChevronDownIcon className="w-4 h-4" />
    </button>
  );
}
