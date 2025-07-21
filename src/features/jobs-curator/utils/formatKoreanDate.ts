import { format } from "date-fns";
import { ko } from "date-fns/locale";

export const formatKoreanDate = (date: Date) =>
  format(date, "yyyy년 M월 d일", { locale: ko });
