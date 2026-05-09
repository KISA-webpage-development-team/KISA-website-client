import { getBoardPosts } from "@/apis/boards/queries";
import { getPochaInfo } from "@/apis/pocha/queries";
import { BoardType } from "@/types/board";

import AppEntryTiles from "@/features/home/components/AppEntryTiles";
import BoardsPreview from "@/features/home/components/BoardsPreview";
import CalendarPeek from "@/features/home/components/CalendarPeek";
import FeaturedCarousel from "@/features/home/components/FeaturedCarousel";
import PochaLiveBanner from "@/features/home/components/PochaLiveBanner";
import SponsorStrip from "@/features/home/components/SponsorStrip";

const BOARD_PREVIEW_LIMIT = 10 as const;

export default async function HomePage() {
  // Fetch initial data in parallel on the server so the home page paints with
  // boards rows and pocha state already present — eliminates client-side
  // request waterfalls for surfaces that are above-the-fold.
  const [pochaInfo, communityPosts, jobPosts] = await Promise.all([
    getPochaInfo(new Date()).catch(() => null),
    getBoardPosts(BoardType.Community, BOARD_PREVIEW_LIMIT, 0).catch(
      () => undefined
    ),
    getBoardPosts(BoardType.JobAnnouncement, BOARD_PREVIEW_LIMIT, 0).catch(
      () => undefined
    ),
  ]);

  return (
    <section className="flex flex-col gap-12 md:gap-16">
      <PochaLiveBanner initialPochaInfo={pochaInfo} />

      <FeaturedCarousel />

      <div className="rounded-lg bg-surface-subtle p-5 md:p-8">
        <BoardsPreview
          communityPosts={communityPosts}
          jobPosts={jobPosts}
        />
      </div>

      <CalendarPeek />

      <div className="rounded-lg bg-surface-subtle p-5 md:p-8">
        <AppEntryTiles />
      </div>

      <SponsorStrip />
    </section>
  );
}
