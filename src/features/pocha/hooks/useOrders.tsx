import {
  getUserOrders,
  getUserOrdersMock,
  getPochaOrdersMock,
  getPochaOrders,
} from "@/apis/pocha/queries";
import { OrderItem, Orders } from "@/types/pocha";
import { useEffect, useState } from "react";

/**
 * @desc hook to fetch user orders (getUserOrders)
 * @params email, token, pochaID
 */
const useOrders = (email: string, token: string, pochaID: number) => {
  const [orders, setOrders] = useState<Orders>();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  const [orderItems, setOrderItems] = useState<OrderItem[]>();

  // fetch orders
  useEffect(() => {
    // app
    const fetchUserOrders = async () => {
      try {
        // const res = await getUserOrders(email, pochaID, token);
        const res = await getUserOrdersMock(email, pochaID, token);

        setOrders(res);
        setStatus("success");
      } catch (error) {
        console.error("Error fetching orders: ", error);
        setStatus("error");
      }
    };

    // dashboard
    const fetchAllOrders = async () => {
      try {
        // const res = await getPochaOrders(pochaID, token);
        const res = await getPochaOrdersMock(pochaID, token);

        setOrders(res);
        setStatus("success");
      } catch (error) {
        console.error("Error fetching orders: ", error);
        setStatus("error");
      }
    };

    if (pochaID && token) {
      if (email === "*") {
        fetchAllOrders();
      } else {
        fetchUserOrders();
      }
    }
  }, [email, pochaID, token]);

  return {
    orders,
    pendingOrders: orders?.pending,
    preparingOrders: orders?.preparing,
    readyOrders: orders?.ready,
    status,
  };
};

export default useOrders;
