interface PochaInfo {
  pochaid: number;
  startTime: Date;
  endTime: Date;
  title: string;
  description: string;
}

type PochaTab = "menu" | "orders";

export type { PochaInfo, PochaTab };
