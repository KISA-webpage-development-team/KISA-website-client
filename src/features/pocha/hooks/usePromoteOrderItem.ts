"use client";

import { useCallback, useRef, useState } from "react";
import { toast } from "@umichkisa-ds/web";
import { changeOrderItemStatus } from "@/apis/pocha/mutations";
import { OrderStatus } from "@/types/pocha";

interface UsePromoteOrderItemReturn {
  promote: () => Promise<void>;
  loading: boolean;
}

/**
 * Optimistic single-item promote. Owns the in-flight ref + loading state +
 * server call + toast. Parent owns the optimistic UI write via
 * `updateOrderItemStatusUI` (called with the server-confirmed `newStatus`).
 */
export function usePromoteOrderItem(
  orderItemID: number,
  token: string,
  updateOrderItemStatusUI: (id: number, status: OrderStatus) => void
): UsePromoteOrderItemReturn {
  const [loading, setLoading] = useState(false);
  const inFlightRef = useRef(false);

  const promote = useCallback(async () => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setLoading(true);
    try {
      const res = await changeOrderItemStatus(orderItemID, token);
      if (!res) {
        toast.error("Failed to promote order. Try again.");
        return;
      }
      updateOrderItemStatusUI(orderItemID, res.newStatus);
    } catch (err) {
      console.error("[usePromoteOrderItem] promote failed", err);
      toast.error("Failed to promote order. Try again.");
    } finally {
      inFlightRef.current = false;
      setLoading(false);
    }
  }, [orderItemID, token, updateOrderItemStatusUI]);

  return { promote, loading };
}
