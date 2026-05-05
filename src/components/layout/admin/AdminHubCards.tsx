"use client";

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
    sub: "포차/메뉴 설정",
    href: "/admin/pocha/manage",
  },
  {
    kind: "live",
    title: "Pocha Dashboard",
    sub: "실시간 운영",
    href: "/admin/pocha/dashboard",
  },
  {
    kind: "live",
    title: "Data Analytics",
    sub: "과거 포차 기록",
    href: "/admin/pocha/history",
  },
  { kind: "coming-soon", title: "Website CMS", sub: "준비 중인 도구" },
  { kind: "coming-soon", title: "RSVP CMS", sub: "준비 중인 도구" },
];

function setFromHubFlag() {
  try {
    sessionStorage.setItem("kisa.admin.fromHub", "1");
  } catch {
    // sessionStorage may be unavailable (private mode); FAB simply won't render.
  }
}

export default function AdminHubCards() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {TOOLS.map((tool) => {
        if (tool.kind === "live") {
          return (
            <Link
              key={tool.title}
              href={tool.href}
              onClick={setFromHubFlag}
              className="group block rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
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
            className="opacity-60 select-none"
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
    </div>
  );
}
