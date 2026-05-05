"use client";

import { Fragment } from "react";
import Link from "next/link";
import {
  Badge,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@umichkisa-ds/web";

type LiveTool = {
  kind: "live";
  title: string;
  sub: string;
  href: string;
};

type ComingSoonTool = {
  kind: "coming-soon";
  title: string;
  sub: string;
};

type Tool = LiveTool | ComingSoonTool;

const TOOLS: Tool[] = [
  {
    kind: "live",
    title: "Pocha Manage",
    sub: "포차 일정과 메뉴를 등록하고 운영 준비를 마무리합니다.",
    href: "/admin/pocha/manage",
  },
  {
    kind: "live",
    title: "Pocha Dashboard",
    sub: "진행 중인 포차의 주문과 결제를 실시간으로 모니터링합니다.",
    href: "/admin/pocha/dashboard",
  },
  {
    kind: "live",
    title: "Data Analytics",
    sub: "지난 포차의 매출과 운영 기록을 살펴보고 다음 행사에 활용하세요.",
    href: "/admin/pocha/history",
  },
  {
    kind: "coming-soon",
    title: "Website CMS",
    sub: "공식 홈페이지 콘텐츠를 직접 편집할 수 있도록 준비 중입니다.",
  },
  {
    kind: "coming-soon",
    title: "RSVP CMS",
    sub: "이벤트 RSVP와 참가자 명단을 관리하는 도구를 곧 제공합니다.",
  },
];

function setFromHubFlag() {
  try {
    sessionStorage.setItem("kisa.admin.fromHub", "1");
  } catch {
    // sessionStorage may be unavailable (private mode); FAB simply won't render.
  }
}

/**
 * Renders the 5 admin tool cards as siblings (Fragment) so each card
 * occupies its own cell of the parent hub grid alongside the hero cell.
 */
export default function AdminHubCards() {
  return (
    <Fragment>
      {TOOLS.map((tool) => {
        if (tool.kind === "live") {
          return (
            <Link
              key={tool.title}
              href={tool.href}
              onClick={setFromHubFlag}
              className="group block h-full rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            >
              <Card hoverable className="h-full">
                <CardHeader>
                  <CardTitle as="h3">{tool.title}</CardTitle>
                  <CardDescription>{tool.sub}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        }

        return (
          <div
            key={tool.title}
            aria-disabled="true"
            className="h-full opacity-60 select-none"
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle as="h3">{tool.title}</CardTitle>
                  <Badge variant="outline" size="sm">
                    준비 중
                  </Badge>
                </div>
                <CardDescription>{tool.sub}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        );
      })}
    </Fragment>
  );
}
