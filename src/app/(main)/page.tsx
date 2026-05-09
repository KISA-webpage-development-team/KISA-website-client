import AppEntryTiles from "@/features/home/components/AppEntryTiles";
import BoardsPreview from "@/features/home/components/BoardsPreview";
import CalendarPeek from "@/features/home/components/CalendarPeek";
import FeaturedCarousel from "@/features/home/components/FeaturedCarousel";
import PochaLiveBanner from "@/features/home/components/PochaLiveBanner";
import SponsorStrip from "@/features/home/components/SponsorStrip";

export default function HomePage() {
  return (
    <section className="flex flex-col gap-12 md:gap-16">
      <PochaLiveBanner />
      <FeaturedCarousel />
      <BoardsPreview />
      <CalendarPeek />
      <AppEntryTiles />
      <SponsorStrip />
    </section>
  );
}
