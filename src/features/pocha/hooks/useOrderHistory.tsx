import {
  getUserClosedOrders,
  getUserClosedOrdersMock,
  getPochaClosedOrders,
  getPochaClosedOrdersMock,
} from "@/apis/pocha/queries";
import { OrderHistory, OrderItem, Orders } from "@/types/pocha";
import { useEffect, useState } from "react";

/**
 * @desc hook to fetch user orders (getUserOrders)
 * @params email, token, pochaID
 */
const useOrderHistory = (email: string, token: string, pochaID: number) => {
  const [orderHistory, setOrderHistory] = useState<OrderHistory>();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  // fetch orders
  useEffect(() => {
    // app
    const fetchUserOrders = async () => {
      try {
        const res = await getUserClosedOrders(email, pochaID, token);
        // const res = await getUserClosedOrdersMock(email, pochaID, token);

        setOrderHistory(res);
        setStatus("success");
      } catch (error) {
        console.error("Error fetching orders: ", error);
        setStatus("error");
      }
    };

    // dashboard
    const fetchAllOrders = async () => {
      try {
        const res = await getPochaClosedOrders(pochaID, token);
        // const res = await getPochaClosedOrdersMock(pochaID, token);

        setOrderHistory(res);
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
    orderHistory: orderHistory?.closed,
    status,
  };
};

export default useOrderHistory;
