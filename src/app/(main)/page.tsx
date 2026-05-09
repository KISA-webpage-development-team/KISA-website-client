import type { ReactNode } from "react";

import AppEntryTiles from "@/features/home/components/AppEntryTiles";
import BoardsPreview from "@/features/home/components/BoardsPreview";
import CalendarPeek from "@/features/home/components/CalendarPeek";
import FeaturedCarousel from "@/features/home/components/FeaturedCarousel";
import PochaLiveBanner from "@/features/home/components/PochaLiveBanner";
import SponsorStrip from "@/features/home/components/SponsorStrip";

/**
 * Tinted section that paints its background edge-to-edge across the
 * viewport while keeping its content inside the layout's Container gutter.
 *
 * The page lives inside `(main)/layout.tsx`'s Container (max-width + padding),
 * which is what we want for content alignment. To break out the *background*
 * we render an absolutely positioned element that's centered with a 100vw
 * width so it spans the viewport regardless of the Container's gutter.
 */
function FullBleedSection({ children }: { children: ReactNode }) {
  return (
    <section className="relative py-10 md:py-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 bg-surface-subtle"
      />
      {children}
    </section>
  );
}

export default function HomePage() {
  return (
    <section className="flex flex-col gap-12 md:gap-16">
      <PochaLiveBanner />

      <FeaturedCarousel />

      <FullBleedSection>
        <BoardsPreview />
      </FullBleedSection>

      <CalendarPeek />

      <FullBleedSection>
        <AppEntryTiles />
      </FullBleedSection>

      <SponsorStrip />
    </section>
  );
}
