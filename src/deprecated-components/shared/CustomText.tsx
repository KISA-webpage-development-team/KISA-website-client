import React from "react";

interface CustomTextProps {
  type: string;
  value: string | number | boolean;
}
export default function CustomText({ type, value }: CustomTextProps) {
  return (
    <span
      className=" w-full
     p-3 rounded-lg
    mt-2 
    focus:outline-michigan-blue text-sm md:text-base
    "
    >
      {type === "checkbox" ? (value ? "예" : "아니오") : value}
    </span>
  );
}
