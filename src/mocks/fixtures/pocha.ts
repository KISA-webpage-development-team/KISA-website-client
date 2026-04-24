import type { MenuByCategory, PochaInfoWithoutStatus } from "@/types/pocha";

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
    // Active pocha runs 18:00 ET on day -2 through 23:00 ET on day +2.
    // UTC offsets hard-coded for EDT (April → UTC-4); if TODAY ever moves
    // into EST months, recompute these.
    pochaID: 1,
    startDate: new Date("2026-04-21T22:00:00.000Z"), // 18:00 EDT
    endDate: new Date("2026-04-26T03:00:00.000Z"), // 23:00 EDT on 04-25
    title: "KISA Spring Pocha 2026",
    description:
      "미시간 한인 학생회 2026년 봄 정기 포차입니다. 많은 관심과 참여 부탁드립니다!",
  },
  {
    pochaID: 2,
    startDate: day(-200),
    endDate: day(-195),
    title: "KISA Fall Pocha 2025",
    description: "2025년 가을 정기 포차 기록입니다.",
  },
  {
    pochaID: 3,
    startDate: day(-320),
    endDate: day(-315),
    title: "KISA Spring Pocha 2025",
    description: "2025년 봄 정기 포차 기록입니다.",
  },
  {
    pochaID: 4,
    startDate: day(-500),
    endDate: day(-495),
    title: "KISA Fall Pocha 2024",
    description: "2024년 가을 정기 포차 기록입니다.",
  },
  {
    pochaID: 5,
    startDate: day(-680),
    endDate: day(-675),
    title: "KISA Spring Pocha 2024",
    description: "2024년 봄 정기 포차 기록입니다.",
  },
];

/**
 * Menu fixtures keyed by `pochaID`. Response shape matches `MenuByCategory[]`
 * (grouped by category, each group has a `menusList` of `MenuItem`s).
 *
 * Only pochas with menu entries are keyed here; unknown pochaIDs → `[]`
 * at the handler level.
 */
export const mockPochaMenus: Record<number, MenuByCategory[]> = {
  1: [
    {
      category: "drink",
      menusList: [
        {
          menuID: 101,
          nameKor: "소주",
          nameEng: "Soju",
          category: "drink",
          description: "참이슬 Fresh",
          price: 8,
          stock: 40,
          isImmediatePrep: true,
          ageCheckRequired: true,
        },
        {
          menuID: 102,
          nameKor: "맥주",
          nameEng: "Beer",
          category: "drink",
          description: "Cass draft",
          price: 6,
          stock: 60,
          isImmediatePrep: true,
          ageCheckRequired: true,
        },
        {
          menuID: 103,
          nameKor: "콜라",
          nameEng: "Coke",
          category: "drink",
          description: "Non-alcoholic",
          price: 3,
          stock: 80,
          isImmediatePrep: true,
          ageCheckRequired: false,
        },
      ],
    },
    {
      category: "food",
      menusList: [
        {
          menuID: 201,
          nameKor: "떡볶이",
          nameEng: "Tteokbokki",
          category: "food",
          description: "Spicy rice cakes",
          price: 10,
          stock: 25,
          isImmediatePrep: false,
          ageCheckRequired: false,
        },
        {
          menuID: 202,
          nameKor: "김밥",
          nameEng: "Kimbap",
          category: "food",
          description: "Classic seaweed roll",
          price: 7,
          stock: 30,
          isImmediatePrep: false,
          ageCheckRequired: false,
        },
        {
          menuID: 203,
          nameKor: "라면",
          nameEng: "Ramyeon",
          category: "food",
          description: "Shin ramen",
          price: 6,
          stock: 35,
          isImmediatePrep: false,
          ageCheckRequired: false,
        },
      ],
    },
    {
      category: "snack",
      menusList: [
        {
          menuID: 301,
          nameKor: "새우깡",
          nameEng: "Shrimp Crackers",
          category: "snack",
          description: "Nongshim classic",
          price: 3,
          stock: 50,
          isImmediatePrep: true,
          ageCheckRequired: false,
        },
        {
          menuID: 302,
          nameKor: "오징어",
          nameEng: "Dried Squid",
          category: "snack",
          description: "Goes with beer",
          price: 5,
          stock: 20,
          isImmediatePrep: true,
          ageCheckRequired: false,
        },
      ],
    },
  ],
  2: [
    {
      category: "drink",
      menusList: [
        {
          menuID: 1101,
          nameKor: "막걸리",
          nameEng: "Makgeolli",
          category: "drink",
          description: "Fall 2025 limited",
          price: 9,
          stock: 0,
          isImmediatePrep: true,
          ageCheckRequired: true,
        },
      ],
    },
    {
      category: "food",
      menusList: [
        {
          menuID: 1201,
          nameKor: "파전",
          nameEng: "Pajeon",
          category: "food",
          description: "Green onion pancake",
          price: 12,
          stock: 0,
          isImmediatePrep: false,
          ageCheckRequired: false,
        },
      ],
    },
  ],
};
