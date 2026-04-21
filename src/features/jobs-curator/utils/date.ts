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

// Format a Date as a YYYY-MM-DD string suitable for the jobs API.
// Uses `sv-SE` + `UTC` so year boundaries don't drift by TZ offset.
export function toApiDateString(date: Date | undefined) {
  return date
    ? date.toLocaleDateString("sv-SE", { timeZone: "UTC" })
    : undefined;
}

// Inverse of toApiDateString — parses a YYYY-MM-DD string into a Date anchored
// at UTC midnight so round-trips are stable across year boundaries.
export function parseFromApi(s: string): Date {
  const [y, m, d] = s.split("-").map((n) => Number(n));
  return new Date(Date.UTC(y, m - 1, d));
}
