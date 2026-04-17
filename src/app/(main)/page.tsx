// sub-ui components
import HomeCarousel from "@/features/home-sponsor/components/HomeCarousel";
import QuickLinks from "@/features/home-sponsor/components/QuickLinks";
import BoardsSummary from "@/features/home-sponsor/components/BoardsSummary";
import SchoolCalendar from "@/features/home-sponsor/components/SchoolCalendar";
import SponsorCarousel from "@/features/home-sponsor/components/SponsorCarousel";
import "./home.css";

export default function Home() {
  return (
    <section
      className="h-full w-full 
    flex flex-col items-center
     gap-8 md:gap-8 -mt-2"
    >
      <HomeCarousel />
      <BoardsSummary />
      <SponsorCarousel />
      <SchoolCalendar />
      <QuickLinks />
    </section>
  );
}
