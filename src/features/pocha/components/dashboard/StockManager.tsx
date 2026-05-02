"use client";

import {
  type FocusEvent,
  type KeyboardEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  Icon,
  IconButton,
  Input,
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
  toast,
} from "@umichkisa-ds/web";
import useMenu from "../../hooks/useMenu";
import type { MenuItem } from "@/types/pocha";

interface StockManagerProps {
  pochaID: number;
  token: string;
}

type StockFilter = "all" | "in" | "low" | "sold-out";

type FlatRow = MenuItem & { category: string };

const ERROR_TOAST = "Failed to update stock";
const SOLD_OUT_TOAST = "Marked sold out";

function bilingualName(row: { nameKor?: string; nameEng?: string }) {
  if (row.nameKor && row.nameEng) return `${row.nameKor} / ${row.nameEng}`;
  return row.nameKor || row.nameEng || "";
}

function isLow(stock: number) {
  return stock >= 1 && stock <= 3;
}

function matchFilter(filter: StockFilter, stock: number) {
  switch (filter) {
    case "in":
      return stock > 0;
    case "low":
      return isLow(stock);
    case "sold-out":
      return stock === 0;
    case "all":
    default:
      return true;
  }
}

export default function StockManager({ pochaID, token }: StockManagerProps) {
  const { menuList, status, error, refetch, updateMenuStock } = useMenu(
    pochaID,
    token
  );

  const [filter, setFilter] = useState<StockFilter>("all");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draftValue, setDraftValue] = useState<string>("");
  const [confirmId, setConfirmId] = useState<number | null>(null);

  // Per-row request id for last-write-wins race safety. NOT in useMenu.
  const latestReqId = useRef<Map<number, number>>(new Map());

  const flatRows: FlatRow[] = useMemo(() => {
    if (!menuList) return [];
    const rows: FlatRow[] = [];
    for (const cat of menuList) {
      for (const menu of cat.menusList) {
        rows.push({ ...menu, category: cat.category });
      }
    }
    return rows;
  }, [menuList]);

  const counts = useMemo(() => {
    let all = 0;
    let inStock = 0;
    let low = 0;
    let soldOut = 0;
    for (const row of flatRows) {
      all += 1;
      if (row.stock > 0) inStock += 1;
      if (isLow(row.stock)) low += 1;
      if (row.stock === 0) soldOut += 1;
    }
    return { all, inStock, low, soldOut };
  }, [flatRows]);

  const visibleRows = useMemo(
    () => flatRows.filter((row) => matchFilter(filter, row.stock)),
    [flatRows, filter]
  );

  const filterItems = useMemo(
    () => [
      { value: "all", label: `All (${counts.all})` },
      { value: "in", label: `In stock (${counts.inStock})` },
      { value: "low", label: `Low ≤3 (${counts.low})` },
      { value: "sold-out", label: `Sold out (${counts.soldOut})` },
    ],
    [counts]
  );

  const beginEdit = useCallback((row: FlatRow) => {
    setEditingId(row.menuID);
    setDraftValue(String(row.stock));
  }, []);

  const cancelEdit = useCallback(() => {
    setEditingId(null);
    setDraftValue("");
  }, []);

  const commitEdit = useCallback(
    async (row: FlatRow) => {
      const trimmed = draftValue.trim();
      // No-op: empty string OR unchanged value → silent exit.
      if (trimmed === "" || Number(trimmed) === row.stock) {
        cancelEdit();
        return;
      }
      const parsed = Number(trimmed);
      if (Number.isNaN(parsed) || parsed < 0) {
        cancelEdit();
        return;
      }

      // Bump per-row request id and capture mine.
      const prev = latestReqId.current.get(row.menuID) ?? 0;
      const myId = prev + 1;
      latestReqId.current.set(row.menuID, myId);

      cancelEdit();

      const ok = await updateMenuStock(row.menuID, parsed);

      // Stale write — drop silently.
      if (myId !== latestReqId.current.get(row.menuID)) return;

      if (!ok) {
        toast.error(ERROR_TOAST);
        return;
      }
      toast.success(`Stock updated to ${parsed}`);
    },
    [draftValue, cancelEdit, updateMenuStock]
  );

  const advanceFocus = useCallback(
    (currentMenuID: number, direction: 1 | -1) => {
      const idx = visibleRows.findIndex((r) => r.menuID === currentMenuID);
      if (idx < 0) return false;
      const nextIdx = idx + direction;
      if (nextIdx < 0 || nextIdx >= visibleRows.length) return false;
      const nextRow = visibleRows[nextIdx];
      // Enter edit mode on the next row; the freshly-mounted input
      // carries `autoFocus`, which moves focus + selection there.
      setEditingId(nextRow.menuID);
      setDraftValue(String(nextRow.stock));
      return true;
    },
    [visibleRows]
  );

  const handleKeyDown = useCallback(
    async (e: KeyboardEvent<HTMLInputElement>, row: FlatRow) => {
      if (e.key === "Escape") {
        e.preventDefault();
        cancelEdit();
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        await commitEdit(row);
        return;
      }
      if (e.key === "Tab") {
        e.preventDefault();
        await commitEdit(row);
        const direction: 1 | -1 = e.shiftKey ? -1 : 1;
        const advanced = advanceFocus(row.menuID, direction);
        if (!advanced) {
          // At list boundary → plain blur.
          (e.target as HTMLInputElement).blur();
        }
      }
    },
    [advanceFocus, cancelEdit, commitEdit]
  );

  const handleBlur = useCallback(
    async (e: FocusEvent<HTMLInputElement>, row: FlatRow) => {
      // Only commit if we're still editing this row (Tab/Enter handlers
      // may have already advanced or cancelled).
      if (editingId !== row.menuID) return;
      // Avoid stealing commit when blur is fired by our own programmatic
      // focus advance (the relatedTarget will be another row's input).
      const next = e.relatedTarget as HTMLElement | null;
      if (
        next &&
        next.tagName === "INPUT" &&
        next.getAttribute("data-stock-input") === "true"
      ) {
        return;
      }
      await commitEdit(row);
    },
    [commitEdit, editingId]
  );

  const handleConfirmZero = useCallback(async () => {
    if (confirmId === null) return;
    const menuID = confirmId;
    setConfirmId(null);

    const prev = latestReqId.current.get(menuID) ?? 0;
    const myId = prev + 1;
    latestReqId.current.set(menuID, myId);

    const ok = await updateMenuStock(menuID, 0);
    if (myId !== latestReqId.current.get(menuID)) return;

    if (ok) {
      toast.success(SOLD_OUT_TOAST);
    } else {
      toast.error(ERROR_TOAST);
    }
  }, [confirmId, updateMenuStock]);

  // ── Loading ────────────────────────────────────────────
  if (status === "loading") {
    return (
      <div className="w-full">
        <div className="mb-4 flex items-center justify-between gap-4">
          <Skeleton className="h-9 w-72" />
          <Skeleton className="h-10 w-10" />
        </div>
        <div className="hidden md:block">
          <div className="flex flex-col gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-12" />
            ))}
          </div>
        </div>
        <div className="block md:hidden">
          <div className="flex flex-col gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-16" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────
  if (status === "error") {
    return (
      <StatusView
        variant="error"
        title="Couldn't load stock"
        description={error?.message ?? "Something went wrong."}
        action={
          <Button variant="secondary" onClick={() => refetch()}>
            Try again
          </Button>
        }
      />
    );
  }

  // ── Toolbar (filter chips + refresh) ───────────────────
  const toolbar = (
    <div className="mb-4 flex items-center justify-between gap-4">
      <ToggleGroup
        type="single"
        items={filterItems}
        value={filter}
        onValueChange={(v) => setFilter(v as StockFilter)}
        aria-label="Filter stock"
      />
      <IconButton
        icon="refresh-cw"
        aria-label="Refresh stock"
        size="sm"
        variant="tertiary"
        onClick={() => refetch()}
      />
    </div>
  );

  // ── Render row helpers ─────────────────────────────────
  const renderStockCell = (row: FlatRow) => {
    if (editingId === row.menuID) {
      return (
        <Input
          autoFocus
          type="number"
          min={0}
          inputMode="numeric"
          data-stock-input="true"
          value={draftValue}
          onChange={(e) => setDraftValue(e.target.value)}
          onFocus={(e) => e.currentTarget.select()}
          onKeyDown={(e) => handleKeyDown(e, row)}
          onBlur={(e) => handleBlur(e, row)}
          aria-label={`Stock for ${bilingualName(row)}`}
          className="w-24"
        />
      );
    }
    return (
      <button
        type="button"
        onClick={() => beginEdit(row)}
        aria-label={`Edit stock for ${bilingualName(row)}`}
        className="w-24 rounded-md border border-input bg-background px-3 py-1.5 text-left type-body text-foreground hover:bg-brand-accent-subtle focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:outline-offset-2"
      >
        {row.stock}
      </button>
    );
  };

  // ── Empty / table / mobile ────────────────────────────
  return (
    <div className="w-full">
      {toolbar}

      {/* Desktop / tablet table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Menu</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="w-px">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleRows.map((row) => (
              <TableRow key={row.menuID}>
                <TableCell>
                  <span className="type-body text-foreground">
                    {bilingualName(row)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="type-body-sm text-muted-foreground">
                    {row.category}
                  </span>
                </TableCell>
                <TableCell>{renderStockCell(row)}</TableCell>
                <TableCell className="text-right">
                  <IconButton
                    icon="circle-minus"
                    aria-label="Mark sold out"
                    size="sm"
                    variant="tertiary"
                    disabled={row.stock === 0}
                    onClick={() => setConfirmId(row.menuID)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {visibleRows.length === 0 && (
            <TableCaption>No items match this filter</TableCaption>
          )}
        </Table>
      </div>

      {/* Mobile list-card */}
      <div className="block md:hidden">
        {visibleRows.length === 0 ? (
          <Card>
            <CardContent className="py-6">
              <CardDescription className="text-center">
                No items match this filter
              </CardDescription>
            </CardContent>
          </Card>
        ) : (
          <TableMobileList>
            {visibleRows.map((row) => (
              <TableMobileItem key={row.menuID}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="type-label text-foreground truncate">
                      {bilingualName(row)}
                    </span>
                    <span className="type-caption text-muted-foreground">
                      {row.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex flex-col items-end gap-0.5">
                      <span className="type-caption text-muted-foreground">
                        Stock
                      </span>
                      {renderStockCell(row)}
                    </div>
                    <IconButton
                      icon="circle-minus"
                      aria-label="Mark sold out"
                      size="sm"
                      variant="tertiary"
                      disabled={row.stock === 0}
                      onClick={() => setConfirmId(row.menuID)}
                    />
                  </div>
                </div>
              </TableMobileItem>
            ))}
          </TableMobileList>
        )}
      </div>

      {/* Confirm-zero dialog */}
      <Dialog
        open={confirmId !== null}
        onOpenChange={(open) => {
          if (!open) setConfirmId(null);
        }}
      >
        <DialogContent size="sm">
          <DialogTitle>Set stock to 0?</DialogTitle>
          <DialogDescription>
            This item won&apos;t be orderable.
          </DialogDescription>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setConfirmId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmZero}>
              <Icon name="circle-minus" size="sm" />
              Set to 0
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
