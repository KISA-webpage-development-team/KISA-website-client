import { OrderStatus, Orders } from "@/types/pocha";
import OrderBoard from "./OrderBoard";

interface FoodOrderGridProps {
  token: string;
  orders: Orders;
  updateOrderItemStatusUI: (
    orderItemID: number,
    newStatus: OrderStatus
  ) => void;
  selectMode: boolean;
  onEnterSelectMode?: () => void;
  onPromotingChange?: (isPromoting: boolean) => void;
}

export default function FoodOrderGrid(props: FoodOrderGridProps) {
  return (
    <OrderBoard
      kind="food"
      titleEn="Food"
      titleKo="음식 주문"
      columns={["pending", "preparing", "ready"]}
      gridColumnsMd={3}
      headerPaddingX="px-4"
      {...props}
    />
  );
}
