// hook to summarize closed orders

import {
  OrderItem,
  MenuOrderHistoryMap,
  MenuOrderSummary,
} from '@/types/pocha';

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

  const mostSoldAnju = Object.entries(
    anjuOrders.reduce((acc, { menu, quantity }) => {
      acc[menu.nameKor] = (acc[menu.nameKor] || 0) + quantity;
      return acc;
    }, {} as Record<string, number>)
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([menu, quantity]) => `${menu} (${quantity}개)`)
    .join(', ');

  const mostProfitableAnju = Object.entries(
    anjuOrders.reduce((acc, { menu, quantity }) => {
      acc[menu.nameKor] = (acc[menu.nameKor] || 0) + menu.price * quantity;
      return acc;
    }, {} as Record<string, number>)
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([menu, revenue]) => `${menu} ($${revenue.toFixed(2)})`)
    .join(', ');

  return {
    totalSales: calculateTotalSales(orderHistory),
    anjuRevenue,
    drinkRevenue,
  }

  // alert(`총 금액: $${calculateTotalSales(orderHistory)}
  //     안주 수익: $${anjuRevenue}
  //     주류 수익: $${drinkRevenue}

  //     (참고: 실제로 음식이 나간 주문들을 기반으로 한 "요약" 기능입니다. 실제 정산과는 차이가 있을 수 있습니다.)
  //     `);
};

/**
 * Converts order history list into a map aggregated by menuID
 * @param orderHistory - Array of OrderItem from order history
 * @returns Map with menuID as key and aggregated quantity/revenue as value
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
        menu: existing.menu, // Keep the menu reference
      });
    } else {
      menuMap.set(menuID, {
        quantity,
        totalRevenue: revenue,
        menu,
      });
    }
  });

  return menuMap;
};

export { calculateTotalSales, calculateSummary, convertOrderHistoryToMenuMap };
