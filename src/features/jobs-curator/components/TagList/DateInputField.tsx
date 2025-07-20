import { DatePicker } from "@/components/ui/shadcn/date-picker";
import { sejongHospitalLight } from "@/utils/fonts/textFonts";

interface DateInputFieldProps {
  label: string;
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  placeholder: string;
  disabled?: boolean;
  onCalendarOpen?: () => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function DateInputField({
  label,
  date,
  onDateChange,
  placeholder,
  disabled = false,
  onCalendarOpen,
  isOpen,
  onOpenChange,
}: DateInputFieldProps) {
  return (
    <div className="flex flex-col h-full gap-2">
      <label
        className={`block text-sm font-medium ${sejongHospitalLight.className}`}
      >
        {label}
      </label>
      <DatePicker
        date={date}
        onDateChange={onDateChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`${sejongHospitalLight.className}`}
        onCalendarOpen={onCalendarOpen}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}
