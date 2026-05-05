"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Icon,
} from "@umichkisa-ds/web";

type AppRow = {
  title: string;
  sub: string;
  href: string;
};

const APPS: AppRow[] = [
  { title: "공식 홈페이지", sub: "KISA 공식 사이트", href: "/" },
  { title: "Jobs Curator", sub: "채용 공고 큐레이션", href: "/jobs" },
  { title: "포차 앱", sub: "사용자용 포차 인터페이스", href: "/pocha" },
];

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
          <Card hoverable>
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <CardTitle as="h3">{app.title}</CardTitle>
                  <CardDescription>{app.sub}</CardDescription>
                </div>
                <span className="text-muted-foreground group-hover:text-foreground">
                  <Icon name="external-link" size="sm" />
                </span>
              </div>
            </CardHeader>
          </Card>
        </a>
      ))}
    </div>
  );
}
