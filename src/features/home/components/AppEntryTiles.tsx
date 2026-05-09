"use client";

import Link from "next/link";

import { Card, CardContent, Icon } from "@umichkisa-ds/web";

type TileIcon = React.ComponentProps<typeof Icon>["name"];

interface TileSpec {
  href: string;
  title: string;
  description: string;
  icon: TileIcon;
}

const TILES: TileSpec[] = [
  {
    href: "/pocha",
    title: "포차",
    description: "라이브 포차 이벤트 입장 및 주문",
    icon: "shopping-cart",
  },
  {
    href: "/jobs",
    title: "Jobs Curator",
    description: "외부 채용 공고 큐레이션",
    icon: "graduation-cap",
  },
];

/**
 * App entry tiles — persistent front door to KISA's sub-apps. The pocha tile
 * is always shown (even when no live event is active) because attendees
 * routinely open umichkisa.com during a pocha looking for the entry point;
 * the live banner above is for in-progress events only.
 */
export default function AppEntryTiles() {
  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-col gap-1">
        <h2 className="type-h2 text-foreground">KISA의 다른 도구들</h2>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {TILES.map((tile) => (
          <Link
            key={tile.href}
            href={tile.href}
            className="group rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          >
            <Card hoverable className="h-full">
              <CardContent className="flex items-center gap-6 p-5">
                <Icon name={tile.icon} size="lg" />
                <div className="flex flex-1 flex-col gap-1">
                  <p className="type-h3 text-foreground">{tile.title}</p>
                  <p className="type-body-sm text-muted-foreground">
                    {tile.description}
                  </p>
                </div>
                <span className="text-muted-foreground">
                  <Icon name="arrow-right" size="md" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
