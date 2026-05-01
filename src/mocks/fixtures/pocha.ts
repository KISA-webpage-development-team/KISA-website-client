import type {
  MenuByCategory,
  MenuItem,
  OrderItem,
  PochaInfoWithoutStatus,
} from "@/types/pocha";
// `OrderStatus` is a const enum; under `isolatedModules` we can't import its
// values cross-module, so the literal strings below are typed via
// `OrderItem['status']` instead.
// `OrderItem["status"]` is the const enum `OrderStatus` — its members can't be
// imported as values under `isolatedModules`. The string literals below are
// the underlying enum values; cast in `_make` keeps the assignments terse.
type OrderStatusLiteral = "pending" | "preparing" | "ready" | "closed";

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
  {
    // Always-ongoing dev fixture — covers any realistic "today" so the
    // status-info endpoint reliably returns an active pocha during local
    // development (regardless of system date drift). Narrow enough that
    // the "far-future returns empty" test (2099) still holds.
    pochaID: 6,
    startDate: new Date("2024-01-01T00:00:00.000Z"),
    endDate: new Date("2030-12-31T23:59:59.000Z"),
    title: "KISA Dev Pocha (always ongoing)",
    description: "Dev fixture — always returned as active by status-info.",
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
        {
          menuID: 204,
          nameKor: "파전",
          nameEng: "Pajeon",
          category: "food",
          description: "Scallion pancake",
          price: 12,
          stock: 20,
          isImmediatePrep: false,
          ageCheckRequired: false,
        },
        {
          menuID: 205,
          nameKor: "계란말이",
          nameEng: "Gyeran-mari",
          category: "food",
          description: "Rolled omelet",
          price: 8,
          stock: 25,
          isImmediatePrep: false,
          ageCheckRequired: false,
        },
        {
          menuID: 206,
          nameKor: "김치찌개",
          nameEng: "Kimchi-jjigae",
          category: "food",
          description: "Kimchi stew",
          price: 11,
          stock: 18,
          isImmediatePrep: false,
          ageCheckRequired: false,
        },
        {
          menuID: 207,
          nameKor: "어묵탕",
          nameEng: "Eomuk-tang",
          category: "food",
          description: "Fish cake soup",
          price: 9,
          stock: 22,
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

// Always-ongoing dev pocha (pochaID=6) reuses pochaID=1's menu shape with
// fresh deep clones so stock mutations from spawn-order don't bleed across.
mockPochaMenus[6] = mockPochaMenus[1]!.map((cat) => ({
  category: cat.category,
  menusList: cat.menusList.map((m) => ({ ...m })),
}));

// ORDERS ---------------------------------------------------------------------

/**
 * Order fixtures for the active pocha (pochaID=1) — used by dashboard handlers.
 * `nextOrderItemID` (in handler module) is initialized just past
 * `mockOrderItemIDStart + mockOrderItems.length` so spawn-order ids stay
 * monotonic. Stock numbers in the embedded `menu` are snapshots at seed time;
 * subsequent stock mutations affect `menusStore` but not in-flight orders.
 */
const _menuByID: Record<number, MenuItem> = (() => {
  const out: Record<number, MenuItem> = {};
  for (const group of mockPochaMenus[1]!) {
    for (const m of group.menusList) out[m.menuID] = { ...m };
  }
  return out;
})();

const _orderers: Array<{ name: string; email: string }> = [
  { name: "민수", email: "minsoo@umich.edu" },
  { name: "지영", email: "jiyoung@umich.edu" },
  { name: "현우", email: "hyunwoo@umich.edu" },
  { name: "수진", email: "sujin@umich.edu" },
  { name: "도윤", email: "doyoon@umich.edu" },
];

export const mockOrderItemIDStart = 1000;

const _make = (
  i: number,
  status: OrderStatusLiteral,
  menuID: number,
  quantity: number
): OrderItem => {
  const orderer = _orderers[i % _orderers.length]!;
  return {
    orderItemID: mockOrderItemIDStart + i,
    status: status as unknown as OrderItem["status"],
    menu: { ..._menuByID[menuID]! },
    quantity,
    ordererName: orderer.name,
    ordererEmail: orderer.email,
  };
};

/**
 * 7 active (pending/preparing/ready) + 5 closed = 12 fixture orders.
 * Smaller seed for a calmer dev dashboard; mix of food + drink + snack
 * across status buckets so every column still has at least one row.
 */
export const mockOrderItems: OrderItem[] = [
  // pending — 3
  _make(0, "pending", 201, 2), // 떡볶이
  _make(1, "pending", 101, 1), // 소주
  _make(2, "pending", 301, 1), // 새우깡

  // preparing — 2 (food only — drinks skip preparing)
  _make(3, "preparing", 203, 1), // 라면
  _make(4, "preparing", 206, 1), // 김치찌개

  // ready — 2 (one drink, one food)
  _make(5, "ready", 102, 2), // 맥주
  _make(6, "ready", 204, 1), // 파전

  // closed — 5 (history)
  _make(7, "closed", 201, 2),
  _make(8, "closed", 101, 1),
  _make(9, "closed", 202, 1),
  _make(10, "closed", 302, 1),
  _make(11, "closed", 207, 1),
];
