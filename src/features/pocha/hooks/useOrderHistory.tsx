import {
  getUserClosedOrders,
  getUserClosedOrdersMock,
  getPochaClosedOrders,
  getPochaClosedOrdersMock,
} from "@/apis/pocha/queries";
import { OrderItem, Orders } from "@/types/pocha";
import { useEffect, useState } from "react";

/**
 * @desc hook to fetch user orders (getUserOrders)
 * @params email, token, pochaID
 */
const useOrderHistory = (email: string, token: string, pochaID: number) => {
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
        // const res = await getUserClosedOrders(email, pochaID, token);
        const res = await getUserClosedOrdersMock(email, pochaID, token);

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
        // const res = await getPochaClosedOrders(pochaID, token);
        const res = await getPochaClosedOrdersMock(pochaID, token);

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

  // extract total list of order items from Orders (map<number, OrderItemWithWaiting>)
  useEffect(() => {
    if (!orders) {
      return;
    }

    const orderItemsList: OrderItem[] = [];
    orders.forEach((order) => {
      order.orderItemsList.forEach((orderItem) => {
        orderItemsList.push(orderItem);
      });
    });

    setOrderItems(orderItemsList);
  }, [orders]);

  return {
    orders,
    orderHistory: orderItems,
    status,
  };
};

export default useOrderHistory;
