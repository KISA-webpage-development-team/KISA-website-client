import { getUserOrders, getPochaOrders } from "@/apis/pocha/queries";
import { OrderItem, Orders, OrderStatus } from "@/types/pocha";
import { useCallback, useEffect, useState } from "react";

/**
 * @desc hook to fetch user orders (getUserOrders)
 * @params email, token, pochaID
 */
const useOrders = (email: string, token: string, pochaID: number) => {
  const [orders, setOrders] = useState<Orders>();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  const [pendingOrders, setPendingOrders] = useState<OrderItem[]>();
  const [preparingOrders, setPreparingOrders] = useState<OrderItem[]>();
  const [readyOrders, setReadyOrders] = useState<OrderItem[]>();

  // fetch orders
  useEffect(() => {
    // app
    const fetchUserOrders = async () => {
      try {
        const res = await getUserOrders(email, pochaID, token);
        // const res = await getUserOrdersMock(email, pochaID, token);
        console.log("res: ", res);
        setOrders(res);

        setPendingOrders(res?.pending);
        setPreparingOrders(res?.preparing);
        setReadyOrders(res?.ready);

        setStatus("success");
      } catch (error) {
        console.error("Error fetching orders: ", error);
        setStatus("error");
      }
    };

    // dashboard
    const fetchAllOrders = async () => {
      try {
        const res = await getPochaOrders(pochaID, token);
        // const res = await getPochaOrdersMock(pochaID, token);

        setOrders(res);

        setPendingOrders(res?.pending);
        setPreparingOrders(res?.preparing);
        setReadyOrders(res?.ready);

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

  const addNewOrders = (items: OrderItem[]) => {
    // add new items to the pending status list

    // update the state
    setOrders((prevOrders) => {
      return {
        ...prevOrders,
        ["pending"]: [...prevOrders["pending"], ...items],
      };
    });

    setPendingOrders((prevOrders) => {
      return [...prevOrders!, ...items];
    });

    return;
  };

  const updateOrders = useCallback(
    (orderItemID: number, newStatus: OrderStatus) => {
      if (newStatus === "preparing") {
        // find the order item in pending orders
        const orderItem = {
          ...pendingOrders?.find((item) => item.orderItemID === orderItemID),
          status: newStatus,
        };

        console.log("new PReparing orderItem: ", orderItem);

        // remove the order item from pending orders
        setPendingOrders((prevOrders) => {
          return prevOrders?.filter((item) => item.orderItemID !== orderItemID);
        });

        // add the order item to preparing orders
        setPreparingOrders((prevOrders) => {
          return [...prevOrders, orderItem];
        });
      } else if (newStatus === "ready") {
        // find the order item in preparing orders

        const orderItem = {
          ...preparingOrders?.find((item) => item.orderItemID === orderItemID),
          status: newStatus,
        };

        console.log("new Ready orderItems: ", orderItem);

        // remove the order item from preparing orders
        setPreparingOrders((prevOrders) => {
          return prevOrders?.filter((item) => item.orderItemID !== orderItemID);
        });

        // add the order item to ready orders
        setReadyOrders((prevOrders) => {
          return [...prevOrders, orderItem];
        });
      } else if (newStatus === "closed") {
        // remove the order item from ready orders
        setReadyOrders((prevOrders) => {
          return prevOrders?.filter((item) => item.orderItemID !== orderItemID);
        });
      }

      // Update the main orders state using the functional update pattern
      setOrders((prevOrders) => {
        if (!prevOrders) return prevOrders;
        return {
          ...prevOrders,
          pending: pendingOrders || [],
          preparing: preparingOrders || [],
          ready: readyOrders || [],
        };
      });
    },
    [pendingOrders, preparingOrders, readyOrders]
  );

  return {
    orders,
    addNewOrders,
    updateOrders,
    pendingOrders,
    preparingOrders,
    readyOrders,
    status,
  };
};

export default useOrders;
