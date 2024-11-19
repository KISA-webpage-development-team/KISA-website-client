import client from "@/lib/axios/client";
import { AddItemToCartBody } from "@/types/pocha";

/**
 * @desc Add items to cart
 * @route POST /pocha/cart/{email}/
 * @example
 * valid: { message: "Items posted successfully" }
 * invalid: 401, { message: "Items not created" }
 */

export async function addItemToCart(
  email: string,
  pochaid: number,
  body: AddItemToCartBody
) {
  const url = `/pocha/cart/${email}/${pochaid}`;
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
