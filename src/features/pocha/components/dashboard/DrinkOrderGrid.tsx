import { OrderStatus, Orders } from "@/types/pocha";
import OrderBoard from "./OrderBoard";

interface DrinkOrderGridProps {
  orders: Orders;
  updateOrderItemStatusUI: (
    orderItemID: number,
    newStatus: OrderStatus
  ) => void;
  selectMode: boolean;
  onEnterSelectMode?: () => void;
  onPromotingChange?: (isPromoting: boolean) => void;
}

// Drinks are pour-and-serve — no `preparing` stage.
export default function DrinkOrderGrid(props: DrinkOrderGridProps) {
  return (
    <OrderBoard
      kind="drink"
      titleEn="Drinks"
      titleKo="음료 주문"
      columns={["pending", "ready"]}
      gridColumnsMd={2}
      headerPaddingX="px-3"
      {...props}
    />
  );
}
