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
//   orderItem: OrderItem;
// }

// // key: orderID
// type Orders = Map<number, OrderItemWithWaiting[]>;

export async function getUserOrdersMock(
  email: string,
  pochaid: number,
  token: string
): Promise<Orders> {
  const mockOrders: Orders = new Map<number, OrderItemWithWaiting[]>();
  mockOrders.set(1, [
    {
      waiting: 0,
      orderItem: {
        orderItemID: 1,
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
    },
    {
      waiting: 1,
      orderItem: {
        orderItemID: 2,
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
    },
  ]);

  mockOrders.set(2, [
    {
      waiting: 2,
      orderItem: {
        orderItemID: 3,
        status: "ready",
        menu: {
          menuID: 31,
          nameKor: "순대",
          nameEng: "Blood Sausage",
          price: 12,
          stock: 30,
          isImmediatePrep: false,
          parentPochaId: 1,
        },
        quantity: 1,
        createdAt: new Date(),
      },
    },
  ]);

  mockOrders.set(3, [
    {
      waiting: 0,
      orderItem: {
        orderItemID: 4,
        status: "pending",
        menu: {
          menuID: 32,
          nameKor: "소주",
          nameEng: "Soju",
          price: 8,
          stock: 200,
          isImmediatePrep: true,
          parentPochaId: 1,
        },
        quantity: 4,
        createdAt: new Date(),
      },
    },
  ]);

  mockOrders.set(4, [
    {
      waiting: 3,
      orderItem: {
        orderItemID: 5,
        status: "preparing",
        menu: {
          menuID: 33,
          nameKor: "맥주",
          nameEng: "Beer",
          price: 7,
          stock: 200,
          isImmediatePrep: true,
          parentPochaId: 1,
        },
        quantity: 6,
        createdAt: new Date(),
      },
    },
  ]);

  mockOrders.set(5, [
    {
      waiting: 1,
      orderItem: {
        orderItemID: 6,
        status: "ready",
        menu: {
          menuID: 34,
          nameKor: "감자전",
          nameEng: "Potato Pancake",
          price: 18,
          stock: 40,
          isImmediatePrep: false,
          parentPochaId: 1,
        },
        quantity: 2,
        createdAt: new Date(),
      },
    },
  ]);

  mockOrders.set(6, [
    {
      waiting: 4,
      orderItem: {
        orderItemID: 7,
        status: "closed",
        menu: {
          menuID: 35,
          nameKor: "오뎅",
          nameEng: "Fish Cake Soup",
          price: 10,
          stock: 80,
          isImmediatePrep: true,
          parentPochaId: 1,
        },
        quantity: 3,
        createdAt: new Date(),
      },
    },
  ]);

  mockOrders.set(7, [
    {
      waiting: 2,
      orderItem: {
        orderItemID: 8,
        status: "pending",
        menu: {
          menuID: 36,
          nameKor: "치킨",
          nameEng: "Korean Fried Chicken",
          price: 25,
          stock: 30,
          isImmediatePrep: false,
          parentPochaId: 1,
        },
        quantity: 1,
        createdAt: new Date(),
      },
    },
  ]);

  mockOrders.set(8, [
    {
      waiting: 0,
      orderItem: {
        orderItemID: 9,
        status: "preparing",
        menu: {
          menuID: 37,
          nameKor: "골뱅이무침",
          nameEng: "Spicy Sea Snails",
          price: 22,
          stock: 25,
          isImmediatePrep: false,
          parentPochaId: 1,
        },
        quantity: 2,
        createdAt: new Date(),
      },
    },
  ]);

  mockOrders.set(9, [
    {
      waiting: 5,
      orderItem: {
        orderItemID: 10,
        status: "ready",
        menu: {
          menuID: 38,
          nameKor: "계란말이",
          nameEng: "Rolled Omelette",
          price: 15,
          stock: 50,
          isImmediatePrep: true,
          parentPochaId: 1,
        },
        quantity: 2,
        createdAt: new Date(),
      },
    },
  ]);

  mockOrders.set(10, [
    {
      waiting: 1,
      orderItem: {
        orderItemID: 11,
        status: "pending",
        menu: {
          menuID: 39,
          nameKor: "콜라",
          nameEng: "Cola",
          price: 3,
          stock: 150,
          isImmediatePrep: true,
          parentPochaId: 1,
        },
        quantity: 4,
        createdAt: new Date(),
      },
    },
  ]);

  mockOrders.set(11, [
    {
      waiting: 3,
      orderItem: {
        orderItemID: 12,
        status: "closed",
        menu: {
          menuID: 40,
          nameKor: "마른안주",
          nameEng: "Dried Snacks",
          price: 8,
          stock: 100,
          isImmediatePrep: true,
          parentPochaId: 1,
        },
        quantity: 3,
        createdAt: new Date(),
      },
    },
  ]);

  mockOrders.set(12, [
    {
      waiting: 2,
      orderItem: {
        orderItemID: 13,
        status: "preparing",
        menu: {
          menuID: 41,
          nameKor: "닭발",
          nameEng: "Spicy Chicken Feet",
          price: 20,
          stock: 40,
          isImmediatePrep: false,
          parentPochaId: 1,
        },
        quantity: 2,
        createdAt: new Date(),
      },
    },
  ]);

  mockOrders.set(13, [
    {
      waiting: 4,
      orderItem: {
        orderItemID: 14,
        status: "ready",
        menu: {
          menuID: 42,
          nameKor: "막걸리",
          nameEng: "Rice Wine",
          price: 10,
          stock: 100,
          isImmediatePrep: true,
          parentPochaId: 1,
        },
        quantity: 2,
        createdAt: new Date(),
      },
    },
  ]);

  mockOrders.set(14, [
    {
      waiting: 0,
      orderItem: {
        orderItemID: 15,
        status: "pending",
        menu: {
          menuID: 43,
          nameKor: "두부김치",
          nameEng: "Tofu with Kimchi",
          price: 15,
          stock: 45,
          isImmediatePrep: false,
          parentPochaId: 1,
        },
        quantity: 1,
        createdAt: new Date(),
      },
    },
  ]);

  mockOrders.set(15, [
    {
      waiting: 2,
      orderItem: {
        orderItemID: 16,
        status: "preparing",
        menu: {
          menuID: 44,
          nameKor: "파전",
          nameEng: "Green Onion Pancake",
          price: 18,
          stock: 35,
          isImmediatePrep: false,
          parentPochaId: 1,
        },
        quantity: 2,
        createdAt: new Date(),
      },
    },
  ]);

  return mockOrders;
}
