// src/pages/api/orders/sync.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getUserOrders, getUserClosedOrders } from "@/apis/pocha/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email, pochaID } = req.query;
    const token = req.headers.authorization?.split(" ")[1];

    if (!email || !pochaID || !token) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    // Fetch orders
    const [orders, closedOrders] = await Promise.all([
      getUserOrders(email as string, Number(pochaID), token),
      getUserClosedOrders(email as string, Number(pochaID), token),
    ]);

    console.log("sync orders: ", orders, closedOrders);

    // Combine orders
    const allOrders = {
      ...orders,
      closed: closedOrders.closed,
    };

    res.status(200).json(allOrders);
  } catch (error) {
    console.error("Error syncing orders:", error);
    res.status(500).json({ error: "Failed to sync orders" });
  }
}
