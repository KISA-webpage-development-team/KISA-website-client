import { getUserOrders, getPochaOrders } from "@/apis/pocha/queries";
import { OrderItem, Orders, OrderStatus } from "@/types/pocha";
import { useCallback, useEffect, useState } from "react";

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
const convertOrdersToMap = (orders: Orders) => {
  const map = new Map<number, OrderItem>();
  [...orders.pending, ...orders.preparing, ...orders.ready].forEach((order) => {
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

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const res = await getUserOrders(email, pochaID, token);
        setOrdersMap(convertOrdersToMap(res));
        setStatus("success");
      } catch (error) {
        console.error("Error fetching orders: ", error);
        setStatus("error");
      }
    };

    if (pochaID && token) {
      fetchUserOrders();
    }
  }, [email, pochaID, token]);

  return { ordersMap, status, setOrdersMap, setStatus };
};

/**
 * @desc hook to fetch user orders (getUserOrders)
 * @params email, token, pochaID
 */

const useOrders = (email: string, token: string, pochaID: number) => {
  const { ordersMap, status, setOrdersMap, setStatus } = useUserOrdersMap(
    email,
    token,
    pochaID
  );

  const updateOrder = (orderItemID: number) => {
    setOrdersMap((prevMap) => {
      const newMap = new Map(prevMap);
      const orderItem = prevMap.get(orderItemID);

      // if orderItem.menu.isImmediatePrep, then we need to "jump" preparing step
      // pending -> ready
      // ready -> closed

      if (
        orderItem?.menu.isImmediatePrep &&
        orderItem?.status === OrderStatus.PENDING
      ) {
        newMap.set(orderItemID, {
          ...orderItem,
          status: OrderStatus.READY,
        });
      } else {
        const nextStatus = getNextStatus(orderItem?.status);
        if (nextStatus) {
          newMap.set(orderItemID, {
            ...orderItem,
            status: nextStatus,
          });
        }
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

  return {
    updateOrder,
    addNewOrderItem,
    pendingOrders,
    preparingOrders,
    readyOrders,
    status,
  };
};
// const useOrders = (email: string, token: string, pochaID: number) => {
//   const [orders, setOrders] = useState<Orders>();
//   const [status, setStatus] = useState<"loading" | "success" | "error">(
//     "loading"
//   );

//   const [pendingOrders, setPendingOrders] = useState<OrderItem[]>();
//   const [preparingOrders, setPreparingOrders] = useState<OrderItem[]>();
//   const [readyOrders, setReadyOrders] = useState<OrderItem[]>();

//   // fetch orders
//   useEffect(() => {
//     // app
//     const fetchUserOrders = async () => {
//       try {
//         const res = await getUserOrders(email, pochaID, token);
//         // const res = await getUserOrdersMock(email, pochaID, token);
//         console.log("res: ", res);
//         setOrders(res);

//         setPendingOrders(res?.pending);
//         setPreparingOrders(res?.preparing);
//         setReadyOrders(res?.ready);

//         setStatus("success");
//       } catch (error) {
//         console.error("Error fetching orders: ", error);
//         setStatus("error");
//       }
//     };

//     // dashboard
//     const fetchAllOrders = async () => {
//       try {
//         const res = await getPochaOrders(pochaID, token);
//         // const res = await getPochaOrdersMock(pochaID, token);

//         setOrders(res);

//         setPendingOrders(res?.pending);
//         setPreparingOrders(res?.preparing);
//         setReadyOrders(res?.ready);

//         setStatus("success");
//       } catch (error) {
//         console.error("Error fetching orders: ", error);
//         setStatus("error");
//       }
//     };

//     if (pochaID && token) {
//       if (email === "*") {
//         fetchAllOrders();
//       } else {
//         fetchUserOrders();
//       }
//     }
//   }, [email, pochaID, token]);

//   const addNewOrders = (items: OrderItem[]) => {
//     // add new items to the pending status list

//     // update the state
//     setOrders((prevOrders) => {
//       return {
//         ...prevOrders,
//         ["pending"]: [...prevOrders["pending"], ...items],
//       };
//     });

//     setPendingOrders((prevOrders) => {
//       return [...prevOrders!, ...items];
//     });

//     return;
//   };

//   const updateOrders = useCallback(
//     (orderItemID: number, newStatus: OrderStatus) => {
//       if (newStatus === "preparing") {
//         // find the order item in pending orders
//         const orderItem = {
//           ...pendingOrders?.find((item) => item.orderItemID === orderItemID),
//           status: newStatus,
//         };

//         console.log("new PReparing orderItem: ", orderItem);

//         // remove the order item from pending orders
//         setPendingOrders((prevOrders) => {
//           return prevOrders?.filter((item) => item.orderItemID !== orderItemID);
//         });

//         // add the order item to preparing orders
//         setPreparingOrders((prevOrders) => {
//           return [...prevOrders, orderItem];
//         });
//       } else if (newStatus === "ready") {
//         // find the order item in preparing orders

//         const orderItem = {
//           ...preparingOrders?.find((item) => item.orderItemID === orderItemID),
//           status: newStatus,
//         };

//         console.log("new Ready orderItems: ", orderItem);

//         // remove the order item from preparing orders
//         setPreparingOrders((prevOrders) => {
//           return prevOrders?.filter((item) => item.orderItemID !== orderItemID);
//         });

//         // add the order item to ready orders
//         setReadyOrders((prevOrders) => {
//           return [...prevOrders, orderItem];
//         });
//       } else if (newStatus === "closed") {
//         // remove the order item from ready orders
//         setReadyOrders((prevOrders) => {
//           return prevOrders?.filter((item) => item.orderItemID !== orderItemID);
//         });
//       }

//       // Update the main orders state using the functional update pattern
//       setOrders((prevOrders) => {
//         if (!prevOrders) return prevOrders;
//         return {
//           ...prevOrders,
//           pending: pendingOrders || [],
//           preparing: preparingOrders || [],
//           ready: readyOrders || [],
//         };
//       });
//     },
//     [pendingOrders, preparingOrders, readyOrders]
//   );

//   return {
//     orders,
//     addNewOrders,
//     updateOrders,
//     pendingOrders,
//     preparingOrders,
//     readyOrders,
//     status,
//   };
// };

export default useOrders;
