import { getUserOrders, getUserClosedOrders } from "@/apis/pocha/queries";
import { OrderHistory, OrderItem, Orders, OrderStatus } from "@/types/pocha";
import { useCallback, useEffect, useRef, useState } from "react";

const IS_MOCK_MODE = process.env.NEXT_PUBLIC_MOCK_API === "1";
const MOCK_POLL_INTERVAL_MS = 1500;

/*
  @desc get the next status of the order item
  @param status: OrderStatus
  @return OrderStatus | null
*/
const getNextStatus = (status: OrderStatus): OrderStatus | null => {
  const statusFlow = {
    [OrderStatus.PENDING]: OrderStatus.PREPARING,
    [OrderStatus.PREPARING]: OrderStatus.READY,
    [OrderStatus.READY]: OrderStatus.CLOSED,
    [OrderStatus.CLOSED]: null,
  };
  return statusFlow[status] || null;
};

/*
  @desc convert orders to map
  @param orders: Orders
  @return Map<number, OrderItem>
*/
const convertOrdersToMap = (orders: Orders & OrderHistory) => {
  const map = new Map<number, OrderItem>();
  [
    ...orders.pending,
    ...orders.preparing,
    ...orders.ready,
    ...orders.closed,
  ].forEach((order) => {
    map.set(order.orderItemID, order);
  });
  return map;
};

/*
  @desc hook to fetch user orders (getUserOrders)
  @params email, token, pochaID
*/
const useUserOrdersMap = (email: string, token: string, pochaID: number) => {
  const [ordersMap, setOrdersMap] = useState<Map<number, OrderItem>>(new Map());
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  const isMountedRef = useRef(true);

  const fetchUserOrders = useCallback(async () => {
    try {
      const [res, closedRes] = await Promise.all([
        getUserOrders(email, pochaID, token),
        getUserClosedOrders(email, pochaID, token),
      ]);

      if (!isMountedRef.current) return;

      const orders = {
        ...res,
        closed: closedRes.closed,
      };

      setOrdersMap(convertOrdersToMap(orders));
      setStatus("success");
    } catch (error) {
      if (!isMountedRef.current) return;
      console.error("Error fetching orders: ", error);
      setStatus("error");
    }
  }, [email, pochaID, token]);

  useEffect(() => {
    isMountedRef.current = true;
    if (pochaID && token) {
      fetchUserOrders();
    }
    return () => {
      isMountedRef.current = false;
    };
  }, [pochaID, token, fetchUserOrders]);

  // Mock-mode polling: WS is short-circuited in mock, so poll for status
  // changes triggered by Simulate Promote (or any other mock mutation).
  useEffect(() => {
    if (!IS_MOCK_MODE) return;
    if (!pochaID || !token) return;
    const id = setInterval(() => {
      fetchUserOrders();
    }, MOCK_POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [pochaID, token, fetchUserOrders]);

  return { ordersMap, status, setOrdersMap, setStatus };
};

/**
 * @desc hook to fetch user orders (getUserOrders)
 * @params email, token, pochaID
 */

const useUserOrders = (email: string, token: string, pochaID: number) => {
  const { ordersMap, status, setOrdersMap, setStatus } = useUserOrdersMap(
    email,
    token,
    pochaID
  );

  const updateOrder = (orderItemID: number, newStatus: OrderStatus) => {
    setOrdersMap((prevMap) => {
      const newMap = new Map(prevMap);
      const orderItem = prevMap.get(orderItemID);

      // update order items status based on the new status
      if (orderItem && orderItem.status) {
        newMap.delete(orderItemID);
        newMap.set(orderItemID, { ...orderItem, status: newStatus });
      }

      return newMap;
    });
  };

  const addNewOrderItem = (orderItem: OrderItem) => {
    setOrdersMap((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.set(orderItem.orderItemID, orderItem);
      return newMap;
    });
  };

  const pendingOrders = Array.from(ordersMap.values()).filter(
    (order) => order.status === "pending"
  );
  const preparingOrders = Array.from(ordersMap.values()).filter(
    (order) => order.status === "preparing"
  );
  const readyOrders = Array.from(ordersMap.values()).filter(
    (order) => order.status === "ready"
  );
  const closedOrders = Array.from(ordersMap.values()).filter(
    (order) => order.status === "closed"
  );

  return {
    updateOrder,
    addNewOrderItem,
    pendingOrders,
    preparingOrders,
    readyOrders,
    closedOrders,
    status,
  };
};

export default useUserOrders;
