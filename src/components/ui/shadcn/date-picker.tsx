"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/utils/styles/cn";
import { Button } from "@/components/ui/shadcn/button";
import { Calendar } from "@/components/ui/shadcn/calendar";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";

interface DatePickerProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  onCalendarOpen?: () => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DatePicker({
  date,
  onDateChange,
  placeholder = "날짜를 선택하세요",
  disabled = false,
  className,
  onCalendarOpen,
  isOpen: controlledIsOpen,
  onOpenChange,
}: DatePickerProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  // Use controlled state if provided, otherwise use internal state
  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = onOpenChange || setInternalIsOpen;

  return (
    <div className="flex flex-col h-full">
      {/* Date Display Button */}
      <div className="mb-4">
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            disabled && "opacity-50 cursor-not-allowed",
            date && sejongHospitalBold.className,
            className
          )}
          disabled={disabled}
          onClick={() => {
            if (onCalendarOpen) {
              onCalendarOpen();
            }
            setIsOpen(!isOpen);
          }}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP", { locale: ko }) : placeholder}
        </Button>
      </div>

      {isOpen && (
        <div className="flex-1 border rounded-md bg-white overflow-hidden">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateChange}
            className="w-full h-full"
          />
        </div>
      )}
    </div>
  );
}
