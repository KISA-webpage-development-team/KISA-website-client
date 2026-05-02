"use client";

import { useMemo, useState } from "react";
import {
  Button,
  Skeleton,
  StatusView,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableMobileItem,
  TableMobileList,
  TableRow,
  ToggleGroup,
} from "@umichkisa-ds/web";

import useOrderHistory from "@/features/pocha/hooks/useOrderHistory";
import OrderSummaryModal from "./OrderSummaryModal";
import type { OrderItem } from "@/types/pocha";

interface OrderHistoryTableProps {
  token: string;
  pochaID: number;
}

type FilterOption = "all" | "food" | "drink";

const SKELETON_ROW_COUNT = 5;
const HEADERS = [
  "#",
  "Menu",
  "Category",
  "Qty",
  "Price",
  "Total",
  "Orderer email",
] as const;

interface ScaffoldProps {
  rows: OrderItem[];
  isLoading: boolean;
}

function DesktopTable({ rows, isLoading }: ScaffoldProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {HEADERS.map((h) => (
            <TableHead key={h}>{h}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          Array.from({ length: SKELETON_ROW_COUNT }).map((_, rowIdx) => (
            <TableRow key={`skeleton-row-${rowIdx}`}>
              {HEADERS.map((_, colIdx) => (
                <TableCell key={`skeleton-cell-${rowIdx}-${colIdx}`}>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : rows.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={HEADERS.length}
              className="text-center text-muted-foreground"
            >
              No items match this filter
            </TableCell>
          </TableRow>
        ) : (
          rows.map(({ orderItemID, menu, quantity, ordererEmail }, index) => (
            <TableRow key={`${orderItemID}-${index}`}>
              <TableCell>{orderItemID}</TableCell>
              <TableCell>{menu.nameKor}</TableCell>
              <TableCell>{menu.category ?? "—"}</TableCell>
              <TableCell>{quantity}</TableCell>
              <TableCell>{`$${menu.price.toFixed(2)}`}</TableCell>
              <TableCell>{`$${(menu.price * quantity).toFixed(2)}`}</TableCell>
              <TableCell>{ordererEmail}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
      <TableCaption className="sr-only">
        Order history for the selected pocha
      </TableCaption>
    </Table>
  );
}

function MobileList({ rows, isLoading }: ScaffoldProps) {
  if (isLoading) {
    return (
      <TableMobileList>
        {Array.from({ length: SKELETON_ROW_COUNT }).map((_, rowIdx) => (
          <TableMobileItem key={`skeleton-mobile-${rowIdx}`}>
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </TableMobileItem>
        ))}
      </TableMobileList>
    );
  }
  if (rows.length === 0) {
    return (
      <p className="type-body-sm text-muted-foreground text-center py-4">
        No items match this filter
      </p>
    );
  }
  return (
    <TableMobileList>
      {rows.map(({ orderItemID, menu, quantity, ordererEmail }, index) => (
        <TableMobileItem key={`mobile-${orderItemID}-${index}`}>
          <div className="flex items-center justify-between">
            <span className="type-label text-muted-foreground">
              {`#${orderItemID}`}
            </span>
            <span className="type-body-sm text-muted-foreground">
              {menu.category ?? "—"}
            </span>
          </div>
          <span className="type-body text-foreground">{menu.nameKor}</span>
          <div className="flex items-center justify-between">
            <span className="type-body-sm text-muted-foreground">
              {`Qty ${quantity} · $${menu.price.toFixed(2)}`}
            </span>
            <span className="type-body text-foreground">
              {`$${(menu.price * quantity).toFixed(2)}`}
            </span>
          </div>
          <span className="type-caption text-muted-foreground">
            {ordererEmail}
          </span>
        </TableMobileItem>
      ))}
    </TableMobileList>
  );
}

export default function OrderHistoryTable({
  token,
  pochaID,
}: OrderHistoryTableProps) {
  const { orderHistory, status } = useOrderHistory(token, pochaID);

  const [filter, setFilter] = useState<FilterOption>("all");
  const [openSummaryModal, setOpenSummaryModal] = useState<boolean>(false);

  const counts = useMemo(() => {
    const list = orderHistory ?? [];
    const food = list.filter(({ menu }) => !menu.isImmediatePrep).length;
    const drink = list.filter(({ menu }) => menu.isImmediatePrep).length;
    return { all: list.length, food, drink };
  }, [orderHistory]);

  const filteredOrderHistory = useMemo(() => {
    const list = orderHistory ?? [];
    if (filter === "all") return list;
    if (filter === "food")
      return list.filter(({ menu }) => !menu.isImmediatePrep);
    return list.filter(({ menu }) => menu.isImmediatePrep);
  }, [orderHistory, filter]);

  if (status === "loading") {
    return (
      <div className="w-full p-4">
        <div className="hidden md:block">
          <DesktopTable rows={[]} isLoading />
        </div>
        <div className="block md:hidden">
          <MobileList rows={[]} isLoading />
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <StatusView variant="error" title="Failed to load order history." />
    );
  }

  if (!orderHistory || orderHistory.length === 0) {
    return <StatusView variant="not-found" title="No order history." />;
  }

  const filterItems = [
    { value: "all", label: `All (${counts.all})` },
    { value: "food", label: `Food (${counts.food})` },
    { value: "drink", label: `Drinks (${counts.drink})` },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <ToggleGroup
            items={filterItems}
            value={filter}
            onValueChange={(v) => setFilter(v as FilterOption)}
            aria-label="Filter order history"
          />
          <Button
            variant="primary"
            size="sm"
            onClick={() => setOpenSummaryModal(true)}
          >
            View summary
          </Button>
        </div>

        <div className="hidden md:block">
          <DesktopTable rows={filteredOrderHistory} isLoading={false} />
        </div>

        <div className="block md:hidden">
          <MobileList rows={filteredOrderHistory} isLoading={false} />
        </div>
      </div>

      <OrderSummaryModal
        open={openSummaryModal}
        onOpenChange={setOpenSummaryModal}
        pochaID={pochaID}
        orderHistory={orderHistory}
      />
    </div>
  );
}
