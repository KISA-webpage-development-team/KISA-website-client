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

  const updateOrders = (menuID: number, newStatus: OrderStatus) => {
    setOrders((prevOrders) => {
      if (!prevOrders) return prevOrders;

      // Create new state object
      const updatedOrders = { ...prevOrders };

      // Find the item in the appropriate list based on current status
      let sourceList: OrderStatus | null = null;
      let itemToMove: OrderItem | null = null;

      // Find which list contains the item
      if (newStatus === "preparing") {
        const item = updatedOrders.pending.find(
          (item) => item.menu.menuID === menuID
        );
        if (item) {
          sourceList = "pending";
          itemToMove = item;
        }
      } else if (newStatus === "ready") {
        const item = updatedOrders.preparing.find(
          (item) => item.menu.menuID === menuID
        );
        if (item) {
          sourceList = "preparing";
          itemToMove = item;
        }
      } else if (newStatus === "closed") {
        // Check all lists for the item
        ["pending", "preparing", "ready"].forEach((status) => {
          const item = updatedOrders[status as OrderStatus].find(
            (item) => item.menuID === menuID
          );
          if (item) {
            sourceList = status as OrderStatus;
            itemToMove = item;
          }
        });
      }

      // If item was found, update the lists
      if (sourceList && itemToMove) {
        // Remove item from source list
        updatedOrders[sourceList] = updatedOrders[sourceList].filter(
          (item) => item.menuID !== menuID
        );

        // Add item to destination list (except for closed status)
        if (newStatus !== "closed") {
          updatedOrders[newStatus] = [...updatedOrders[newStatus], itemToMove];
        }
      }

      return updatedOrders;
    });

    return;
  };

  return {
    orders,
    addNewOrders,
    updateOrders,
    pendingOrders: orders?.pending,
    preparingOrders: orders?.preparing,
    readyOrders: orders?.ready,
    status,
  };
};

export default useOrders;
