import { getPochaMenu } from "@/apis/pocha/queries";
import { MenuByCategory } from "@/types/pocha";
import { useEffect, useState } from "react";

/**
 * @desc hook to fetch menu of pocha (getPochaMenu)
 */
const useMenu = (pochaID: number, token: string) => {
  const [menuList, setMenuList] = useState<MenuByCategory[]>(undefined);
  const [status, setStatus] = useState<string>("loading");

  // fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // const res = await getUserOrders(email, pochaID, token);
        const res = await getPochaMenu(pochaID, token);

        setMenuList(res);
        setStatus("success");
      } catch (error) {
        console.error("Error fetching orders: ", error);
        setStatus("error");
      }
    };

    if (pochaID && token) {
      fetchOrders();
    }
  }, [pochaID, token]);

  return { menuList, status };
};

export default useMenu;
