import client from "@/lib/axios/client";
import {
  MenuByCategory,
  PochaInfo,
  PochaInfoWithoutStatus,
  Cart,
  Orders,
  OrderHistory,
  PayInfo,
} from "@/types/pocha";
/**
 * @desc Fetch pocha info. Returns null when the backend signals "no ongoing
 * pocha" via 204 No Content.
 * @route GET /pocha/status-info/?date=${date}
 */
export async function getPochaInfo(date: Date): Promise<PochaInfo | null> {
  // [TODO] change fakeDateEST to date for productions
  // const fakeDateEST = new Date("2025-04-11T23:00:00");

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Detect user's time zone
  const KST_OFFSET = 14; // KST is UTC+9, EST is UTC-5 => Difference is +14 hours

  let convertedDate;

  // Check if the user's time zone is KST
  if (userTimeZone === "Asia/Seoul") {
    convertedDate = new Date(date.getTime() + KST_OFFSET * 60 * 60 * 1000);
  } else {
    convertedDate = date; // If not in KST, no adjustment
  }

  // const url = `/pocha/status-info/?date=${date.toISOString().split(".")[0]}`;
  const url = `/pocha/status-info/?date=${
    convertedDate.toISOString().split(".")[0]
  }`;

  try {
    const response = await client.get(url);
    if (response.status === 204) return null;
    return response.data;
  } catch (error) {
    throw new Error("Error fetching pocha information");
  }
}

/**
 * @desc Fetch all previous pocha
 * @route GET /pocha/previous/
 */
export async function getPreviousPochaList(
  date: Date
): Promise<PochaInfoWithoutStatus[]> {
  const url = `/pocha/previous/?date=${date.toISOString().split(".")[0]}`;
  try {
    const response = await client.get(url);
    // Transform the date strings to Date objects
    return response.data.map((pocha: any) => ({
      ...pocha,
      startDate: new Date(pocha.startDate),
      endDate: new Date(pocha.endDate),
    }));
  } catch (error) {
    throw new Error("Error fetching previous pocha information");
  }
}

/**
 * @desc Fetch pocha menu
 * @route GET /pocha/menu/${pochaid}
 */
export async function getPochaMenu(
  pochaid: number,
  token?: string
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
  const url = `/pocha/order/${email}/${pochaid}/`;
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

/**
 * @desc Fetch all orders of pocha
 * @route GET /pocha/orders/${pochaid}
 */
export async function getPochaOrders(
  pochaid: number,
  token: string
): Promise<Orders | undefined> {
  const url = `/pocha/dashboard/${pochaid}/`;
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

/**
 * @desc Fetch user's closed orders
 * @route GET /pocha/orders/${email}/${pochaid}/closed
 */
export async function getUserClosedOrders(
  email: string,
  pochaid: number,
  token: string
): Promise<OrderHistory | undefined> {
  const url = `/pocha/order/${email}/${pochaid}/closed/`;
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

/**
 * @desc Fetch all closed orders
 * @route GET /pocha/orders/${pochaid}/closed
 */
export async function getPochaClosedOrders(
  pochaid: number,
  token: string
): Promise<OrderHistory | undefined> {
  const url = `/pocha/dashboard/${pochaid}/closed/`;
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

    return response?.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
