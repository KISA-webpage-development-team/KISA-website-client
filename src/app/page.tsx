// sub-ui components
import HomeCarousel from "@/deprecated-components/Home/HomeCarousel";
import QuickLinks from "@/deprecated-components/Home/QuickLinks";
import BoardsSummary from "@/deprecated-components/Home/BoardsSummary";
import SchoolCalendar from "@/deprecated-components/Home/SchoolCalendar";
import SponsorCarousel from "@/deprecated-components/Home/SponsorCarousel";
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
