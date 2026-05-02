import { getPochaOrders } from "@/apis/pocha/queries";
import { OrderItem, Orders, OrderStatus } from "@/types/pocha";
import { useCallback, useEffect, useState, useMemo } from "react";

const IS_MOCK_MODE = process.env.NEXT_PUBLIC_MOCK_API === "1";

// utility functions ----------------------------------------
/*
  @desc get the next status of the order item
  @param status: OrderStatus
  @return OrderStatus | null
*/
export const getNextStatus = (status: OrderStatus): OrderStatus | null => {
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
const convertOrdersToMap = (orders: Orders) => {
  const map = new Map<number, OrderItem>();
  [...orders.pending, ...orders.preparing, ...orders.ready].forEach((order) => {
    map.set(order.orderItemID, order);
  });
  return map;
};

/*
  @desc filter orders by status
  @param ordersMap: Map<number, OrderItem>
  @param isImmediatePrep: boolean
  @return Orders
*/
const filterOrdersByStatus = (
  ordersMap: Map<number, OrderItem>,
  isImmediatePrep: boolean
): Orders => {
  const statuses = [
    OrderStatus.PENDING,
    OrderStatus.PREPARING,
    OrderStatus.READY,
  ];

  return statuses.reduce((acc, status) => {
    acc[status] = Array.from(ordersMap.values()).filter(
      (order) =>
        order.status === status &&
        Boolean(order.menu.isImmediatePrep) === isImmediatePrep
    );
    return acc;
  }, {} as Orders);
};

// hooks ----------------------------------------
/*
  @desc hook to fetch pocha orders and store in map
  @param pochaID: number
  @param token: string
  @return { ordersMap, status, setOrdersMap, setStatus }
*/
const usePochaOrdersMap = (pochaID: number, token: string) => {
  // ordersMap: Map<orderItemID, OrderItem>
  // map is used for faster lookup to update the UI
  const [ordersMap, setOrdersMap] = useState<Map<number, OrderItem>>(new Map());
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [error, setError] = useState<Error | undefined>(undefined);

  const fetchPochaOrders = useCallback(async () => {
    // Skip when callers pass placeholder inputs (e.g. dashboard page calls
    // this hook before pochaID/token have resolved). Without this, an early
    // fetch against /pocha/dashboard/null/ races the real one and its late
    // rejection clobbers a "success" status with "error".
    if (!pochaID || !token) return;
    setStatus("loading");
    setError(undefined);
    try {
      const res: Orders = await getPochaOrders(pochaID, token);
      setOrdersMap(convertOrdersToMap(res));
      setStatus("success");
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      setStatus("error");
    }
  }, [pochaID, token]);

  useEffect(() => {
    if (!pochaID || !token) return;
    let cancelled = false;
    (async () => {
      try {
        const res: Orders = await getPochaOrders(pochaID, token);
        if (cancelled) return;
        setOrdersMap(convertOrdersToMap(res));
        setStatus("success");
      } catch (err) {
        if (cancelled) return;
        console.error("Error fetching orders:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
        setStatus("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [pochaID, token]);

  return { ordersMap, status, error, setOrdersMap, setStatus, refetch: fetchPochaOrders };
};

/*
  @desc Main hook to manage pocha orders
  @param pochaID: number
  @param token: string
  @return { immediatePrepOrders, notImmediatePrepOrders, addNewOrderItem, updateOrderItemStatusUI, status }
*/
const useDashboardOrders = (pochaID: number, token: string) => {
  const { ordersMap, status, error, setOrdersMap, refetch } =
    usePochaOrdersMap(pochaID, token);

  const addNewOrderItem = useCallback(
    (orderItem: OrderItem) => {
      setOrdersMap((prevOrdersMap) => {
        if (prevOrdersMap.has(orderItem.orderItemID)) {
          console.warn("Order item already exists:", orderItem.orderItemID);
          return prevOrdersMap;
        }
        const updatedMap = new Map(prevOrdersMap);
        updatedMap.set(orderItem.orderItemID, orderItem);
        return updatedMap;
      });
    },
    [setOrdersMap]
  );

  // Mock-mode bridge: MockAuthToggle's "Simulate order" button POSTs to the
  // mock spawn endpoint and dispatches `mock:new-order` with the spawned
  // OrderItem in `event.detail`. The socket hook is short-circuited in mock,
  // so this CustomEvent is the dashboard's only ingest path during dev.
  useEffect(() => {
    if (!IS_MOCK_MODE) return;
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<OrderItem>).detail;
      if (detail) addNewOrderItem(detail);
    };
    window.addEventListener("mock:new-order", handler);
    return () => window.removeEventListener("mock:new-order", handler);
  }, [addNewOrderItem]);

  // More efficient order item status update using Map
  const updateOrderItemStatusUI = useCallback(
    (orderItemID: number, newStatus: OrderStatus) => {
      setOrdersMap((prevOrdersMap) => {
        const updatedMap = new Map(prevOrdersMap);
        const order = updatedMap.get(orderItemID);
        if (!order) return updatedMap;

        // const nextStatus = getNextStatus(order.status);
        if (newStatus) {
          // Clone the order object to avoid mutating the original
          // Remove the order first, then add it back to the end of the Map
          updatedMap.delete(orderItemID);
          updatedMap.set(orderItemID, { ...order, status: newStatus });
        }
        return updatedMap;
      });
    },
    [setOrdersMap]
  );

  // Derived state using the utility function
  const immediatePrepOrders = useMemo(() => {
    if (!ordersMap.size) return { pending: [], preparing: [], ready: [] };
    return filterOrdersByStatus(ordersMap, true);
  }, [ordersMap]);

  const notImmediatePrepOrders = useMemo(() => {
    if (!ordersMap.size) return { pending: [], preparing: [], ready: [] };
    return filterOrdersByStatus(ordersMap, false);
  }, [ordersMap]);

  return {
    ordersMap,
    immediatePrepOrders,
    notImmediatePrepOrders,
    addNewOrderItem,
    updateOrderItemStatusUI,
    status,
    error,
    refetch,
  };
};

export default useDashboardOrders;
