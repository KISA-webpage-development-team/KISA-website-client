interface PochaInfo {
  pochaid: number;
  startTime: Date;
  endTime: Date;
  title: string;
  description: string;
  ongoing: boolean;
}

type PochaTab = "menu" | "orders";

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

interface CartItem {
  menu: MenuItem;
  quantity: number;
  // totalPrice: number;
}

export type { PochaInfo, PochaTab, MenuItem, MenuByCategory, CartItem };
