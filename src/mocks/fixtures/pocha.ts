import type { PochaInfoWithoutStatus } from "@/types/pocha";

/**
 * Pocha fixtures — seed data for MSW pocha handlers.
 *
 * Contract:
 *   - id=1 is the active pocha (window covers today, 2026-04-23)
 *   - ids 2–5 are previous pochas (endDate strictly before today)
 *
 * Dates are relative to 2026-04-23 so the "active" pocha stays active
 * for the fixed test date.
 */
const TODAY = new Date("2026-04-23T12:00:00.000Z");
const day = (offsetDays: number): Date => {
  const d = new Date(TODAY);
  d.setUTCDate(d.getUTCDate() + offsetDays);
  return d;
};

export interface PochaRecord extends PochaInfoWithoutStatus {}

export const mockPochas: PochaRecord[] = [
  {
    pochaID: 1,
    startDate: day(-2),
    endDate: day(2),
    title: "KISA Spring Pocha 2026",
    description: "Active pocha window covers 2026-04-23.",
  },
  {
    pochaID: 2,
    startDate: day(-200),
    endDate: day(-195),
    title: "KISA Fall Pocha 2025",
    description: "Historical pocha from fall 2025.",
  },
  {
    pochaID: 3,
    startDate: day(-320),
    endDate: day(-315),
    title: "KISA Spring Pocha 2025",
    description: "Historical pocha from spring 2025.",
  },
  {
    pochaID: 4,
    startDate: day(-500),
    endDate: day(-495),
    title: "KISA Fall Pocha 2024",
    description: "Historical pocha from fall 2024.",
  },
  {
    pochaID: 5,
    startDate: day(-680),
    endDate: day(-675),
    title: "KISA Spring Pocha 2024",
    description: "Historical pocha from spring 2024.",
  },
];
