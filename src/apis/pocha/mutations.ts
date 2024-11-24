import client from "@/lib/axios/client";
import { AddItemToCartBody } from "@/types/pocha";

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
 * @desc Notify the status of payment
 * @route PUT /pocha/{email}/{pochaid}/pay-result/
 * @params body: { result: "success" | "failure"}
 */
export async function notifyPayResult(
  email: string,
  pochaid: number,
  body: { result: "success" | "failure" }
) {
  const url = `/pocha/cart/${email}/${pochaid}/pay-result/`;

  try {
    const response = await client.put(url, body);
    return response?.data;
  } catch (error) {
    return undefined;
  }
}

// [DEPRECATED]
export async function updateCartIsPaidMock(email: string, pochaid: number) {
  return true;
}

/**
 * @desc Change Status of order item
 * @route PUT /pocha/dashboard/${orderItemId}/change-status/
 * @params no body
 */
export async function changeOrderItemStatus(orderItemId: number) {
  const url = `/pocha/dashboard/${orderItemId}/change-status/`;

  try {
    const response = await client.put(url);
    return response?.data;
  } catch (error) {
    return undefined;
  }
}
