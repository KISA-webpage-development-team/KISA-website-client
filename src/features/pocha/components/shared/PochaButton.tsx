import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import React from "react";
import { POCHA_THEME } from "@/features/pocha/featureFlag";

interface PochaButtonProps {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  widthPercentage?: number;
  type?: "button" | "submit" | "reset";
}

const buttonColorClass =
  POCHA_THEME === "spring"
    ? "bg-[#E8829B] hover:bg-[#C4607A]"
    : "bg-[#4B90E2] hover:bg-[#143B74]";

export default function PochaButton({
  label,
  icon,
  onClick,
  disabled = false,
  widthPercentage = 100,
  type = "button",
}: PochaButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      style={{ width: `${widthPercentage}%` }}
      className={`flex items-center justify-center gap-5
        px-4 py-[0.75rem] rounded-md text-white leading-[150%]
        ${sejongHospitalBold.className} text-lg
        ${buttonColorClass} disabled:bg-gray-400 disabled:cursor-not-allowed
        transition-all duration-300 ease-in-out
      `}
    >
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );
}
