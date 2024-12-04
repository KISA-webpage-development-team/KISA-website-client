interface PochaInfo {
  pochaID: number;
  startDate: Date;
  endDate: Date;
  title: string;
  description: string;
  ongoing: boolean;
}

type PochaTab = "menu" | "orders";

export type { PochaInfo, PochaTab };

// MENU -----------------------------------------------------------------------

interface MenuItem {
  menuID: number;
  nameKor: string;
  nameEng: string;
  price: number;
  stock: number;
  isImmediatePrep: boolean;
  parentPochaId: number;
  ageCheckRequired: boolean;
}

interface MenuByCategory {
  category: string;
  menusList: MenuItem[];
}

export type { MenuItem, MenuByCategory };

// CART -----------------------------------------------------------------------
interface CartItem {
  menu: MenuItem;
  quantity: number;
  // totalPrice: number;
}

interface AddItemToCartBody {
  menuID: number;
  quantity: number;
}

// key: menuID  value: CartItem
type Cart = Map<number, CartItem>;

type PayInfo = {
  amount: number;
  ageCheckRequired: "true" | "false";
};

export type { Cart, CartItem, AddItemToCartBody, PayInfo };

// ORDER -----------------------------------------------------------------------
type OrderStatus = "pending" | "preparing" | "ready" | "closed";

interface OrderItem {
  orderItemID: number;
  status: OrderStatus;
  menu: MenuItem;
  quantity: number;
}

interface Orders {
  pending: OrderItem[];
  preparing: OrderItem[];
  ready: OrderItem[];
}

interface OrderHistory {
  closed: OrderItem[];
}

export type { OrderItem, OrderStatus, Orders, OrderHistory };
