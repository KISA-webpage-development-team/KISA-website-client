import React from "react";

// sub-ui components
import InfoTitle from "../../../components/shared/InfoTitle";
import EventSection from "../../../components/About/EventSection";

import { eventsPageData } from "../../../config/static/eventsPageData";

export default function EventsPages() {
  return (
    <section
      className="flex flex-col items-center pt-2 md:pt-3 lg:pt-4 
"
    >
      <InfoTitle title="활동 소개" />

      <div
        className="flex flex-col w-full 
      gap-12 md:gap-16 lg:gap-20
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
