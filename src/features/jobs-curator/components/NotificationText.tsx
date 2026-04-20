import React from "react";
import { cn } from "@umichkisa-ds/web";

interface NotificationTextProps {
  text: string;
  className?: string;
}

export default function NotificationText({
  text,
  className,
}: NotificationTextProps) {
  return (
    <span className={cn("type-body text-foreground", className)}>{text}</span>
  );
}
