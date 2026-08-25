"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "@umichkisa-ds/web";
import { changeOrderItemStatus } from "@/apis/pocha/mutations";
import { OrderItem, OrderStatus } from "@/types/pocha";
import { getNextStatus } from "./useDashboardOrders";
import {
  computeBreakdown,
  formatBreakdown,
  requiresDialogGate,
} from "@/features/pocha/utils/batchPromote";

interface UseBatchPromoteOptions {
  allItems: OrderItem[];
  token: string;
  selectMode: boolean;
  onEnterSelectMode?: () => void;
  onPromotingChange?: (isPromoting: boolean) => void;
  updateOrderItemStatusUI: (id: number, status: OrderStatus) => void;
}

interface UseBatchPromoteReturn {
  selectedIds: Set<number>;
  selectedItems: OrderItem[];
  isPromoting: boolean;
  dialogOpen: boolean;
  dialogSnapshot: OrderItem[];
  breakdownLabel: string;
  dialogBreakdownLabel: string;
  handleToggleSelect: (orderItemID: number) => void;
  handleLongPress: (orderItemID: number) => void;
  handleCancel: () => void;
  handlePromoteClick: () => void;
  handleDialogConfirm: () => void;
  setDialogOpen: (open: boolean) => void;
}

/**
 * Owns the batch-promote state machine for an Order board: per-grid
 * selection set, in-flight promote flag, dialog gate, and the optimistic
 * fan-out + revert + toast lifecycle. The board passes its full flat item
 * list and current `selectMode`; the hook handles everything else.
 */
export function useBatchPromote({
  allItems,
  token,
  selectMode,
  onEnterSelectMode,
  onPromotingChange,
  updateOrderItemStatusUI,
}: UseBatchPromoteOptions): UseBatchPromoteReturn {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isPromoting, setIsPromoting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  // Snapshot of selection at the moment the Dialog gate opens — prevents
  // socket/poll updates between open and confirm from desyncing the Dialog
  // body's breakdown copy from the items actually fanned out.
  const [dialogSnapshot, setDialogSnapshot] = useState<OrderItem[]>([]);

  // Exiting select-mode clears selection (Done lives in dashboard).
  useEffect(() => {
    if (!selectMode) {
      setSelectedIds(new Set());
    }
  }, [selectMode]);

  // Derive selected items from live source so breakdown reacts when
  // socket/poll updates a card's status mid-selection.
  const selectedItems = useMemo<OrderItem[]>(
    () => allItems.filter((o) => selectedIds.has(o.orderItemID)),
    [allItems, selectedIds]
  );

  // Drop selection entries that no longer exist (e.g. closed/removed).
  useEffect(() => {
    setSelectedIds((prev) => {
      if (prev.size === 0) return prev;
      const live = new Set(allItems.map((o) => o.orderItemID));
      let changed = false;
      const next = new Set<number>();
      prev.forEach((id) => {
        if (live.has(id)) next.add(id);
        else changed = true;
      });
      return changed ? next : prev;
    });
  }, [allItems]);

  const handleToggleSelect = useCallback(
    (orderItemID: number) => {
      if (isPromoting) return;
      setSelectedIds((prev) => {
        const next = new Set(prev);
        if (next.has(orderItemID)) next.delete(orderItemID);
        else next.add(orderItemID);
        return next;
      });
    },
    [isPromoting]
  );

  const handleLongPress = useCallback(
    (orderItemID: number) => {
      if (isPromoting) return;
      // Gesture entered from outside select mode → tell parent to flip in.
      if (!selectMode) onEnterSelectMode?.();
      setSelectedIds((prev) => {
        if (prev.has(orderItemID)) return prev;
        const next = new Set(prev);
        next.add(orderItemID);
        return next;
      });
    },
    [isPromoting, selectMode, onEnterSelectMode]
  );

  const handleCancel = useCallback(() => {
    if (isPromoting) return;
    setSelectedIds(new Set());
  }, [isPromoting]);

  const runFanOut = useCallback(
    async (snapshot: OrderItem[]) => {
      if (snapshot.length === 0) return;
      setIsPromoting(true);
      onPromotingChange?.(true);
      // Capture original statuses so we can revert on rejection.
      const originals = snapshot.map((o) => ({
        id: o.orderItemID,
        status: o.status,
      }));

      // Optimistic forward update.
      for (const o of snapshot) {
        const next = getNextStatus(o.status);
        if (next) updateOrderItemStatusUI(o.orderItemID, next);
      }

      const results = await Promise.allSettled(
        snapshot.map((o) => changeOrderItemStatus(o.orderItemID, token))
      );

      let failed = 0;
      results.forEach((r, i) => {
        const ok = r.status === "fulfilled" && r.value;
        if (!ok) {
          failed += 1;
          const orig = originals[i];
          updateOrderItemStatusUI(orig.id, orig.status);
        }
      });

      const total = snapshot.length;
      const promoted = total - failed;
      if (failed === 0) {
        toast.success(`${promoted} promoted`);
      } else if (promoted === 0) {
        toast.error(`0 promoted, ${failed} failed`);
      } else {
        toast.error(`${promoted} promoted, ${failed} failed`);
      }

      setSelectedIds(new Set());
      setIsPromoting(false);
      onPromotingChange?.(false);
    },
    [token, updateOrderItemStatusUI, onPromotingChange]
  );

  const handlePromoteClick = useCallback(() => {
    if (isPromoting) return;
    if (selectedItems.length === 0) return;
    if (requiresDialogGate(selectedItems)) {
      setDialogSnapshot(selectedItems);
      setDialogOpen(true);
      return;
    }
    runFanOut(selectedItems);
  }, [isPromoting, selectedItems, runFanOut]);

  const handleDialogConfirm = useCallback(() => {
    setDialogOpen(false);
    runFanOut(dialogSnapshot);
  }, [runFanOut, dialogSnapshot]);

  const breakdownLabel = useMemo(
    () =>
      selectedItems.length > 0
        ? formatBreakdown(computeBreakdown(selectedItems))
        : "",
    [selectedItems]
  );

  const dialogBreakdownLabel = useMemo(
    () =>
      dialogSnapshot.length > 0
        ? formatBreakdown(computeBreakdown(dialogSnapshot))
        : "",
    [dialogSnapshot]
  );

  return {
    selectedIds,
    selectedItems,
    isPromoting,
    dialogOpen,
    dialogSnapshot,
    breakdownLabel,
    dialogBreakdownLabel,
    handleToggleSelect,
    handleLongPress,
    handleCancel,
    handlePromoteClick,
    handleDialogConfirm,
    setDialogOpen,
  };
}
