"use client";

import { Fragment } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Icon,
  type IconName,
} from "@umichkisa-ds/web";

type AppRow = {
  title: string;
  sub: string;
  href: string;
  icon: IconName;
};

const APPS: AppRow[] = [
  {
    title: "공식 홈페이지",
    sub: "KISA의 공지, 행사, 멤버 소식이 모이는 공식 사이트입니다.",
    href: "/",
    icon: "info",
  },
  {
    title: "Jobs Curator",
    sub: "학생들이 큐레이션된 채용 공고를 탐색하는 채용 정보 허브입니다.",
    href: "/jobs",
    icon: "graduation-cap",
  },
  {
    title: "포차 앱",
    sub: "행사 기간 동안 학생들이 주문과 결제를 진행하는 사용자 인터페이스입니다.",
    href: "/pocha",
    icon: "shopping-cart",
  },
];

/**
 * Renders the 3 user-facing app rows as sibling cards (Fragment) so each
 * occupies its own cell of the parent hub grid in apps mode.
 */
export default function AdminHubAppsList() {
  return (
    <Fragment>
      {APPS.map((app) => (
        <a
          key={app.title}
          href={app.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group block h-full rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
        >
          <Card hoverable className="h-full justify-between">
            <div className="flex items-start justify-between gap-2">
              <div className="flex size-10 items-center justify-center rounded-md border border-border bg-background text-foreground shadow-sm">
                <Icon name={app.icon} size="sm" />
              </div>
              <span className="text-muted-foreground group-hover:text-foreground">
                <Icon name="external-link" size="sm" />
              </span>
            </div>
            <CardHeader>
              <CardTitle as="h3">{app.title}</CardTitle>
              <CardDescription>{app.sub}</CardDescription>
            </CardHeader>
          </Card>
        </a>
      ))}
    </Fragment>
  );
}
