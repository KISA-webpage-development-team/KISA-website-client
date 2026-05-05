"use client";

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
 * Vertical list of horizontal app cards. Each row shows: icon (left),
 * title + description (middle, flex-1), external-link glyph (right).
 * Apps mode is intentionally a list ("pick a destination"), not a grid.
 */
export default function AdminHubAppsList() {
  return (
    <div className="flex flex-col gap-4">
      {APPS.map((app) => (
        <a
          key={app.title}
          href={app.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
        >
          <Card hoverable className="flex-row items-center gap-4">
            <Icon name={app.icon} size="md" />
            <CardHeader className="flex-1">
              <CardTitle as="h3">{app.title}</CardTitle>
              <CardDescription>{app.sub}</CardDescription>
            </CardHeader>
            <span className="text-muted-foreground group-hover:text-foreground">
              <Icon name="external-link" size="sm" />
            </span>
          </Card>
        </a>
      ))}
    </div>
  );
}
