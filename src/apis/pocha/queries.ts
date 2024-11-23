import client from "@/lib/axios/client";
import {
  MenuByCategory,
  PochaInfo,
  Cart,
  CartItem,
  Orders,
  OrderItemWithWaiting,
} from "@/types/pocha";
/**
 * @desc Fetch pocha info, if no upcoming pocha -> empty data, if else -> unempty data
 * @route GET /pocha/status-info/?date=${date}
 */
export async function getPochaInfo(date: Date): Promise<PochaInfo | undefined> {
  const fakeDate = new Date("2024-11-16T23:00:00");

  // [TODO] change fakeDate to date
  const url = `/pocha/status-info/?date=${
    fakeDate.toISOString().split(".")[0]
  }`;

  try {
    const response = await client.get(url);

    return response?.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function getPochaInfoMock(date: Date) {
  const mockPochaInfo: PochaInfo = {
    pochaID: 1,
    startDate: new Date(),
    endDate: new Date(new Date().getTime() + 4 * 60 * 60 * 1000),
    title: "Halloween Pocha",
    description:
      "할로윈 포차 입니다. 한잔 포차에서 11월 2일 진행될 예정입니다! ^^",
    ongoing: true,
  };
  return mockPochaInfo;
}

/**
 * @desc Fetch pocha menu
 * @route GET /pocha/menu/${pochaid}
 */
export async function getPochaMenu(
  pochaid: number,
  token: string
): Promise<MenuByCategory[] | undefined> {
  const url = `/pocha/menu/${pochaid}/`;
  try {
    const response = await client.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response?.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function getPochaMenuMock(pochaid: number) {
  // list of menu by category
  const mockPochaMenu: MenuByCategory[] = [
    {
      category: "Food",
      menusList: [
        {
          menuID: 29,
          nameKor: "김치전",
          nameEng: "Kimchi Pancake",
          price: 20,
          stock: 50,
          isImmediatePrep: false,
          parentPochaId: 1,
        },
        {
          menuID: 30,
          nameKor: "떡볶이",
          nameEng: "Spicy Rice Cake",
          price: 15,
          stock: 100,
          isImmediatePrep: false,
          parentPochaId: 1,
        },
        {
          menuID: 31,
          nameKor: "치킨",
          nameEng: "Fried Chicken",
          price: 25,
          stock: 30,
          isImmediatePrep: false,
          parentPochaId: 1,
        },
      ],
    },
    {
      category: "Special Menu",
      menusList: [
        {
          menuID: 32,
          nameKor: "회",
          nameEng: "Sashimi",
          price: 80,
          stock: 10,
          isImmediatePrep: false,
          parentPochaId: 1,
        },
        {
          menuID: 33,
          nameKor: "초밥",
          nameEng: "Sushi",
          price: 50,
          stock: 20,
          isImmediatePrep: false,
          parentPochaId: 1,
        },
      ],
    },
    {
      category: "Drink",
      menusList: [
        {
          menuID: 27,
          nameKor: "참이슬",
          nameEng: "Cham-e-seul",
          price: 15,
          stock: 999,
          isImmediatePrep: true,
          parentPochaId: 1,
        },
        {
          menuID: 28,
          nameKor: "카스",
          nameEng: "Cass",
          price: 10,
          stock: 999,
          isImmediatePrep: true,
          parentPochaId: 1,
        },
      ],
    },
  ];

  return mockPochaMenu;
}

/**
 * @desc Fetch user's cart
 * @route GET /pocha/cart/${email}/${pochaid}
 */
export async function getUserCart(
  email: string,
  pochaid: number
): Promise<Cart | undefined> {
  const url = `/pocha/cart/${email}/${pochaid}/`;
  try {
    const response = await client.get(url);

    return response?.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function getUserCartMock(email: string, pochaid: number) {
  const mockCart: Cart = new Map<number, CartItem>();
  mockCart.set(29, {
    menu: {
      menuID: 29,
      nameKor: "김치전",
      nameEng: "Kimchi Pancake",
      price: 20,
      stock: 50,
      isImmediatePrep: false,
      parentPochaId: 1,
    },
    quantity: 2,
  });
  mockCart.set(30, {
    menu: {
      menuID: 30,
      nameKor: "떡볶이",
      nameEng: "Spicy Rice Cake",
      price: 15,
      stock: 100,
      isImmediatePrep: false,
      parentPochaId: 1,
    },
    quantity: 3,
  });
  mockCart.set(27, {
    menu: {
      menuID: 27,
      nameKor: "참이슬",
      nameEng: "Cham-e-seul",
      price: 15,
      stock: 999,
      isImmediatePrep: true,
      parentPochaId: 1,
    },
    quantity: 1,
  });

  return mockCart;
}

/**
 * @desc check whether user's cart contains any out-of-stock items
 * @route GET /pocha/cart/${email}/${pochaid}/check-stock
 */
export async function checkCartStock(
  email: string,
  pochaid: number
): Promise<boolean | undefined> {
  const url = `/pocha/cart/${email}/${pochaid}/check-stock`;
  try {
    const response = await client.get(url);

    return response?.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function checkCartStockMock(email: string, pochaid: number) {
  return true;
}

/**
 * @desc Fetch active orders of user from pocha
 * @route GET /pocha/orders/${email}/${pochaid}
 * @note Assume orders are returned in descending order of waiting
 */
export async function getUserOrders(
  email: string,
  pochaid: number,
  token: string
): Promise<Orders | undefined> {
  const url = `/pocha/orders/${email}/${pochaid}/`;
  try {
    const response = await client.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response?.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

// type OrderStatus = "pending" | "preparing" | "ready" | "closed";

// interface OrderItem {
//   orderItemID: number;
//   status: OrderStatus;
//   menu: MenuItem;
//   quantity: number;
//   createdAt: Date;
// }

// interface OrderItemWithWaiting {
//   waiting: number;
//   orderItemsList: OrderItem[];
// }

// // key: orderID
// type Orders = Map<number, OrderItemWithWaiting>;

export async function getUserOrdersMock(
  email: string,
  pochaid: number,
  token: string
): Promise<Orders> {
  const mockOrders: Orders = new Map<number, OrderItemWithWaiting>();
  mockOrders.set(4, {
    waiting: 0,
    orderItemsList: [
      {
        orderItemID: 20,
        status: "ready",
        menu: {
          menuID: 33,
          nameKor: "소주",
          nameEng: "Soju",
          price: 8,
          stock: 200,
          isImmediatePrep: true,
          parentPochaId: 1,
        },
        quantity: 3,
        createdAt: new Date(),
      },
      {
        orderItemID: 21,
        status: "ready",
        menu: {
          menuID: 34,
          nameKor: "맥주",
          nameEng: "Beer",
          price: 10,
          stock: 200,
          isImmediatePrep: true,
          parentPochaId: 1,
        },
        quantity: 2,
        createdAt: new Date(),
      },
    ],
  });
  mockOrders.set(9, {
    waiting: 1,
    orderItemsList: [
      {
        orderItemID: 30,
        status: "preparing",
        menu: {
          menuID: 27,
          nameKor: "참이슬",
          nameEng: "Cham-e-seul",
          price: 15,
          stock: 999,
          isImmediatePrep: true,
          parentPochaId: 1,
        },
        quantity: 1,
        createdAt: new Date(),
      },
    ],
  });
  mockOrders.set(15, {
    waiting: 7,
    orderItemsList: [
      {
        orderItemID: 39,
        status: "preparing",
        menu: {
          menuID: 39,
          nameKor: "골뱅이무침",
          nameEng: "Spicy Sea Snails",
          price: 22,
          stock: 45,
          isImmediatePrep: false,
          parentPochaId: 1,
        },
        quantity: 1,
        createdAt: new Date(),
      },
      {
        orderItemID: 40,
        status: "preparing",
        menu: {
          menuID: 39,
          nameKor: "골뱅이무침",
          nameEng: "Spicy Sea Snails",
          price: 22,
          stock: 45,
          isImmediatePrep: false,
          parentPochaId: 1,
        },
        quantity: 1,
        createdAt: new Date(),
      },
      {
        orderItemID: 42,
        status: "pending",
        menu: {
          menuID: 40,
          nameKor: "계란말이",
          nameEng: "Rolled Omelette",
          price: 12,
          stock: 70,
          isImmediatePrep: false,
          parentPochaId: 1,
        },
        quantity: 1,
        createdAt: new Date(),
      },
      {
        orderItemID: 43,
        status: "pending",
        menu: {
          menuID: 40,
          nameKor: "계란말이",
          nameEng: "Rolled Omelette",
          price: 12,
          stock: 70,
          isImmediatePrep: false,
          parentPochaId: 1,
        },
        quantity: 1,
        createdAt: new Date(),
      },
      {
        orderItemID: 44,
        status: "pending",
        menu: {
          menuID: 40,
          nameKor: "계란말이",
          nameEng: "Rolled Omelette",
          price: 12,
          stock: 70,
          isImmediatePrep: false,
          parentPochaId: 1,
        },
        quantity: 1,
        createdAt: new Date(),
      },
    ],
  });
  mockOrders.set(24, {
    waiting: 9,
    orderItemsList: [
      {
        orderItemID: 51,
        status: "pending",
        menu: {
          menuID: 29,
          nameKor: "김치전",
          nameEng: "Kimchi Pancake",
          price: 20,
          stock: 50,
          isImmediatePrep: false,
          parentPochaId: 1,
        },
        quantity: 2,
        createdAt: new Date(),
      },
      {
        orderItemID: 52,
        status: "preparing",
        menu: {
          menuID: 30,
          nameKor: "떡볶이",
          nameEng: "Spicy Rice Cake",
          price: 15,
          stock: 100,
          isImmediatePrep: false,
          parentPochaId: 1,
        },
        quantity: 3,
        createdAt: new Date(),
      },
    ],
  });
  mockOrders.set(30, {
    waiting: 16,
    orderItemsList: [
      {
        orderItemID: 80,
        status: "pending",
        menu: {
          menuID: 37,
          nameKor: "닭꼬치",
          nameEng: "Chicken Skewer",
          price: 15,
          stock: 100,
          isImmediatePrep: false,
          parentPochaId: 1,
        },
        quantity: 4,
        createdAt: new Date(),
      },
      {
        orderItemID: 81,
        status: "pending",
        menu: {
          menuID: 38,
          nameKor: "모듬전",
          nameEng: "Assorted Pancakes",
          price: 30,
          stock: 30,
          isImmediatePrep: false,
          parentPochaId: 1,
        },
        quantity: 1,
        createdAt: new Date(),
      },
    ],
  });

  return mockOrders;
}

/**
 * @desc Fetch all orders of pocha
 * @route GET /pocha/orders/${pochaid}
 */
export async function getPochaOrders(
  pochaid: number,
  token: string
): Promise<Orders | undefined> {
  const url = `/pocha/orders/${pochaid}/`;
  try {
    const response = await client.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response?.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function getPochaOrdersMock(pochaid: number, token: string) {
  const mockOrders: Orders = new Map<number, OrderItemWithWaiting>();
  mockOrders.set(4, {
    waiting: 0,
    orderItemsList: [
      {
        orderItemID: 20,
        status: "ready",
        menu: {
          menuID: 33,
          nameKor: "소주",
          nameEng: "Soju",
          price: 8,
          stock: 200,
          isImmediatePrep: true,
          parentPochaId: 1,
        },
        quantity: 3,
        createdAt: new Date(),
      },
      {
        orderItemID: 21,
        status: "ready",
        menu: {
          menuID: 34,
          nameKor: "맥주",
          nameEng: "Beer",
          price: 10,
          stock: 200,
          isImmediatePrep: true,
          parentPochaId: 1,
        },
        quantity: 2,
        createdAt: new Date(),
      },
    ],
  });
  mockOrders.set(9, {
    waiting: 1,
    orderItemsList: [
      {
        orderItemID: 30,
        status: "preparing",
        menu: {
          menuID: 27,
          nameKor: "참이슬",
          nameEng: "Cham-e-seul",
          price: 15,
          stock: 999,
          isImmediatePrep: true,
          parentPochaId: 1,
        },
        quantity: 1,
        createdAt: new Date(),
      },
    ],
  });

  return mockOrders;
}

/**
 * @desc Fetch user's closed orders
 * @route GET /pocha/orders/${email}/${pochaid}/closed
 */
export async function getUserClosedOrders(
  email: string,
  pochaid: number,
  token: string
): Promise<Orders | undefined> {
  const url = `/pocha/orders/${email}/${pochaid}/closed`;
  try {
    const response = await client.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function getUserClosedOrdersMock(
  email: string,
  pochaid: number,
  token: string
) {
  const mockOrders: Orders = new Map<number, OrderItemWithWaiting>();
  mockOrders.set(4, {
    waiting: 0,
    orderItemsList: [
      {
        orderItemID: 20,
        status: "closed",
        menu: {
          menuID: 33,
          nameKor: "소주",
          nameEng: "Soju",
          price: 8,
          stock: 200,
          isImmediatePrep: true,
          parentPochaId: 1,
        },
        quantity: 3,
        createdAt: new Date(),
      },
      {
        orderItemID: 21,
        status: "closed",
        menu: {
          menuID: 34,
          nameKor: "맥주",
          nameEng: "Beer",
          price: 10,
          stock: 200,
          isImmediatePrep: true,
          parentPochaId: 1,
        },
        quantity: 2,
        createdAt: new Date(),
      },
    ],
  });
  mockOrders.set(9, {
    waiting: 1,
    orderItemsList: [
      {
        orderItemID: 30,
        status: "closed",
        menu: {
          menuID: 27,
          nameKor: "참이슬",
          nameEng: "Cham-e-seul",
          price: 15,
          stock: 999,
          isImmediatePrep: true,
          parentPochaId: 1,
        },
        quantity: 1,
        createdAt: new Date(),
      },
    ],
  });

  return mockOrders;
}

/**
 * @desc Fetch all closed orders
 * @route GET /pocha/orders/${pochaid}/closed
 */
export async function getPochaClosedOrders(
  pochaid: number,
  token: string
): Promise<Orders | undefined> {
  const url = `/pocha/orders/${pochaid}/closed`;
  try {
    const response = await client.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function getPochaClosedOrdersMock(pochaid: number, token: string) {
  const mockOrders: Orders = new Map<number, OrderItemWithWaiting>();
  mockOrders.set(4, {
    waiting: 0,
    orderItemsList: [
      {
        orderItemID: 20,
        status: "closed",
        menu: {
          menuID: 33,
          nameKor: "소주",
          nameEng: "Soju",
          price: 8,
          stock: 200,
          isImmediatePrep: true,
          parentPochaId: 1,
        },
        quantity: 3,
        createdAt: new Date(),
      },
      {
        orderItemID: 21,
        status: "closed",
        menu: {
          menuID: 34,
          nameKor: "맥주",
          nameEng: "Beer",
          price: 10,
          stock: 200,
          isImmediatePrep: true,
          parentPochaId: 1,
        },
        quantity: 2,
        createdAt: new Date(),
      },
    ],
  });
  mockOrders.set(9, {
    waiting: 1,
    orderItemsList: [
      {
        orderItemID: 30,
        status: "closed",
        menu: {
          menuID: 27,
          nameKor: "참이슬",
          nameEng: "Cham-e-seul",
          price: 15,
          stock: 999,
          isImmediatePrep: true,
          parentPochaId: 1,
        },
        quantity: 1,
        createdAt: new Date(),
      },
    ],
  });

  return mockOrders;
}
