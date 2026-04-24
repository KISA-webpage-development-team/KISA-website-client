import React from "react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Divider,
  Icon,
} from "@umichkisa-ds/web";

import { MenuItemRaw, PochaInfo } from "@/types/pocha";
import { formatDateInTz, formatTimeInTz } from "@/utils/formats/timezone";

interface PochaSummaryProps {
  pochaInfo: PochaInfo;
  isEditPochaFormOpen: boolean;
  setIsEditPochaFormOpen: (isOpen: boolean) => void;
  menuList: MenuItemRaw[];
}

export default function PochaSummary({
  pochaInfo,
  isEditPochaFormOpen,
  setIsEditPochaFormOpen,
  menuList,
}: PochaSummaryProps) {
  const statusLabel = pochaInfo.ongoing ? "진행 중" : "진행 예정";
  const statusVariant = pochaInfo.ongoing ? "success" : "info";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <CardTitle as="h3" className="type-h3 !font-semibold">
                {pochaInfo.title}
              </CardTitle>
              <Badge variant={statusVariant}>{statusLabel}</Badge>
            </div>
            <CardDescription>{pochaInfo.description}</CardDescription>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsEditPochaFormOpen(!isEditPochaFormOpen)}
          >
            {isEditPochaFormOpen ? "수정 취소" : "수정하기"}
          </Button>
        </div>
      </CardHeader>

      <Divider />

      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="calendar" size="sm" />
              <span className="type-body-sm">시작</span>
            </div>
            <p className="type-h4 !font-semibold text-foreground">
              {formatDateInTz(pochaInfo.startDate)}
            </p>
            <p className="type-body-sm text-muted-foreground">
              {formatTimeInTz(pochaInfo.startDate)}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="calendar" size="sm" />
              <span className="type-body-sm">종료</span>
            </div>
            <p className="type-h4 !font-semibold text-foreground">
              {formatDateInTz(pochaInfo.endDate)}
            </p>
            <p className="type-body-sm text-muted-foreground">
              {formatTimeInTz(pochaInfo.endDate)}
            </p>
          </div>
        </div>
      </CardContent>

      <Divider />

      <CardContent>
        <div className="flex flex-col gap-3">
          <p className="type-body-sm text-muted-foreground">
            메뉴 · {menuList.length}
          </p>
          <div className="flex flex-wrap gap-2">
            {menuList.map((menu) => (
              <Badge
                key={menu.menuID ?? menu.nameKor}
                variant="outline"
                size="md"
              >
                {menu.nameKor}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
