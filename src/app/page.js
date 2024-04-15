// sub-ui components
import HomeCarousel from "../components/Home/HomeCarousel";
import QuickLinks from "../components/Home/QuickLinks";
import BoardsSummary from "../components/Home/BoardsSummary";
import SchoolCalendar from "../components/Home/SchoolCalendar";
import SponsorBanner from "../components/Home/SponsorBanner";
import UIProvider from "../context/UIProvider";

export default function Home() {
  return (
    <section
      className="h-full w-full 
    flex flex-col items-center
     gap-20 py-6 px-10"
    >
      {/* Carousel */}
      <UIProvider>
        <HomeCarousel />
      </UIProvider>
      {/* Quick Links (Hub) */}
      <QuickLinks />
      {/* Boards Summary */}
      <BoardsSummary />
      {/* SchoolCalendar */}
      <SchoolCalendar />
      {/* SponsorBanner */}
      <SponsorBanner />
    </section>
  );
}
