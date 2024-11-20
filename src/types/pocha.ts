interface PochaInfo {
  pochaid: number;
  startTime: Date;
  endTime: Date;
  title: string;
  description: string;
  ongoing: boolean;
}

type PochaTab = "menu" | "orders";

export type { PochaInfo, PochaTab };

// MENU -----------------------------------------------------------------------

interface MenuItem {
  menuid: number;
  nameKor: string;
  nameEng: string;
  price: number;
  stock: number;
  isImmediatePrep: boolean;
  parentPochaId: number;
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
  menuid: number;
  quantity: number;
}

// key: menuid  value: CartItem
type Cart = Map<number, CartItem>;

export type { Cart, CartItem, AddItemToCartBody };
