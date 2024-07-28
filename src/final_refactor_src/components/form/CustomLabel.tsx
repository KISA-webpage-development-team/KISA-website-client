import React from "react";
import { sejongHospitalBold } from "@/final_refactor_src/utils/fonts/fonts";

type CustomLabelProps = {
  htmlFor: string;
  text?: string;
  required?: boolean;
};

export default function CustomLabel({
  htmlFor,
  text = "",
  required = false,
}: CustomLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`flex items-start gap-1
      ${sejongHospitalBold.className} text-sm md:text-base`}
    >
      {text && <span>{text}</span>}
      {required && <span className="text-red-500">*</span>}
    </label>
  );
}
