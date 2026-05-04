/**
 * OrderTicketModal
 * - DS Sheet (mobile bottom-sheet): celebratory pickup ticket.
 * - Single-purpose surface: huge orderItemID, "Order Ready" label,
 *   menu name + quantity, close affordance (built into SheetContent).
 * - Driven by `orderItem` (open when non-null) + `onClose`.
 */

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  Badge,
} from "@umichkisa-ds/web";

import { OrderItem } from "@/types/pocha";

interface OrderTicketModalProps {
  orderItem: OrderItem | null;
  onClose: () => void;
}

export default function OrderTicketModal({
  orderItem,
  onClose,
}: OrderTicketModalProps) {
  const open = orderItem !== null;

  const handleOpenChange = (next: boolean) => {
    if (!next) onClose();
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent showCloseButton showHandle>
        {orderItem ? (
          <div className="flex flex-col items-center text-center gap-4 px-4 pb-8 pt-2">
            <Badge variant="success" size="md">
              Order Ready
            </Badge>

            <SheetTitle className="type-display !text-[4.5rem] !leading-none text-success">
              #{orderItem.orderItemID}
            </SheetTitle>

            <SheetDescription className="type-h2 !text-2xl text-foreground">
              {orderItem.menu?.nameKor} · {orderItem.menu?.nameEng}
              <span className="type-body !text-2xl text-muted-foreground">
                {" "}× {orderItem.quantity}
              </span>
            </SheetDescription>

            <p className="type-body text-foreground">
              Show this number at the counter to pick up your order.
            </p>
          </div>
        ) : (
          <SheetTitle className="sr-only">Order ticket</SheetTitle>
        )}
      </SheetContent>
    </Sheet>
  );
}
