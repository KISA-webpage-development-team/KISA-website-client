import { format } from "date-fns";
import { ko } from "date-fns/locale";

export const formatKoreanDate = (date: Date) =>
  format(date, "yyyy년 M월 d일", { locale: ko });

// Helper to check if a date is in the past (local date only)
export function isPastLocal(date: Date) {
  const now = new Date();
  return (
    date.getFullYear() < now.getFullYear() ||
    (date.getFullYear() === now.getFullYear() &&
      date.getMonth() < now.getMonth()) ||
    (date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() < now.getDate())
  );
}
