import client from "@/lib/axios/client";
import { AddItemToCartBody } from "@/types/pocha";
import { ex } from "@fullcalendar/core/internal-common";

/**
 * @desc Change items inside the cart
 * @route POST /pocha/cart/{email}/{pochaid}
 * @example
 * valid: { message: "Items posted successfully" }
 * invalid: 401, { message: "Items not created" }
 */
export async function changeItemInCart(
  email: string,
  pochaid: number,
  body: AddItemToCartBody
) {
  const url = `/pocha/cart/${email}/${pochaid}/`;

  console.log("sending body: ", body);
  try {
    const response = await client.post(url, body, {
      // headers: {
      //     Authorization: `Bearer ${token}`,
      // },
    });
    return response?.data;
  } catch (error) {
    return undefined;
  }
}

/**
 * @desc Update isPaid status of cart to true
 * @route PUT /pocha/cart/{email}/{pochaid}/paid-cart
 */
export async function updateCartIsPaid(email: string, pochaid: number) {
  const url = `/pocha/cart/${email}/${pochaid}/paid-cart`;

  try {
    const response = await client.put(url);
    return response?.data;
  } catch (error) {
    return undefined;
  }
}

export async function updateCartIsPaidMock(email: string, pochaid: number) {
  return true;
}
