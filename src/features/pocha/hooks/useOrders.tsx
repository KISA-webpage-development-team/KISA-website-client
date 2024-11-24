import {
  getUserOrders,
  getUserOrdersMock,
  getPochaOrdersMock,
  getPochaOrders,
} from "@/apis/pocha/queries";
import { OrderItem, Orders, OrderStatus } from "@/types/pocha";
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

    return;
  };

  const updateOrders = (orderItemID: number, newStatus: OrderStatus) => {
    if (newStatus === "preparing") {
      // remove orderItemID from pending
      // add orderItemID to preparing
      const orderToMove = pendingOrders?.find(
        (order) => order.orderItemID === orderItemID
      );
      if (orderToMove) {
        orderToMove.status = newStatus;
        preparingOrders?.push(orderToMove);
      }
      setPreparingOrders(preparingOrders);

      setPendingOrders(
        pendingOrders?.filter((order) => order.orderItemID !== orderItemID)
      );

      // update the state
      setOrders((prevOrders) => {
        return {
          ...prevOrders,
          ["pending"]: pendingOrders,
          ["preparing"]: preparingOrders,
        };
      });

      console.log("pendingOrders: ", pendingOrders);
      console.log("preparingOrders: ", preparingOrders);
    }

    if (newStatus === "ready") {
      // remove orderItemID from preparing
      // add orderItemID to ready
      const orderToMove = preparingOrders?.find(
        (order) => order.orderItemID === orderItemID
      );
      if (orderToMove) {
        orderToMove.status = newStatus;
        readyOrders?.push(orderToMove);
      }
      setReadyOrders(readyOrders);

      setPreparingOrders(
        preparingOrders?.filter((order) => order.orderItemID !== orderItemID)
      );

      // update the state
      setOrders((prevOrders) => {
        return {
          ...prevOrders,
          ["preparing"]: preparingOrders,
          ["ready"]: readyOrders,
        };
      });
    }

    if (newStatus === "closed") {
      // remove orderItemID from ready
      setReadyOrders(
        readyOrders?.filter((order) => order.orderItemID !== orderItemID)
      );

      // update the state
      setOrders((prevOrders) => {
        return {
          ...prevOrders,
          ["ready"]: readyOrders,
        };
      });
    }
  };

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
