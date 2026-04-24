import React from "react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@umichkisa-ds/web";

import { MenuItemRaw, PochaInfo } from "@/types/pocha";
import { formatDateTimeString } from "@/utils/formats/date";

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
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <CardTitle as="h3" className="type-h3 !font-semibold">
              {pochaInfo.title}
            </CardTitle>
            <Badge variant={statusVariant}>{statusLabel}</Badge>
          </div>
          <Button
            variant="tertiary"
            size="sm"
            onClick={() => setIsEditPochaFormOpen(!isEditPochaFormOpen)}
          >
            {isEditPochaFormOpen ? "수정 취소" : "수정하기"}
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-2">
          <p className="type-body">
            <span>설명: </span>
            <span>{pochaInfo.description}</span>
          </p>
          <p className="type-body">
            <span>시작 날짜: </span>
            <span>{formatDateTimeString(pochaInfo.startDate)}</span>
          </p>
          <p className="type-body">
            <span>종료 날짜: </span>
            <span>{formatDateTimeString(pochaInfo.endDate)}</span>
          </p>
          <p className="type-body">
            <span>메뉴: </span>
            <span>{menuList.map((menu) => menu.nameKor).join(", ")}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
