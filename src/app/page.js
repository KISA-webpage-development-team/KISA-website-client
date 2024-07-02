// sub-ui components
import HomeCarousel from "../components/Home/HomeCarousel";
import QuickLinks from "../components/Home/QuickLinks";
import BoardsSummary from "../components/Home/BoardsSummary";
import SchoolCalendar from "../components/Home/SchoolCalendar";
import SponsorBanner from "../components/Home/SponsorBanner";
import "./home.css";

export default function Home() {
  return (
    <section
      className="h-full w-full 
    flex flex-col items-center
     gap-10 md:gap-16 lg:gap-20 
     mt-0 md:mt-6"
    >
      <HomeCarousel />
      <BoardsSummary />
      <QuickLinks />
      <SchoolCalendar />
      {/* <SponsorBanner /> */}
    </section>
  );
}
