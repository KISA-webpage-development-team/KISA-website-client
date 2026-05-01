import {
  OrderItem,
  MenuOrderHistoryMap,
  MenuOrderSummary,
} from '@/types/pocha';

const SOJU_TOKEN = '소주';
const FRUIT_SOJU_TOKENS = [
  '과일',
  '딸기',
  '복숭아',
  '포도',
  '자몽',
  '청포도',
  '사과',
];

const calculateTotalSales = (orderHistory: OrderItem[]) => {
  return orderHistory
    ?.reduce((acc, { menu, quantity }) => acc + menu.price * quantity, 0)
    .toFixed(2);
};

const calculateSummary = (orderHistory: OrderItem[]) => {
  const anjuOrders =
    orderHistory?.filter(({ menu }) => !menu.isImmediatePrep) || [];
  const drinkOrders =
    orderHistory?.filter(({ menu }) => menu.isImmediatePrep) || [];

  const anjuRevenue = anjuOrders
    .reduce((acc, { menu, quantity }) => acc + menu.price * quantity, 0)
    .toFixed(2);
  const drinkRevenue = drinkOrders
    .reduce((acc, { menu, quantity }) => acc + menu.price * quantity, 0)
    .toFixed(2);

  return {
    totalSales: calculateTotalSales(orderHistory),
    anjuRevenue,
    drinkRevenue,
  };
};

/**
 * Converts order history list into a map aggregated by menuID
 */
const convertOrderHistoryToMenuMap = (
  orderHistory: OrderItem[]
): MenuOrderHistoryMap => {
  const menuMap = new Map<number, MenuOrderSummary>();

  orderHistory?.forEach((orderItem) => {
    const { menu, quantity } = orderItem;
    const menuID = menu.menuID;
    const revenue = menu.price * quantity;

    if (menuMap.has(menuID)) {
      const existing = menuMap.get(menuID)!;
      menuMap.set(menuID, {
        quantity: existing.quantity + quantity,
        totalRevenue: existing.totalRevenue + revenue,
        menu: existing.menu,
      });
    } else {
      menuMap.set(menuID, { quantity, totalRevenue: revenue, menu });
    }
  });

  return menuMap;
};

export interface MenuRanking {
  nameKor: string;
  quantity: number;
  revenue: number;
}

const rankByQuantity = (orders: OrderItem[]): MenuRanking[] => {
  const map = convertOrderHistoryToMenuMap(orders);
  return Array.from(map.values())
    .map(({ menu, quantity, totalRevenue }) => ({
      nameKor: menu.nameKor,
      quantity,
      revenue: totalRevenue,
    }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 3);
};

/** Top-3 안주 (food / non-immediate-prep) by quantity sold. */
export function calculateFoodRankings(orderHistory: OrderItem[]): MenuRanking[] {
  return rankByQuantity(
    orderHistory.filter((o) => !o.menu.isImmediatePrep)
  );
}

/** Top-3 주류 (drink / immediate-prep) by quantity sold. */
export function calculateDrinkRankings(orderHistory: OrderItem[]): MenuRanking[] {
  return rankByQuantity(
    orderHistory.filter((o) => o.menu.isImmediatePrep)
  );
}

export interface SojuAnalysis {
  regular: number;
  fruit: number;
  total: number;
}

/**
 * 소주 매출 수량 분석.
 * regular = 소주 라인 중 fruit 토큰을 포함하지 않는 항목 수량 합
 * fruit   = 소주 라인 중 fruit 토큰 하나라도 포함하는 항목 수량 합
 */
export function analyzeSojuSales(orderHistory: OrderItem[]): SojuAnalysis {
  let regular = 0;
  let fruit = 0;

  for (const { menu, quantity } of orderHistory) {
    if (!menu.nameKor.includes(SOJU_TOKEN)) continue;
    const isFruit = FRUIT_SOJU_TOKENS.some((t) => menu.nameKor.includes(t));
    if (isFruit) fruit += quantity;
    else regular += quantity;
  }

  return { regular, fruit, total: regular + fruit };
}

export { calculateTotalSales, calculateSummary, convertOrderHistoryToMenuMap };
