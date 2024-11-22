import client from "@/lib/axios/client";
import { MenuByCategory, PochaInfo, Cart, CartItem } from "@/types/pocha";
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
          menuid: 29,
          nameKor: "김치전",
          nameEng: "Kimchi Pancake",
          price: 20,
          stock: 50,
          isImmediatePrep: false,
          parentPochaId: 1,
        },
        {
          menuid: 30,
          nameKor: "떡볶이",
          nameEng: "Spicy Rice Cake",
          price: 15,
          stock: 100,
          isImmediatePrep: false,
          parentPochaId: 1,
        },
        {
          menuid: 31,
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
          menuid: 32,
          nameKor: "회",
          nameEng: "Sashimi",
          price: 80,
          stock: 10,
          isImmediatePrep: false,
          parentPochaId: 1,
        },
        {
          menuid: 33,
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
          menuid: 27,
          nameKor: "참이슬",
          nameEng: "Cham-e-seul",
          price: 15,
          stock: 999,
          isImmediatePrep: true,
          parentPochaId: 1,
        },
        {
          menuid: 28,
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
      menuid: 29,
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
      menuid: 30,
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
      menuid: 27,
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
