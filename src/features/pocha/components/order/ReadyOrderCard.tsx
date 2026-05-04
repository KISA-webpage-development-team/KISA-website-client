/**
 * ReadyOrderCard
 * - Large full-width card for orders in `ready` state.
 * - Dominant orderItemID, success-toned border + subtle background, menu name + qty.
 * - Tap opens the OrderTicketModal (DS Sheet) with the celebratory pickup view.
 */

import React from "react";
import Image from "next/image";
import { Card, CardContent, Badge, Icon } from "@umichkisa-ds/web";

import { OrderItem } from "@/types/pocha";
import { getMenuImagePath } from "@/features/pocha/utils/getImagePath";

interface ReadyOrderCardProps {
  orderItem: OrderItem;
  onOpen: (orderItem: OrderItem) => void;
}

export default function ReadyOrderCard({
  orderItem,
  onOpen,
}: ReadyOrderCardProps) {
  const { orderItemID, menu, quantity } = orderItem;

  const handleClick = () => onOpen(orderItem);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " " || e.code === "Space") {
      e.preventDefault();
      onOpen(orderItem);
    }
  };

  return (
    <li className="list-none">
      <Card
        hoverable
        role="button"
        tabIndex={0}
        aria-label={`Order #${orderItemID} ready for pickup — ${menu?.nameKor} ${menu?.nameEng}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className="border-success cursor-pointer w-full"
      >
        <CardContent className="flex items-center gap-4">
          {/* Image */}
          <figure className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
            <Image
              src={getMenuImagePath(menu?.menuID)}
              alt={menu?.nameEng ?? ""}
              fill
              sizes="64px"
              className="object-cover"
            />
          </figure>

          {/* Body */}
          <div className="flex-1 min-w-0 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Badge variant="success" size="sm">
                Ready
              </Badge>
              <span className="type-caption text-muted-foreground">
                Pickup now
              </span>
            </div>
            <div className="type-h2 text-foreground">#{orderItemID}</div>
            <div className="type-body text-foreground truncate">
              {menu?.nameKor} · {menu?.nameEng}
              <span className="text-muted-foreground"> × {quantity}</span>
            </div>
          </div>

          {/* Affordance — chevron */}
          <Icon name="chevron-right" size="md" className="flex-shrink-0" />
        </CardContent>
      </Card>
    </li>
  );
}
