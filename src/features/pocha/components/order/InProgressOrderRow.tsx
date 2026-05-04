/**
 * InProgressOrderRow
 * - Compact row for `pending`, `preparing`, and `closed` orders.
 * - 3-step pipeline (Placed - Preparing - Ready) with current step lit, others muted.
 * - For `closed`, the pipeline is omitted; just a muted Closed badge.
 * - Passive — no tap target.
 */

import React from "react";
import Image from "next/image";
import { Badge, Icon } from "@umichkisa-ds/web";

import { OrderItem, OrderStatus } from "@/types/pocha";
import { getMenuImagePath } from "@/features/pocha/utils/getImagePath";

interface InProgressOrderRowProps {
  orderItem: OrderItem;
}

type PipelineStep = "placed" | "preparing" | "ready";

const STEPS: { key: PipelineStep; label: string }[] = [
  { key: "placed", label: "Placed" },
  { key: "preparing", label: "Preparing" },
  { key: "ready", label: "Ready" },
];

function statusToActiveStep(status: OrderStatus): PipelineStep {
  if (status === OrderStatus.PENDING) return "placed";
  if (status === OrderStatus.PREPARING) return "preparing";
  return "ready";
}

function statusBadge(status: OrderStatus): {
  variant: "warning" | "info" | "success" | "default";
  label: string;
} {
  if (status === OrderStatus.PENDING)
    return { variant: "warning", label: "Pending" };
  if (status === OrderStatus.PREPARING)
    return { variant: "info", label: "Preparing" };
  if (status === OrderStatus.CLOSED)
    return { variant: "default", label: "Closed" };
  return { variant: "success", label: "Ready" };
}

function Pipeline({ status }: { status: OrderStatus }) {
  const activeIdx = STEPS.findIndex((s) => s.key === statusToActiveStep(status));

  // Tone the lit step based on status (warning/info/success).
  const litTone =
    status === OrderStatus.PENDING
      ? "bg-warning"
      : status === OrderStatus.PREPARING
        ? "bg-info"
        : "bg-success";

  return (
    <div
      className="flex items-center gap-2"
      role="img"
      aria-label={`Order progress: ${STEPS[activeIdx].label}`}
    >
      {STEPS.map((step, idx) => {
        const isActive = idx === activeIdx;
        const isPast = idx < activeIdx;
        return (
          <React.Fragment key={step.key}>
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-2 h-2 rounded-full ${
                  isActive
                    ? litTone
                    : isPast
                      ? "bg-foreground"
                      : "bg-border"
                }`}
                aria-hidden
              />
              <span
                className={`type-caption ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={`h-px flex-1 ${
                  isPast ? "bg-foreground" : "bg-border"
                }`}
                aria-hidden
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default function InProgressOrderRow({
  orderItem,
}: InProgressOrderRowProps) {
  const { orderItemID, menu, quantity, status } = orderItem;
  const badge = statusBadge(status);
  const isClosed = status === OrderStatus.CLOSED;

  return (
    <li className="list-none">
      <div className="flex items-start gap-4 rounded-md border border-border bg-surface p-4">
        {/* Image */}
        <figure className="relative w-12 h-12 flex-shrink-0 rounded-md overflow-hidden">
          <Image
            src={getMenuImagePath(menu?.menuID)}
            alt={menu?.nameEng ?? menu?.nameKor ?? ""}
            fill
            sizes="48px"
            className="object-cover"
          />
        </figure>

        {/* Body */}
        <div className="flex-1 min-w-0 flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="type-label text-muted-foreground">
                #{orderItemID}
              </span>
              <span className="type-body text-foreground truncate">
                {menu?.nameEng ?? menu?.nameKor}
              </span>
            </div>
            <Badge variant={badge.variant} size="sm">
              {badge.label}
            </Badge>
          </div>

          <div className="type-caption text-muted-foreground">
            × {quantity} · ${(menu?.price ?? 0) * quantity}
          </div>

          {!isClosed && <Pipeline status={status} />}
        </div>
      </div>
    </li>
  );
}
