"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@umichkisa-ds/web";

import { OrderItem } from "@/types/pocha";
import {
  analyzeSojuSales,
  calculateDrinkRankings,
  calculateFoodRankings,
  calculateSummary,
  calculateTotalSales,
} from "../../utils/orderHistoryUtils";

interface OrderSummaryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pochaID: number;
  orderHistory: OrderItem[];
}

interface KpiCardProps {
  label: string;
  value: string;
}

function KpiCard({ label, value }: KpiCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-2">
        <span className="type-caption text-muted-foreground">{label}</span>
        <span className="type-h3 text-foreground">{value}</span>
      </CardContent>
    </Card>
  );
}

interface RankingRowProps {
  rank: number;
  nameKor: string;
  quantity: number;
  revenue: number;
}

function RankingRow({ rank, nameKor, quantity, revenue }: RankingRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <span className="type-label text-muted-foreground">{rank}</span>
        <span className="type-body text-foreground">{nameKor}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="type-body-sm text-muted-foreground">{`×${quantity}`}</span>
        <span className="type-body text-foreground">{`$${revenue.toFixed(2)}`}</span>
      </div>
    </div>
  );
}

export default function OrderSummaryModal({
  open,
  onOpenChange,
  orderHistory,
}: OrderSummaryModalProps) {
  const hasHistory = orderHistory && orderHistory.length > 0;

  const totalSales = hasHistory ? calculateTotalSales(orderHistory) : "0.00";
  const { anjuRevenue, drinkRevenue } = hasHistory
    ? calculateSummary(orderHistory)
    : { anjuRevenue: "0.00", drinkRevenue: "0.00" };

  const foodRankings = hasHistory ? calculateFoodRankings(orderHistory) : [];
  const drinkRankings = hasHistory ? calculateDrinkRankings(orderHistory) : [];
  const sojuAnalysis = hasHistory
    ? analyzeSojuSales(orderHistory)
    : { regular: 0, fruit: 0, total: 0 };

  const formatPercent = (count: number, total: number): string =>
    total > 0 ? ((count / total) * 100).toFixed(1) : "0.0";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="lg" className="max-h-[90vh] overflow-y-auto">
        <DialogTitle>Order summary</DialogTitle>

        {!hasHistory ? (
          <p className="type-body text-muted-foreground">
            No order history for this pocha.
          </p>
        ) : (
          <div className="flex flex-col gap-6">
            {/* KPI row */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <KpiCard label="Total revenue" value={`$${totalSales}`} />
              <KpiCard label="Food revenue" value={`$${anjuRevenue}`} />
              <KpiCard label="Drinks revenue" value={`$${drinkRevenue}`} />
            </div>

            {/* Top 3 food */}
            <Card>
              <CardHeader>
                <CardTitle>Top 3 food</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {foodRankings.length === 0 ? (
                  <span className="type-body-sm text-muted-foreground">
                    No food sales.
                  </span>
                ) : (
                  foodRankings.map((item, idx) => (
                    <RankingRow
                      key={`food-${idx}`}
                      rank={idx + 1}
                      nameKor={item.nameKor}
                      quantity={item.quantity}
                      revenue={item.revenue}
                    />
                  ))
                )}
              </CardContent>
            </Card>

            {/* Top 3 drinks */}
            <Card>
              <CardHeader>
                <CardTitle>Top 3 drinks</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {drinkRankings.length === 0 ? (
                  <span className="type-body-sm text-muted-foreground">
                    No drink sales.
                  </span>
                ) : (
                  drinkRankings.map((item, idx) => (
                    <RankingRow
                      key={`drink-${idx}`}
                      rank={idx + 1}
                      nameKor={item.nameKor}
                      quantity={item.quantity}
                      revenue={item.revenue}
                    />
                  ))
                )}
              </CardContent>
            </Card>

            {/* Soju breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Soju breakdown</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="type-body text-foreground">Regular</span>
                  <span className="type-body text-foreground">
                    {`${sojuAnalysis.regular} (${formatPercent(
                      sojuAnalysis.regular,
                      sojuAnalysis.total
                    )}%)`}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="type-body text-foreground">Fruit</span>
                  <span className="type-body text-foreground">
                    {`${sojuAnalysis.fruit} (${formatPercent(
                      sojuAnalysis.fruit,
                      sojuAnalysis.total
                    )}%)`}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
