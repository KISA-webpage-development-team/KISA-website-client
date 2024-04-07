// sub-ui components
import HomeCarousel from "../components/Home/HomeCarousel";
import QuickLinks from "../components/Home/QuickLinks";

export default function Home() {
  return (
    <section
      className="h-full w-full 
    flex flex-col items-center
     gap-20 py-6 px-10"
    >
      {/* Carousel */}
      <HomeCarousel />
      {/* Quick Links (Hub) */}
      <QuickLinks />
      {/* Boards Summary */}

      {/* SchoolCalendar */}

      {/* SponsorBanner */}
    </section>
  );
}
