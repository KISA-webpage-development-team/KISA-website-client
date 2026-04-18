import React from "react";

// sub-ui components
// test
import InfoTitle from "@/features/info-page/components/InfoTitle";
import EventSection from "@/features/about-page/components/EventSection";

import { eventsPageData } from "@/features/about-page/data/eventsPageData";

export default function EventsPages() {
  return (
    <section
      className="flex flex-col items-center pt-2 md:pt-3 lg:pt-4 
"
    >
      <InfoTitle title="활동 소개" />

      <div
        className="flex flex-col w-full 
      gap-12 md:gap-28 lg:gap-32
      mt-8 md:mt-12 lg:mt-16"
      >
        {eventsPageData.map((data, _) => (
          <div key={data.id} className="w-full">
            <EventSection event={data} />
          </div>
        ))}
      </div>
    </section>
  );
}
