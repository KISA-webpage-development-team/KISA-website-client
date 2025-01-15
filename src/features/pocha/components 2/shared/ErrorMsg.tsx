import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import React from "react";

interface ErrorMsgProps {
  message: string;
}

export default function ErrorMsg({ message }: ErrorMsgProps) {
  return (
    <span
      className={`text-red-500 ${sejongHospitalBold.className} text-center`}
    >
      {message}
    </span>
  );
}
