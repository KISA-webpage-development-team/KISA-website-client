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

export interface MenuDetails {
  menuid: number;
  nameKor: string;
  nameEng: string;
  price: number;
  stock: number;
  isImmediatePrep: boolean;
  parentPochaId: number;
}

export interface TotalCarts {
  menu: MenuDetails;
  quantity: number;
  totalPrice: number;
}
