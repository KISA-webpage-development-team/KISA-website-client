import client from "@/lib/axios/client";
import {
  MenuByCategory,
  PochaInfo,
  Cart,
  CartItem,
  Orders,
  OrderHistory,
  PayInfo,
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
  const url = `/pocha/cart/${email}/${pochaid}/check-stock/`;
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
// }

// interface Orders {
//   pending: OrderItem[];
//   preparing: OrderItem[];
//   ready: OrderItem[];
// }

export async function getUserOrdersMock(
  email: string,
  pochaid: number,
  token: string
): Promise<Orders> {
  const mockOrders: Orders = {
    pending: [
      {
        orderItemID: 1,
        status: "pending",
        menu: {
          menuID: 1,
          nameKor: "김치전",
          nameEng: "Kimchi Pancake",
          price: 20,
          stock: 50,
          isImmediatePrep: false,
          parentPochaId: 1,
        },
        quantity: 2,
      },
      {
        orderItemID: 2,
        status: "pending",
        menu: {
          menuID: 2,
          nameKor: "떡볶이",
          nameEng: "Spicy Rice Cake",
          price: 15,
          stock: 100,
          isImmediatePrep: false,
          parentPochaId: 1,
        },
        quantity: 3,
      },
    ],
    preparing: [
      {
        orderItemID: 3,
        status: "preparing",
        menu: {
          menuID: 3,
          nameKor: "참이슬",
          nameEng: "Cham-e-seul",
          price: 15,
          stock: 999,
          isImmediatePrep: true,
          parentPochaId: 1,
        },
        quantity: 1,
      },
    ],
    ready: [
      {
        orderItemID: 4,
        status: "ready",
        menu: {
          menuID: 4,
          nameKor: "카스",
          nameEng: "Cass",
          price: 10,
          stock: 999,
          isImmediatePrep: true,
          parentPochaId: 1,
        },
        quantity: 1,
      },
    ],
  };

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

export async function getPochaOrdersMock(
  pochaid: number,
  token: string
): Promise<Orders> {
  const mockOrders: Orders = {
    pending: [
      {
        orderItemID: 1,
        status: "pending",
        menu: {
          menuID: 1,
          nameKor: "김치전",
          nameEng: "Kimchi Pancake",
          price: 20,
          stock: 50,
          isImmediatePrep: false,
          parentPochaId: 1,
        },
        quantity: 2,
      },
      {
        orderItemID: 2,
        status: "pending",
        menu: {
          menuID: 2,
          nameKor: "떡볶이",
          nameEng: "Spicy Rice Cake",
          price: 15,
          stock: 100,
          isImmediatePrep: false,
          parentPochaId: 1,
        },
        quantity: 3,
      },
    ],
    preparing: [
      {
        orderItemID: 3,
        status: "preparing",
        menu: {
          menuID: 3,
          nameKor: "참이슬",
          nameEng: "Cham-e-seul",
          price: 15,
          stock: 999,
          isImmediatePrep: true,
          parentPochaId: 1,
        },
        quantity: 1,
      },
    ],
    ready: [
      {
        orderItemID: 4,
        status: "ready",
        menu: {
          menuID: 4,
          nameKor: "카스",
          nameEng: "Cass",
          price: 10,
          stock: 999,
          isImmediatePrep: true,
          parentPochaId: 1,
        },
        quantity: 1,
      },
    ],
  };

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
): Promise<OrderHistory | undefined> {
  const url = `/pocha/orders/${email}/${pochaid}/closed/`;
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
): Promise<OrderHistory> {
  const mockOrders: OrderHistory = {
    closed: [
      {
        orderItemID: 5,
        status: "closed",
        menu: {
          menuID: 5,
          nameKor: "소주",
          nameEng: "Soju",
          price: 8,
          stock: 200,
          isImmediatePrep: true,
          parentPochaId: 1,
        },
        quantity: 3,
      },
      {
        orderItemID: 6,
        status: "closed",
        menu: {
          menuID: 6,
          nameKor: "맥주",
          nameEng: "Beer",
          price: 10,
          stock: 200,
          isImmediatePrep: true,
          parentPochaId: 1,
        },
        quantity: 2,
      },
    ],
  };

  return mockOrders;
}

/**
 * @desc Fetch all closed orders
 * @route GET /pocha/orders/${pochaid}/closed
 */
export async function getPochaClosedOrders(
  pochaid: number,
  token: string
): Promise<OrderHistory | undefined> {
  const url = `/pocha/orders/${pochaid}/closed/`;
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

export async function getPochaClosedOrdersMock(
  pochaid: number,
  token: string
): Promise<OrderHistory> {
  const mockOrders: OrderHistory = {
    closed: [
      {
        orderItemID: 5,
        status: "closed",
        menu: {
          menuID: 5,
          nameKor: "소주",
          nameEng: "Soju",
          price: 8,
          stock: 200,
          isImmediatePrep: true,
          parentPochaId: 1,
        },
        quantity: 3,
      },
      {
        orderItemID: 6,
        status: "closed",
        menu: {
          menuID: 6,
          nameKor: "맥주",
          nameEng: "Beer",
          price: 10,
          stock: 200,
          isImmediatePrep: true,
          parentPochaId: 1,
        },
        quantity: 2,
      },
    ],
  };
  return mockOrders;
}

// [TODO] change route URL
/**
 * @desc Fetch pay info by user (cart)
 * @route GET /pocha/cart/${email}/${pochaid}/checkout-info
 * @params email, token, pochaid
 */
export async function getPayInfo(
  email: string,
  pochaid: number,
  token: string
): Promise<PayInfo | undefined> {
  const url = `/pocha/cart/${email}/${pochaid}/checkout-info/`;
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

export async function getPayInfoMock(
  email: string,
  pochaid: number,
  token: string
): Promise<PayInfo> {
  const mockPayInfo: PayInfo = {
    amount: 100,
    ageCheckRequired: false,
  };
  return mockPayInfo;
}
