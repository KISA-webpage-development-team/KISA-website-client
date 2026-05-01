"use client";

import { useMemo } from "react";
import { Card, CardContent, Skeleton } from "@umichkisa-ds/web";

import useMenu from "@/features/pocha/hooks/useMenu";
import { computeStats } from "@/features/pocha/utils/dashboardStats";
import type { OrderItem } from "@/types/pocha";

interface DashboardStatsStripProps {
  pochaID: number;
  token: string;
  ordersMap: Map<number, OrderItem>;
  ordersStatus: "loading" | "success" | "error";
}

interface StatCardProps {
  label: string;
  value: string | number;
  valueClassName?: string;
}

function StatCard({ label, value, valueClassName }: StatCardProps) {
  return (
    <Card hoverable={false}>
      <CardContent>
        <div className="type-caption text-muted-foreground">{label}</div>
        <div className={`type-h3 ${valueClassName ?? "text-foreground"} mt-2`}>
          {value}
        </div>
      </CardContent>
    </Card>
  );
}

function StatSkeleton() {
  return (
    <Card hoverable={false}>
      <CardContent>
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-7 w-1/3 mt-2" />
      </CardContent>
    </Card>
  );
}

export default function DashboardStatsStrip({
  pochaID,
  token,
  ordersMap,
  ordersStatus,
}: DashboardStatsStripProps) {
  const { menuList, status: menuStatus } = useMenu(pochaID, token);

  const stats = useMemo(() => {
    if (!menuList) return null;
    return computeStats(Array.from(ordersMap.values()), menuList);
  }, [ordersMap, menuList]);

  const isLoading = ordersStatus === "loading" || menuStatus === "loading";
  const isError = ordersStatus === "error" || menuStatus === "error";

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatSkeleton />
        <StatSkeleton />
        <StatSkeleton />
        <StatSkeleton />
      </div>
    );
  }

  if (isError || !stats) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Active" value="—" />
        <StatCard label="Pending" value="—" />
        <StatCard label="Low stock (≤3)" value="—" />
        <StatCard label="Sold out (=0)" value="—" />
      </div>
    );
  }

  const lowStockClass = stats.lowStock > 0 ? "text-warning" : "text-foreground";
  const soldOutClass = stats.soldOut > 0 ? "text-error" : "text-foreground";

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <StatCard label="Active" value={stats.active} />
      <StatCard label="Pending" value={stats.pending} />
      <StatCard
        label="Low stock (≤3)"
        value={stats.lowStock}
        valueClassName={lowStockClass}
      />
      <StatCard
        label="Sold out (=0)"
        value={stats.soldOut}
        valueClassName={soldOutClass}
      />
    </div>
  );
}
