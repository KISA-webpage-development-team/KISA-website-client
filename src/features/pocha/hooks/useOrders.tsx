import { getUserOrders, getUserOrdersMock } from "@/apis/pocha/queries";
import { Orders } from "@/types/pocha";
import { useEffect, useState } from "react";

/**
 * @desc hook to fetch user orders (getUserOrders)
 */
const useOrders = (email: string, token: string, pochaID: number) => {
  const [orders, setOrders] = useState<Orders>();
  const [status, setStatus] = useState<string>("loading");

  // fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
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

    if (email && pochaID && token) {
      fetchOrders();
    }
  }, [email, pochaID, token]);

  return { orders, status };
};

export default useOrders;
