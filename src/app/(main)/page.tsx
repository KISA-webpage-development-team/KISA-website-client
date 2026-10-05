import { getCarouselItems } from "@/apis/carousel/queries";
import AppEntryTiles from "@/features/home/components/AppEntryTiles";
import BoardsPreview from "@/features/home/components/BoardsPreview";
import CalendarPeek from "@/features/home/components/CalendarPeek";
import FeaturedCarousel from "@/features/home/components/FeaturedCarousel";
import SponsorStrip from "@/features/home/components/SponsorStrip";

export default async function HomePage() {
  const carouselItems = await getCarouselItems();

  return (
    <section className="flex flex-col gap-16 md:gap-10">
      <FeaturedCarousel items={carouselItems} />
      <BoardsPreview />
      <CalendarPeek />
      <AppEntryTiles />
      <SponsorStrip />
    </section>
  );
}
