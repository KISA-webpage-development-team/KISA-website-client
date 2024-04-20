// sub-ui components
import HomeCarousel from "../components/Home/HomeCarousel";
import QuickLinks from "../components/Home/QuickLinks";
import BoardsSummary from "../components/Home/BoardsSummary";
import SchoolCalendar from "../components/Home/SchoolCalendar";
import SponsorBanner from "../components/Home/SponsorBanner";
import UIProvider from "../context/UIProvider";
// .
export default function Home() {
  return (
    <section
      className="h-full w-full 
    flex flex-col items-center
     gap-20 
     mt-0 md:mt-6"
    >
      {/* Carousel */}
      {/* <UIProvider> */}
      <HomeCarousel />
      {/* </UIProvider> */}
      {/* Boards Summary */}
      <BoardsSummary />
      {/* Quick Links (Hub) */}
      <QuickLinks />

      {/* SchoolCalendar */}
      <SchoolCalendar />
      {/* SponsorBanner */}
      <SponsorBanner />
    </section>
  );
}
