import React from "react";
import { cn } from "@/utils/styles/cn";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";

interface NotificationTextProps {
  text: string;
  className?: string;
}

export default function NotificationText({
  text,
  className,
}: NotificationTextProps) {
  return (
    <span className={cn(className, `${sejongHospitalBold.className}`)}>
      {text}
    </span>
  );
}
