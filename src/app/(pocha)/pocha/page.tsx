"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

// ui components
import {
  StatusView,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Skeleton,
  Container,
} from "@umichkisa-ds/web";
import HomeHeading from "@/features/pocha/components/home/HomeHeading";
import MenuList from "@/features/pocha/components/menu/MenuList";
import OrderList from "@/features/pocha/components/order/OrderList";
import ViewCartButton from "@/features/pocha/components/menu/ViewCartButton";
import { POCHA_THEME } from "@/features/pocha/featureFlag";

// hooks
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import usePocha from "@/features/pocha/hooks/usePocha";

// types
import { PochaTab } from "@/types/pocha";

// Spring theme components -- only loaded when theme is spring
const CherryBlossomBranch =
  POCHA_THEME === "spring"
    ? dynamic(
        () =>
          import(
            "@/features/pocha/components/theme/CherryBlossomBranch"
          ).then((mod) => mod.CherryBlossomBranch),
        { ssr: false }
      )
    : null;

const CherryBlossomPetals =
  POCHA_THEME === "spring"
    ? dynamic(
        () =>
          import(
            "@/features/pocha/components/theme/CherryBlossomPetals_optimized"
          ).then((mod) => mod.CherryBlossomPetals),
        { ssr: false }
      )
    : null;

function HomeShellSkeleton() {
  return (
    <Container
        as="section"
        size="sm"
        className="flex flex-col min-h-screen relative !gap-0"
      >
      {/* Heading skeleton */}
      <div className="flex flex-col items-center px-4 pt-2 gap-2">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Tab strip skeleton */}
      <div className="flex gap-4 px-4 py-3">
        <Skeleton className="h-8 flex-1" />
        <Skeleton className="h-8 flex-1" />
      </div>

      {/* Menu row skeletons */}
      <div className="flex flex-col gap-4 px-4 py-2">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="flex flex-row items-center gap-4 py-2">
            <Skeleton variant="rectangular" className="h-24 w-24 rounded-md" />
            <div className="flex flex-col gap-2 flex-1">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default function PochaPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // URL-as-source-of-truth for active tab.
  const tabParam = searchParams.get("tab");
  const activeTab: PochaTab =
    tabParam === "orders" ? "orders" : "menu";

  const handleTabChange = (next: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", next);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const [swayTrigger, setSwayTrigger] = useState(0);

  const { pochaInfo, status, error } = usePocha();

  if (status === "loading") {
    return <HomeShellSkeleton />;
  }

  if (status === "error") {
    throw new Error(error || "Unexpected error occurred");
  }

  // pochaInfo is null when /pocha/status-info responded 204; legacy
  // backend variant returns `{}`. Treat both as "no ongoing pocha".
  if (!pochaInfo || Object.keys(pochaInfo).length === 0) {
    return (
      <StatusView
        fullScreen
        variant="not-found"
        icon="calendar"
        title="No pocha in progress"
        description="다음 포차가 시작되면 이 곳에서 메뉴와 주문을 확인할 수 있습니다."
      />
    );
  }

  if (pochaInfo?.ongoing === false) {
    return (
      <StatusView
        fullScreen
        variant="not-found"
        icon="calendar"
        title={pochaInfo.title ?? "Upcoming pocha"}
        description={pochaInfo.description ?? "다음 포차를 기다려 주세요."}
      />
    );
  }

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      className="md:hidden flex flex-col min-h-screen relative !gap-0"
    >
      <Container
        as="section"
        size="sm"
        className="flex flex-col min-h-screen relative !gap-0"
      >
        {/* Cherry blossom branch -- spring theme only */}
        {CherryBlossomBranch && (
          <div className="absolute top-0 left-0 z-[40] w-full">
            <CherryBlossomBranch triggerSway={swayTrigger} />
          </div>
        )}

        {/* PochaHeading scrolls away with content */}
        <div className="relative z-[41] flex-shrink-0">
          {CherryBlossomPetals && (
            <CherryBlossomPetals petalCount={4} scrollOpacity={1} />
          )}
          <HomeHeading pochaInfo={pochaInfo} />
        </div>

        {/* Sticky tabs */}
        <div className="sticky top-0 z-[45] bg-surface">
          <TabsList variant="underline" size="md" fullWidth>
            <TabsTrigger value="menu" variant="underline">
              Menu
            </TabsTrigger>
            <TabsTrigger value="orders" variant="underline">
              Orders
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Main content area (scrollable) */}
        <div
          className="flex-1"
          onClick={
            POCHA_THEME === "spring"
              ? (e) => {
                  const btn = (e.target as HTMLElement).closest("button");
                  if (btn?.textContent?.includes("View Cart")) {
                    setSwayTrigger((prev) => prev + 1);
                  }
                }
              : undefined
          }
        >
          <TabsContent value="menu" className="flex flex-col">
            <MenuList pochaid={pochaInfo?.pochaID} />
            <ViewCartButton pochaID={pochaInfo?.pochaID} />
          </TabsContent>
          <TabsContent value="orders">
            <OrderList pochaID={pochaInfo?.pochaID} />
          </TabsContent>
        </div>
      </Container>
    </Tabs>
  );
}
