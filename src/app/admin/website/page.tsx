"use client";

import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Container,
  Grid,
  Icon,
  type IconName,
} from "@umichkisa-ds/web";
import { setFromHubFlag } from "@/lib/admin/fromHubFlag";

type Section = {
  title: string;
  sub: string;
  href: string;
  icon: IconName;
};

const SECTIONS: Section[] = [
  {
    title: "Main Banner",
    sub: "홈페이지 상단 메인 배너를 등록하고 순서와 게시 기간을 관리합니다.",
    href: "/admin/website/carousel",
    icon: "image",
  },
  {
    title: "Members",
    sub: "연도별 멤버를 등록하고 순서를 정해 멤버 소개 페이지에 게시합니다.",
    href: "/admin/website/members",
    icon: "user-round",
  },
];

export default function WebsiteCmsPage() {
  return (
    <Container as="section" size="lg">
      <div className="flex flex-col gap-6">
        <h1 className="type-h1 text-foreground">Website CMS</h1>
        <Grid columns={{ base: 1, md: 2 }} gap="component">
          {SECTIONS.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              onClick={setFromHubFlag}
              className="group block h-full rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
            >
              <Card hoverable className="h-full justify-between gap-6">
                <Icon name={section.icon} size="md" />
                <CardHeader>
                  <CardTitle as="h2">{section.title}</CardTitle>
                  <CardDescription>{section.sub}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </Grid>
      </div>
    </Container>
  );
}
